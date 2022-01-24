/* eslint-disable prettier/prettier */
import React, {useState} from "react";

interface ToolCusProps {
  icon?: any;
  content: string;
  bgColor: string;
  height?: string;
  width?: string;
  dis?: false | boolean;
  onClick?: () => void;
}

const ToolCus: React.FC<ToolCusProps> = ({
  icon,
  content,
  bgColor,
  height,
  width,
  dis,
  onClick,
}) => {
  const ToolCusStyle = {
    color: "#FFFFFF",
    padding: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "16px",
  };

  return (
    <div
      typeof="button"
      onClick={onClick}
      className="btn rounded"
      // onMouseOver={onMouseOver}
      // onMouseOut={onMouseOut}
      style={{
        ...ToolCusStyle,
        backgroundColor: bgColor,
        height: height,
        width: width,
        color: bgColor === "#FFFFFF" ? "black" : "white",
      }}
    >
      {icon && <img src={icon} className="me-2" width="20" />}
      <span style={{ color: "fff", opacity: dis ? "0.5" : "1" }}>
        {content}
      </span>
    </div>
  );
};

export default ToolCus;
