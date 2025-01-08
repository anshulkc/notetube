import React, { useState } from 'react';
import {Button} from '@mui/material'

export function FileUpload() {
   const [file, setFile] = useState(null);
   const handleSubmit = async (e) => {
       e.preventDefault();
       const formData = new FormData();
       formData.append('avatar', file);

       try {
           const response = await fetch('http://localhost:3001/api/upload', {
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
       <form onSubmit={handleSubmit}>
           <input
               type="file"
               onChange={(e) => setFile(e.target.files[0])}
           />
           <Button type="submit" variant="outlined">Upload</Button>
       </form>
   );
}
