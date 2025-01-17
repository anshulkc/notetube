import React from 'react';
import "./styles.css"

export const ImprovedContentPage = ({prompts, urlMap}) => {
    const VideoCard = ({ videoUrl, title }) => {

        return (
            <div className="video-card">
               <h3 className="video-title">{title}</h3>

                <a 
                    href={videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="video-link"
                >
                    Watch Video
                </a>
            </div>
        );
    };

    return (
        <div className="content-page">
            <div className="content-page-div">
                <p className="notes-videos-sorted">Notes + videos: sorted by topic & relevance</p>
                {prompts && prompts.map((prompt, index) => (
                    <div key={prompt} className="overlap" style={{ top: `${128 + (index * 384)}px` }}>
                        <div className="overlap-group">
                            <VideoCard 
                                videoUrl={urlMap.get(prompt)[0][0]} 
                                title={urlMap.get(prompt)[0][1]}
                            />
                        </div>
                        <div className="div-wrapper">
                            <VideoCard 
                                videoUrl={urlMap.get(prompt)[1][0]} 
                                title={urlMap.get(prompt)[1][1]}
                            />
                        </div>
                        <div className="text-wrapper-3">
                            {prompt}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

