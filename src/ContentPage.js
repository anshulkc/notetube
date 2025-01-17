import { React } from 'react';
import { FileUpload } from './FileUpload.js'
import  './styles.css'


export function ContentPage( { handleSuccessfulUpload, prompts, urlMap }) {

    const VideoCard = ({ videoUrl, title }) => {
        return (
            <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <a 
                    href={videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Watch Video
                </a>
            </div>
        );
    };

    return (
        <div className='mint-column'>
            <h1 style= {{
                        whiteSpace: 'pre-line',
                        paddingTop: '1%',
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'center',
                        fontSize: '80px',
                        backgroundImage: 'linear-gradient(to right, #f9d030, #f62aa0, #b8ee30)', // creates the linear gradient
                        WebkitBackgroundClip: 'text', // clips to just text
                        WebkitTextFillColor: 'transparent' // fills the gradient to the clip
            }}>
                        Content</h1>
            <h2 style= {{
                        whiteSpace: 'pre-line',
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'center',
                        fontSize: '20px',
                        backgroundImage: 'linear-gradient(to right, #f9d030, #f62aa0, #b8ee30)', // creates the linear gradient
                        WebkitBackgroundClip: 'text', // clips to just text
                        WebkitTextFillColor: 'transparent' // fills the gradient to the clip
            }}>
                        sorted by relevance</h2>
                        <div style={{
                            justifyContent: 'center',
                            textAlign: 'center'
                        }}>
                         <FileUpload onSuccessfulUpload={handleSuccessfulUpload} />
                        </div>
                            <ul>
                                {prompts.map((prompt) => (
                                    <li key={prompt} style = {{
                                        paddingBottom: '5%'
                                    }}>
                                        <ul style = {{
                                            whiteSpace: 'pre-line',
                                            display: 'flex',
                                            paddingBottom: '2%',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            fontSize: '32px',
                                            backgroundImage: 'linear-gradient(to right, #f9d030, #f62aa0, #b8ee30)',
                                            WebkitBackgroundClip: 'text',
                                            backgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                            
                                        }}>{prompt}</ul>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <VideoCard 
                                            videoUrl={urlMap.get(prompt)[0][0]} 
                                            title={urlMap.get(prompt)[0][1]}
                                        />
                                        <VideoCard 
                                            videoUrl={urlMap.get(prompt)[1][0]} 
                                            title={urlMap.get(prompt)[1][0]}
                                        />
                                            </div>
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