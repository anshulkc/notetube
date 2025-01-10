import { React } from 'react';
import { FileUpload } from './FileUpload'

export function ContentPage() {
    const [prompts, setPrompts] = useState([]);
    const [urlMap, setUrlMap] = useState(new Map([]));

    const handleSuccessfulUpload = (data) => {
        setPrompts(data.questions);
        setUrlMap(new Map(Object.entries(data.urlMap)));
    }

    return (
        <div className='grey-column'>
            <h1>Content</h1>
            <h1>(sorted by relevance)</h1>
            <

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