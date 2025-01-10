import { React } from 'react';
import { FileUpload } from './FileUpload.js'

export function ContentPage( { handleSuccessfulUpload, prompts, urlMap }) {
    


    return (
        <div className='grey-column'>
            <h1>Content</h1>
            <h1>(sorted by relevance)</h1>
            <FileUpload onSuccessfulUpload={handleSuccessfulUpload}/>
            {console.log(urlMap)}
            {console.log(prompts)}
            <ul>
                {prompts.map((prompt) => (
                    <li key={prompt}>
                        <h2>{prompt}</h2>
                        <p>{urlMap.get(prompt)}</p>
                    </li>
                ))}
            </ul>
        </div>

        // loads this content page
        // background
        // List topic
        // list the videos in a viewable form
        // ability to reupload new files, return to main page to reupload

        


    );
};