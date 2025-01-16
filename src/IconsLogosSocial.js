import React from "react";
import "./styles.css";

export const IconsLogosSocial = ({
  className,
  iconsLogosSocial = "/img/you-tube.svg",
}) => {
  return (
    <img
      className={`icons-logos-social ${className}`}
      alt="Icons logos social"
      src={iconsLogosSocial}
    />
  );
};
