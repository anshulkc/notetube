import React from "react";
import "./styles.css";

export const ButtonsPrimary = ({
  className,
  labelClassName,
  text = "Label",
}) => {
  return (
    <div className={`buttons-primary ${className}`}>
      <div className={`text-wrapper ${labelClassName}`}>{text}</div>
    </div>
  );
};
