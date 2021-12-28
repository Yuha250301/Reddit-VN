/* eslint-disable prettier/prettier */
import React from "react";

interface ToolCusProps {
    icon?: any;
    content: string;
    bgColor: string;
    height?: string;
    width?: string;
    dis?: false | boolean;
}

const ToolCusStyle = {
    color: "#FFFFFF",
    padding: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "16px" ,
}

const ToolCus: React.FC<ToolCusProps> = ({icon, content, bgColor, height, width, dis}) => {
    return (
        <div typeof="button" className="btn rounded" style={{...ToolCusStyle, backgroundColor: bgColor, height: height, width: width}}>
            {icon && <img src={icon} className="me-2" width="20"/>}
            <span style={{color: "fff", opacity: dis ? "0.5" : "1"}}>{content}</span>
        </div>
    )
}

export default ToolCus;