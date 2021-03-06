/* eslint-disable prettier/prettier */
import React from "react";

interface ToolCusProps {
  icon?: any;
  content: string;
  bgColor: string;
  height?: string;
  width?: string;
  dis?: false | boolean;
  onClick?: Function;
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
  const handleClick = (e: any) => {
    e.preventDefault();
    if (onClick) onClick();
  };

  return (
    <div
      typeof="button"
      onClick={handleClick}
      className="btn rounded"
      // onMouseOver={onMouseOver}
      // onMouseOut={onMouseOut}
      style={{
        ...ToolCusStyle,
        backgroundColor: bgColor,
        height: height,
        width: width,
        maxWidth: width,
        minWidth: "80px",
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
