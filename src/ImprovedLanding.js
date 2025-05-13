import React, {useState} from "react";
import { FileUpload } from "./FileUpload.js";
import "./styles.css";

export const Frame = ({ handleSuccessfulUpload }) => {
  // Processing stages: null, 'uploading', 'reading', 'analyzing', 'searching', 'complete'
  const [processingStage, setProcessingStage] = useState(null);
  const [error, setError] = useState(null);

  const handleUploadStart = () => {
    setError(null);
    setProcessingStage('uploading');
  };

  const handleProcessingUpdate = (stage) => {
    setProcessingStage(stage);
  };

  const handleUploadComplete = (imageData) => {
    setError(null);
    setProcessingStage('complete');
    handleSuccessfulUpload(imageData);
  };

  const handleUploadError = (errorMessage) => {
    setProcessingStage(null);
    setError(errorMessage);
    // Clear error after 5 seconds
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return (
    <>
      <div className="frame">
        <div className="overlap-group">
          <div className="div">YouTubified.</div>
        </div>

        <div className="text-wrapper-2">Your notes,</div>

        <p className="p">
        Turn your notes into YouTube videos with a single click!
        </p>

        <p className="text-wrapper-3">Upload your lecture notes below:</p>
        <p className="text-wrapper-5">supports: png, jpg, jpeg, gif, webp, pdf</p>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <FileUpload 
          onUploadStart={handleUploadStart}
          onProcessingUpdate={handleProcessingUpdate}
          onSuccessfulUpload={handleUploadComplete} 
          onError={handleUploadError}
        />
      
      </div>
      {processingStage === 'complete' && (
      <div className="bottom-frame">
      <div className="scroll-text">
        Scroll for your notes
        <div className="scroll-arrow">↓</div>
        </div>
      </div>
      )}
    </>
  );
};
