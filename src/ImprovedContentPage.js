import React from 'react';
import "./styles.css"


export const ImprovedContentPage = ({prompts, urlMap}) => {
    const VideoCard = ({ videoUrl, title }) => (
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

    return (
        <div className="content-page">
            <div className="content-page-header">
                <p className="notes-videos-sorted">Notes + videos: sorted by topic & relevance</p>
            </div>
            <div className="topics-list">
                {prompts && prompts.map((prompt, index) => (
                    <div key={prompt} className="topic-section">
                        <div className="topic-title">{prompt}</div>
                        <div className="video-cards-row">
                            <VideoCard 
                                videoUrl={urlMap.get(prompt)[0][0]} 
                                title={urlMap.get(prompt)[0][1]}
                            />
                            <VideoCard 
                                videoUrl={urlMap.get(prompt)[1][0]} 
                                title={urlMap.get(prompt)[1][1]}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

