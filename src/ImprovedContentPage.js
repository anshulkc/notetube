import React from 'react';
import "./styles.css"

export const ImprovedContentPage = () => {
    return (
        <div className="content-page">
            <div className="content-page-div">
                <p className="notes-videos-sorted">Notes + videos: sorted by topic & relevance</p>
                <div className="overlap">
                    <div className="overlap-group">
                        <div className="text-wrapper">Video title 1.</div>
                    </div>
                    <div className="div-wrapper">
                        <div className="text-wrapper-2">Video title 2.</div>
                    </div>
                    <div className="text-wrapper-3">Topic 1</div>
                </div>
                <div className="overlap-group-2">
                    <div className="overlap-2">
                        <div className="text-wrapper-2">Video title 1.</div>
                    </div>
                    <div className="overlap-3">
                        <div className="text-wrapper-2">Video title 2.</div>
                    </div>
                    <div className="text-wrapper-4">Topic 2</div>
                </div>
            </div>
        </div>
    );
};

