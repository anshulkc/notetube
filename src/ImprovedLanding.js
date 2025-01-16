import React from "react";
import { ButtonsPrimary } from "./ButtonsPrimary.js";
import { ButtonsSecondary } from "./ButtonsSecondary.js";
import { IconsLogosSocial } from "./IconsLogosSocial.js";
import { Icons1PrimaryArrowRight } from "./Icons1PrimaryArrowRight.js";
import "./styles.css";

export const Frame = () => {
  return (
    <div className="frame" style={{

    }}>
      <div className="overlap-group">
        <div className="div">YouTubified.</div>

        <IconsLogosSocial
          className="icons-logos-social-youtube"
          iconsLogosSocial="https://c.animaapp.com/N8rvLDdf/img/icons---logos---social---youtube.svg"
        />
      </div>

      <div className="text-wrapper-2">Your notes,</div>

      <p className="p">
        Find YouTube videos that comprehensively cover the content of your
        notes.
      </p>

      <p className="text-wrapper-3">Upload your lecture notes below:</p>

      <ButtonsSecondary
        className="buttons-secondary-fixed-button"
        labelClassName="buttons-secondary-instance"
        text="Select File"
      />
      <ButtonsPrimary
        className="buttons-primary-fixed-button"
        labelClassName="buttons-primary-instance"
        text="Upload"
      />
      <Icons1PrimaryArrowRight className="icons-primary" />
      <div className="overlap">
        <p className="select-file-upload">
          select file
          <br />
          upload and wait
          <br />
          scroll for videos
        </p>

        <div className="text-wrapper-4">how to use:</div>
      </div>
      </div>
  );
};
