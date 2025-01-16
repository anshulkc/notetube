import React from "react";
import "./styles.css";

export const ButtonsSecondary = ({
  className,
  labelClassName,
  text = "Label",
}) => {
  return (
    <div className={`buttons-secondary ${className}`}>
      <div className={`label ${labelClassName}`}>{text}</div>
    </div>
  );
};