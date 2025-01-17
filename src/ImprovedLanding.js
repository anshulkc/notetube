import React from "react";
import { FileUpload } from "./FileUpload.js";
import { IconsLogosSocial } from "./IconsLogosSocial.js";
import { Icons1PrimaryArrowRight } from "./Icons1PrimaryArrowRight.js";
import "./styles.css";

export const Frame = ({ handleSuccessfulUpload }) => {

  return (
    <>
      <div className="frame">
        <div className="overlap-group">
          <div className="div">YouTubified.</div>
          <IconsLogosSocial
            className="icons-logos-social-youtube"
            iconsLogosSocial="https://c.animaapp.com/N8rvLDdf/img/icons---logos---social---youtube.svg"
          />
        </div>

        <div className="text-wrapper-2">Your notes,</div>

        <p className="p">
          Find YouTube videos that comprehensively cover the content of your notes.
        </p>

        <p className="text-wrapper-3">Upload your lecture notes below:</p>
        <p className="text-wrapper-5">supports: png, jpg, gif, webp</p>

        <FileUpload onSuccessfulUpload={handleSuccessfulUpload} />
        
        <Icons1PrimaryArrowRight className="icons-primary" />
        
        <div className="overlap">
          <p className="select-file-upload">
            1. select file
            <br />
            2. upload and wait
            <br />
            3. scroll for videos
          </p>
          

          <div className="text-wrapper-4">How to use:</div>
        </div>
      </div>
      <div className="bottom-frame">
      <div className="scroll-text">
        Scroll for your notes
        <div className="scroll-arrow">↓</div>
        </div>
      </div>
    </>
  );
};
