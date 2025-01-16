import React, { useState } from 'react';

export function FileUpload({ onSuccessfulUpload }) {
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
       } catch (error) {
           console.log('Did not work: ', error);
       }
   };
  
   return (
       <form onSubmit={handleSubmit}>
           <label htmlFor="file-upload" className="buttons-secondary-fixed-button">
               <div className="buttons-secondary-instance">Select File</div>
           </label>
           <input
               id="file-upload"
               type="file"
               onChange={(e) => setFile(e.target.files[0])}
               style={{ display: 'none' }}
           />
           <button className="buttons-primary-fixed-button" type="submit">
               <div className="buttons-primary-instance">Upload</div>
           </button>
       </form>
   );
}
