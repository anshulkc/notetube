import express from 'express'
import multer from 'multer'
import cors from 'cors'
import 'dotenv/config'
import OpenAI from 'openai';
import 'dotenv/config';
import Exa from "exa-js";
import { fromBuffer } from "pdf2pic";
import fs from 'fs';
import path from 'path'; // <-- Add this
import { fileURLToPath } from 'url'; // <-- Add this


const __filename = fileURLToPath(import.meta.url); // <-- Add this
const __dirname = path.dirname(__filename); // <-- Add this

const app = express();
app.use(cors()); // for cross origin requests

app.use(express.static(path.join(__dirname, '..', 'build'))); // <-- Add this


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

app.post('/process-image', upload.array('avatars', 100), async (req, res) => {
    
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key is not set' });
  }

  // Set response headers for streaming
  res.setHeader('Content-Type', 'application/json');
  
  const fileBuffers = req.files.map(file => file.buffer); // Get buffers for all uploaded files

  const imageBase64Array = []; // Initialize an empty array to store base64 strings

  for (const file of req.files) {
    if (file.mimetype === "application/pdf") {    
      // Handle PDF conversion to images here
      const pdf2pic = fromBuffer(file.buffer, {
        density: 200,
        format: "png",
        width: 1200,
        height: 1600,
      });
      
      const pages = await pdf2pic.bulk(-1); // Convert all pages

      for (const page of pages) {
        try {
          // The pdf2pic library creates actual files on disk
          if (page.path && fs.existsSync(page.path)) {
            // Read the file from disk
            const imageBuffer = fs.readFileSync(page.path);
            
            // Convert to base64 and add to our array
            const base64String = imageBuffer.toString('base64');
            imageBase64Array.push(base64String);
            
            fs.unlinkSync(page.path);
          } else {
            console.warn('Could not find generated image file:', page.path);
          }
        } catch (error) {
          console.error('Error processing PDF page:', error);
        }
      }
    } else if (file.mimetype.startsWith("image/")) {
      // Handle image files
      const base64String = file.buffer.toString('base64');
      imageBase64Array.push(base64String); // Add the base64 string to the array
    } else {
      console.warn('Unsupported file type:', file.mimetype);
    }
  }

  let results = "";

  try {
    // Send update that we're starting to read text
    res.write(JSON.stringify({ status: 'reading', message: 'Reading text from images' }) + '\n');
    
    // First OpenAI request extracts the text from the image
    for (const imageBase64 of imageBase64Array) {
      const first_response = await openai.chat.completions.create({
        model: 'gpt-4.1-nano',
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

      results += first_response.choices[0].message.content;
    }

    // Send update that we're starting topic analysis
    res.write(JSON.stringify({ status: 'analyzing', message: 'Analyzing topics in your notes' }) + '\n');
    
    // Second OpenAI request extracts the topics from the text
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: [
        {
          role: 'system',
          content: 'You are a note summarizer tasked with detecting the core topics covered in the notes.'
        },
        {
          role: 'user',
          content: `Here are the notes: ${results}.
            Your task:

            1. Identify and list each core topic covered in the notes.
            2. Output a JSON object with the following structure:
            
                {
                    "total_topics": <int>,
                    "topics": [
                        "Topic 1",
                        "Topic 2",
                        ...
                    ]
                }
            
            Each topic should be concise and specific. Do not include any extra explanation or commentary—just return a valid JSON object.`
        },
      ],
    });

    const json_response = response.choices[0].message.content;
    const obj = JSON.parse(json_response);
    const questions = obj.topics;
    
    // Send update that we're starting to search for videos
    res.write(JSON.stringify({ status: 'searching', message: 'Finding relevant YouTube videos' }) + '\n');
    
    // Create a map to store the questions and the YouTube links
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
        const list_links = [];
        
        for (const output of exa_json) {
          // take this url and turn it into a preview video on the website (loads in new tab)
          list_links.push([output.url, (output.title).split(' ').slice(0, 8).join(' ')]);
          await delay(200); // delay to not overload the api
        }   
        urlMap.set(question, list_links);                 
      } catch (error) {
        if (error.message.includes('429')) {
          console.log('Rate limit reached, wait 1 second before requesting again');
        }
        await delay(1000); // implemented just in case the 200 millisecond delay is not enough (exa requires 1 second delay per 5 requests)
      }
    }

    // Final response with all the data
    const finalResponse = {
      status: 'complete',
      questions: questions,
      urlMap: Object.fromEntries(urlMap) // transforms each key,value pair into object properties and returns a plain object in json form
    };
    
    // Send the final response and end the stream
    res.write(JSON.stringify(finalResponse));
    res.end();
      
  } catch (error) {
    console.error("Error generating api request with OpenAI", error);
    
    // In case of error, send an error response and end the stream
    res.write(JSON.stringify({ status: 'error', error: error.message }));
    res.end();
  }
});

app.get('*', (req, res) => { // <-- Add this
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html')); // <-- Add this
  }); // <-- Add this

const port = process.env.PORT || 3001;


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
 


