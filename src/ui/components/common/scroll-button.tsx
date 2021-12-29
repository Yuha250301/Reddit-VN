/* eslint-disable prettier/prettier */
import React from "react";

const upIcon = require("assets/img/upwards_icon.svg").default;

const ScrollButton: React.FC= () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  return (
    <div className="scroll-button">
      <img src={upIcon} onClick={scrollToTop}/>
    </div>
  );
};

export default ScrollButton;
