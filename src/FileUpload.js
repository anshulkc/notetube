import React, { useState } from 'react';
// import {Button} from '@mui/material'

export function FileUpload( { onSuccessfulUpload } ) {
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

           
           const process_image = await fetch('http://localhost:3001/process-image', {
            method: 'POST',
            body: formData
           });
           const image_data = await process_image.json()
           console.log('Success: ', image_data);
           onSuccessfulUpload(image_data);
       }  catch (error) {
           console.log('Did not work: ', error);
       }

   };
  
   return (
       <form onSubmit={handleSubmit}>
        <label for="file-upload" class="btn input zoom-out zoom-out--purple">
            
        Select File
    </label>
           <input
           id="file-upload"
               type="file"
               onChange={(e) => setFile(e.target.files[0])}
               style={{ color: 'transparent' }}
               
           />
           <button class="btn zoom-out zoom-out--purple" type="submit" variant="outlined">Upload</button>
       </form>
   );
}
