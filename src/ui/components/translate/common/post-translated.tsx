/* eslint-disable prettier/prettier */
import React from "react";

const styles = {
  marginTop: "-1px",
  borderTop: "0.5px solid #fff",
  borderBottom: "0.5px solid #fff",
  padding: "20px 0px",
  display: "flex",
  justifyContent: "flex-start",
};

interface PreviewPostTitleProps {
  tagName: string;
  titles: any[];
}

const PreviewPostTitle: React.FC<PreviewPostTitleProps> = ({
  tagName,
  titles,
}) => {
  return (
    <div style={styles}>
      <div style={{ width: "300px" }}>
        <p>{tagName}</p>
      </div>
      <div style={{width: "100%"}}>
        {titles.map((title: any, index: number) => (
          <div key={index}>
            <p style={{cursor: "pointer" }}>{title}</p>
            {index != titles.length-1 && <hr style={{margin: "15px 0px", opacity:"0.8"}}/>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewPostTitle;
