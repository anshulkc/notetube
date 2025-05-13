import React, {useState} from 'react';

export function FileUpload({ onSuccessfulUpload }) {
    const [uploading, setUploading] = useState(false);

   const handleFileChange = async (e) => {
       const file = e.target.files[0]; // get the file that was uploaded
       setUploading(true);
       if (!file) return;

       const formData = new FormData();
       formData.append('avatar', file); // append the file to the form data

       try {
        // endpoint 1
        //    const response = await fetch('http://localhost:3001/api/upload', { 
        //        method: 'POST',
        //        body: formData // send the form data to the server
        //    });
        //    const data = await response.json();
        //    console.log('Success: ', data);
           
           //endpoint 2 - main endpoint
           const process_image = await fetch('http://localhost:3001/process-image', { 
               method: 'POST',
               body: formData // send the form data to the server
           });
           const image_data = await process_image.json();
           console.log('Success: ', image_data);
           onSuccessfulUpload(image_data);
       } catch (error) {
           console.log('Did not work: ', error);
       } finally {
        setUploading(false);
        e.target.value = ''; // reset the file input to allow for another upload
       }
   };
  
   return (
       <form>
           <label htmlFor="file-upload" className="buttons-secondary-fixed-button">
               {uploading ? <div className="buttons-secondary-instance">Uploading...</div> : <div className="buttons-secondary-instance">click here</div>}
           </label>
           <input
               id="file-upload"
               type="file"
               onChange={handleFileChange}
               style={{ display: 'none' }}
           />
       </form>
   );
}
