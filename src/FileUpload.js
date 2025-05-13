import React, {useState} from 'react';
import {LoadingSpinner} from './LoadingSpinner.js';
import './styles.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

export function FileUpload({ onUploadStart, onProcessingUpdate, onSuccessfulUpload, onError }) {
    const [uploading, setUploading] = useState(false);

   const handleFileChange = async (e) => {
       const files = e.target.files; // get the file that was uploaded
       if (!files.length) return;

       // Validate file types
       const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'application/pdf'];
       const invalidFiles = Array.from(files).filter(file => !allowedTypes.includes(file.type));
       
       if (invalidFiles.length > 0) {
           const fileNames = invalidFiles.map(file => file.name).join(', ');
           onError(`Unsupported file type(s): ${fileNames}. Please upload only PNG, JPG, GIF, WEBP, or PDF files.`);
           e.target.value = ''; // reset the file input
           return;
       }

       setUploading(true);
       onUploadStart(); // Signal that upload has started
       
       const formData = new FormData();
       for (let i = 0; i < files.length; i++) {
        formData.append('avatars', files[i]); // append the file to the form data
       }
       
       try {
           // Fetch from the process-image endpoint
           const response = await fetch(`${API_BASE_URL}/process-image`, { 
               method: 'POST',
               body: formData // send the form data to the server
           });
           
           if (!response.ok) {
               const errorData = await response.json();
               throw new Error(errorData.error || 'Failed to process image');
           }
           
           // Process the streamed response
           const reader = response.body.getReader();
           let decoder = new TextDecoder();
           let buffer = '';
           let finalData = null;

           while (true) {
               const { done, value } = await reader.read();
               
               if (done) {
                   break;
               }
               
               // Decode the chunk and add it to our buffer
               buffer += decoder.decode(value, { stream: true });
               
               // Split by newline to get individual JSON messages
               const lines = buffer.split('\n');
               
               // Process all complete lines
               for (let i = 0; i < lines.length - 1; i++) {
                   const line = lines[i].trim();
                   if (line) {
                       try {
                           const data = JSON.parse(line);
                           
                           // Update processing status if available
                           if (data.status) {
                               onProcessingUpdate(data.status);
                               
                               // Store the final data for successful upload callback
                               if (data.status === 'complete') {
                                   finalData = data;
                               }
                           }
                       } catch (e) {
                           console.error('Error parsing JSON:', e, line);
                       }
                   }
               }
               
               // Keep any incomplete data in the buffer
               buffer = lines[lines.length - 1];
           }
           
           // Process any remaining data in the buffer
           if (buffer.trim()) {
               try {
                   const data = JSON.parse(buffer.trim());
                   if (data.status === 'complete') {
                       finalData = data;
                   }
               } catch (e) {
                   console.error('Error parsing final JSON:', e);
               }
           }
           
           // If we have final data, call the success handler
           if (finalData) {
               console.log('Success: ', finalData);
               onSuccessfulUpload(finalData);
           } else {
               throw new Error('Failed to get complete response from server');
           }
       } catch (error) {
           console.log('Error: ', error);
           onError(error.message || 'Failed to upload files. Please try again.');
       } finally {
           setUploading(false);
           e.target.value = ''; // reset the file input to allow for another upload
       }
   };
  
   return (
       <form>
           <label htmlFor="file-upload" className="buttons-secondary-fixed-button">
               {uploading ? <LoadingSpinner /> : <div className="buttons-secondary-instance">click here</div>}
           </label>
           <input
               id="file-upload"
               type="file"
               onChange={handleFileChange}
               style={{ display: 'none' }}
               multiple
               accept=".png,.jpg,.jpeg,.gif,.webp,.pdf"
           />
       </form>
   );
}
