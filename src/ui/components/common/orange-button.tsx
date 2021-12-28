/* eslint-disable prettier/prettier */
import React from "react";
import { Button } from "react-bootstrap";

interface OrangeButtonProps {
    img?: any;
    content?: string;
    onClick: () => void;
}

const OrangeButton: React.FC<OrangeButtonProps> = ({ img, content, onClick, ...other  }) => {
  return (
          <Button
            variant="dark"
            type="submit"
            style={{ backgroundColor: "#E85B25", width: "100%"}}
            onClick = {onClick}
            {...other}
          >
            {img && <img src={img} className={ content && "me-1"}/>}
            <strong>{content}</strong>
          </Button>
  );
};

export default OrangeButton;
