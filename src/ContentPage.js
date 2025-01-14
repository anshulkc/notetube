import { React } from 'react';
import { FileUpload } from './FileUpload.js'
import  './styles.css'


export function ContentPage( { handleSuccessfulUpload, prompts, urlMap }) {
    


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
                        <div className="container">
                            <div>
                                <iframe width='560' height='315' src={urlMap.get(prompt)[0].replace("watch?v=", "embed/")} frameborder='0' allowfullscreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                                <a href={urlMap.get(prompt)[0]} target="_blank">Video 1</a>
                            </div>
                            <div>
                                <iframe width='560' height='315' src={urlMap.get(prompt)[1].replace("watch?v=", "embed/")} frameborder='0' allowfullscreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                                <a href={urlMap.get(prompt)[1]} target="_blank">Video 2</a>
                            </div>
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