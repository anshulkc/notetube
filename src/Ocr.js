import OpenAI from 'openai';
import { useEffect, useRef, useState } from 'react';
import { createWorker } from 'tesseract.js';
import 'dotenv/config';
import Exa from "exa-js";
import fs from 'fs';

const openaiKey = process.env.OPENAI_API_KEY
const openai = new OpenAI({ apiKey: openaiKey });

const exaaiKey = process.env.EXA_API_KEY
const exa = new Exa(exaaiKey);

const delay = (ms) => {
    new Promise(resolve => setTimeout(resolve, ms));
}

const toBase64 = async (filePath) => {
    try {
        // Read the file as a buffer
        const fileBuffer = fs.readFileSync(filePath);
        // Convert buffer to base64
        const base64String = fileBuffer.toString('base64');
        // data url  MIME type encoding method  encoding data
        return `data:image/png;base64,${base64String}`;
    } catch (error) {
        throw new Error(`Error converting file to base64: ${error.message}`);
    }
};

const test = async () => {

  if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not set');
  }

  const imageBase64 = await toBase64('/Users/anshulkc/Downloads/quicken-project/quicken-blank-canvas/uploads/1736311621979-372866445-Screenshot 2024-12-07 at 1.17.52â¯PM.png');

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
                image_url: { url: imageBase64 },
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

      async function exaSearch() {
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
                console.log(question);

                for (const output of exa_json) {
                    console.log(output.url);
                    await delay(200);
                }
                console.log("------");
                    
            } catch (error) {
                if (error.message.includes('429')) {
                    console.log('Rate limit reached, wait 1 second before requesting again')
                }
                await delay(1000);
                return exaSearch();
            }
          }
      }

      exaSearch();
        
  } catch (error) {
      console.error("Error generating api request with OpenAI", error);
  }
};


test();
