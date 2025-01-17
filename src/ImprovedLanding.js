import React, {useState} from "react";
import { FileUpload } from "./FileUpload.js";
import { IconsLogosSocial } from "./IconsLogosSocial.js";
import { Icons1PrimaryArrowRight } from "./Icons1PrimaryArrowRight.js";
import "./styles.css";

export const Frame = ({ handleSuccessfulUpload }) => {

  const [isProcessingComplete, setIsProcessingComplete] = useState(false);

  const handleUploadComplete = (imageData) => {
    setIsProcessingComplete(true);
    handleSuccessfulUpload(imageData);
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
        <p className="text-wrapper-5">supports: png, jpg, gif, webp</p>

        <FileUpload onSuccessfulUpload={handleUploadComplete} />
      
      </div>
      {isProcessingComplete && (
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
