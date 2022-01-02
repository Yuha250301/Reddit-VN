/* eslint-disable prettier/prettier */
import React from "react";

interface AvatarProps {
  avatar: any;
  square: number;
  isCircle: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ avatar,square,isCircle }) => {
  return <img src={avatar} alt="avatar" style={{width: square, height: square }} /*width={square} height={square}*/ className={isCircle ? "rounded-circle" : "rounded"}/>;
};

export default Avatar;