# NoteTube!

## Overview

Turn your notes into Youtube videos with a single click!

## Installation

1. Install all of the dependencies in terminal with: 'npm install express multer cors dotenv openai exa-js fs react'
2. Make sure to go to your node_modules and save for the app to work.
3. Create an uploads folder inside the project and call it "uploads" (if it doesn't already exist).
4. You must create a .env folder and place an OPENAI API key and an EXA API KEY inside. Something like:

OPENAI_API_KEY='...'

EXA_API_KEY='...'

## How to use:

1. In your terminal, type 'npm run dev' to start the open the website in your browser.
2. Click the button that says upload and select a file (must adhere to the specific file format requirements). If you have a PDF, take a screenshot of those notes and upload them.
3. Wait for the backend to render the youtube links based on AI-generated topics of the notes.
4. Enjoy the YouTube-generated content!
