import express from 'express'
import multer from 'multer'
import cors from 'cors'
import 'dotenv/config'
import OpenAI from 'openai';
import 'dotenv/config';
import Exa from "exa-js";
import fs from 'fs';



const app = express();
app.use(cors());

const openaiKey = process.env.OPENAI_API_KEY
const openai = new OpenAI({ apiKey: openaiKey });

const exaaiKey = process.env.EXA_API_KEY
const exa = new Exa(exaaiKey);


const delay = (ms) => {
    new Promise(resolve => setTimeout(resolve, ms));
}


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);

    },
});
const upload = multer({ storage })


app.post('/api/upload', upload.single('avatar'), (req, res) => {
    res.json(req.file);
});

app.post('/process-image', upload.single('avatar'), async (req, res) => {
    
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not set');
}


const imageBase64 = fs.readFileSync(req.file.path).toString('base64');


 try {
  const first_response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Write out what this says:',
            },
            {
              type: 'image_url',
              image_url: { url: `data:image/png;base64,${imageBase64}` },
            },
          ],
        },
      ],
    });

    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'system',
                content: 'You are a note summarizer tasked with detecting the core topics covered in the notes.'
            },
            {
                role: 'user',
                content: `Here are the notes: ${first_response.choices[0].message.content}.
                Create a numbered list of topics based on what is covered in the notes.`
            },
        ],
    });

    try {
      console.log(response.choices[0].message.content);
    } catch {
      console.log("error: ", error);
    }

    const topics_string = response.choices[0].message.content;
    const questions = topics_string.split("\n");

    // setPrompts(questions);
    const urlMap = new Map();
    
      for (const question of questions) {
          try {
              const result = await exa.search(
                  `Find the most relevant youtube videos for the following topic: ${question}, THEY MUST BE YOUTUBE LINKS:`,
          
                  {
                      type: "neural",
                      numResults: 2 // in the future, could change to be user-chosen
                  }
              );

             

              const exa_json = result.results;
              const list_links = []
              
              

              for (const output of exa_json) {
                  // take this url and turn it into a preview video on the website (loads in new tab)
                  list_links.push(output.url)
                  await delay(200);
              }   
              urlMap.set(question, list_links)                 
          } catch (error) {
              if (error.message.includes('429')) {
                  console.log('Rate limit reached, wait 1 second before requesting again')
              }
              await delay(1000);
          }
        }

        res.json({
            questions: questions,
            urlMap: Object.fromEntries(urlMap) // transforms each key,value pair into object properties and returns a plain object in json form
        })
      
} catch (error) {
    console.error("Error generating api request with OpenAI", error);
    res.status(500).json({ error: error.message });
}
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
 


