# NoteTube!

## Overview

Learn your notes into Youtube videos with a single click!

## Installation

1. Install all of the dependencies in terminal with: 'npm install express multer cors dotenv openai exa-js fs react'
2. Create an uploads folder inside the project and call it "uploads"
3. You must create a .env folder and place an OPENAI API key and an EXA API KEY inside. Something like:

OPENAI_API_KEY='...'

EXA_API_KEY='...'

## How to use:

1. Click the button that says upload and select a file (must adhere to the specific file format requirements). If you have a PDF, take a screenshot of those notes and upload them.
2. Wait for the backend to render the youtube links based on AI-generated topics of the notes
3. Enjoy the YouTube-generated content!
