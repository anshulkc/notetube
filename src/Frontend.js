import React, { useState } from "react";
import  './styles.css'
import { FileUpload } from './FileUpload.js'

export function FrontPage( { handleSuccessfulUpload }) {

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


    return (
        <div className='row'>
            <div className='column'>
                <div className='white-column'>
                    <h1 style= {{
                        whiteSpace: 'pre-line',
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'center',
                        paddingTop: '30%',
                        fontSize: '80px',
                        backgroundImage: 'linear-gradient(to right, #f9d030, #f62aa0, #b8ee30)', // creates the linear gradient
                        WebkitBackgroundClip: 'text', // clips to just text
                        WebkitTextFillColor: 'transparent' // fills the gradient to the clip

                        
            
                    }}>
                        {'Your notes, \nYouTubified.'}
                    
                    </h1>
                    <h2 style= {{
                        whiteSpace: 'pre-line',
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'center',
                        fontSize: '30px',
                        paddingTop: '4%',
                        paddingLeft: '10%',
                        paddingRight: '10%',
                        backgroundImage: 'linear-gradient(to right, #f9d030, #f62aa0, #b8ee30)', // creates the linear gradient
                        WebkitBackgroundClip: 'text', // clips to just text
                        WebkitTextFillColor: 'transparent' // fills the gradient to the clip

                        
            
                    }}>
                        {'Find YouTube videos that comprehensively cover the content of your notes.'}
                    </h2>
                </div>
            </div>
            <div className='column'>
                <div className='grey-column'>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: '50%'
                    }}>
                    <h1 style= {{
                        fontSize: '30px',
                        paddingBottom: '2%',
                        backgroundImage: 'linear-gradient(to right, #26dfd0, #b8ee30, #f62aa0, #f9d030',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}> Upload your lecture notes </h1>
                    <FileUpload onSuccessfulUpload={handleSuccessfulUpload}/>
                    
                    </div>

                    
                </div>
            </div>
            
        </div>
    );
};