import express from 'express'
import multer from 'multer'
import cors from 'cors'
import 'dotenv/config'
import OpenAI from 'openai';
import 'dotenv/config';
import Exa from "exa-js";
import fs from 'fs';



const app = express();
app.use(cors()); // for cross origin requests

const openaiKey = process.env.OPENAI_API_KEY
const openai = new OpenAI({ apiKey: openaiKey });

const exaaiKey = process.env.EXA_API_KEY
const exa = new Exa(exaaiKey);

// exa ai helper function to delay requests to not overload the api
const delay = (ms) => {
    new Promise(resolve => setTimeout(resolve, ms));
}

// multer storage for local file uploads
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads'); // directory for the file uploads
//     },
//     filename: function (req, file, cb) {
//         // generate a unique filename for the file with the generic multer way of doing it
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         cb(null, uniqueSuffix + '-' + file.originalname); 

//     },
// });

const storage = multer.memoryStorage();
const upload = multer({ storage })

// I have two endpoints here, the upload endpoint and the process-image endpoint
// the upload endpoint is just for testing, it returns the file that was uploaded
// the process-image endpoint is the one that does the actual processing

// app.post('/api/upload', upload.single('avatar'), (req, res) => {
//     res.json(req.file);
// });

app.post('/process-image', upload.single('avatar'), async (req, res) => {
    
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not set');
}

// const filePath = req.file.path;
const fileBuffer = req.file.buffer;

// let imageToProcess = fileBuffer;

// convert the image to base64
// const imageBase64 = fs.readFileSync(imageToProcess).toString('base64');

// conver the buffer to base64
const imageBase64 = fileBuffer.toString('base64');


// first open ai requests simply extracts the text from the image
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

    // second open ai request extracts the topics from the text
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

    const topics_string = response.choices[0].message.content;
    const questions = topics_string.split("\n");

    // create a map to store the questions and the youtube links
    const urlMap = new Map();
    
    // for each question, search for the most relevant youtube videos using exa ai
      for (const question of questions) {
          try {
              const result = await exa.search(
                  `Find the most relevant youtube videos for the following topic: ${question}, THEY MUST BE YOUTUBE LINKS and must have www.youtube.com in the url:`,
          
                  {
                      type: "neural",
                      numResults: 2, // in the future, could change to be user-chosen
                      includeDomains:["youtube.com"],
                  }
              );

             

              const exa_json = result.results;
              const list_links = []
              
              

              for (const output of exa_json) {
                  // take this url and turn it into a preview video on the website (loads in new tab)
                  list_links.push([output.url, (output.title).split(' ').slice(0, 8).join(' ')])
                  await delay(200); // delay to not overload the api
              }   
              urlMap.set(question, list_links)                 
          } catch (error) {
              if (error.message.includes('429')) {
                  console.log('Rate limit reached, wait 1 second before requesting again')
              }
              await delay(1000); // implemented just in case the 200 millisecond delay is not enough (exa requires 1 second delay per 5 requests)
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
 


