/* eslint-disable prettier/prettier */
import clsx from "clsx";
import React from "react";

interface OrangeButtonProps {
    img?: any;
    content?: string;
    onClick: (e: any) => void;
    style?: any;
}

const OrangeButton: React.FC<OrangeButtonProps> = ({ img, content, onClick, style, ...other  }) => {
  return (
          <div
            className={clsx("d-flex","align-items-center","justify-content-center")}
            style={{ backgroundColor: "#E85B25", width: "100%", borderRadius:"5px", height: "36px", cursor:"pointer", ...style}}
            onClick = {onClick}
            {...other}
          >
            {img && <img src={img} className={ content && "me-1"}/>}
            <strong>{content}</strong>
          </div>
  );
};

export default OrangeButton;
