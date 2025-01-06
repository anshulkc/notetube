import React, { useState } from 'react';
import {Button} from '@mui/material'
import { Ocr } from './Ocr.js'



export function FileUpload() {
    const [file, setFile] = useState(null);
    const [showOcr, setShowOcr] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const response = await fetch('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log('Success: ', data);
        }  catch (error) {
            console.log('did not work: ', error);
        }

    };
    
    return (
        <div>
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}>
            <input 
                type="file" 
                onChange={(e) => {
                    setFile(e.target.files[0]);
                    setShowOcr(true);
                }} 
            />
            <Button type="submit" variant="outlined">Upload</Button>
        </form>
        {showOcr && <Ocr file={file} loadFile={e.target.files[0]} />}
        </div>
    );
}