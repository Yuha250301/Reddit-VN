/* eslint-disable prettier/prettier */
import React from "react";

const avatar = require("assets/img/logo.svg").default;

interface AvatarProps {
  square: number;
}

const Avatar: React.FC<AvatarProps> = ({ square }) => {
  return <img src={avatar} alt="avatar" width={square} height={square} className="rounded-circle"/>;
};

export default Avatar;