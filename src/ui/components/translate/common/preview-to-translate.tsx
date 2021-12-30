/* eslint-disable prettier/prettier */
import React from "react";
import { FormControl } from "react-bootstrap";
import clsx from "clsx";

interface P2TProps {
  content: string;
  isHidden?: boolean;
}

const P2T: React.FC<P2TProps> = ({ content, isHidden }) => {
  return (
    <div
      className={clsx(
        "d-flex",
        "align-content-stretch",
        "justify-content-between",
        !isHidden && "disable",
      )}
    >
      <div
        className="rounded"
        style={{
          width: "calc(100% - 48vw)",
          padding: "16px",
          backgroundColor: "#101010",
          color: "#fff",
        }}
      >
        {content}
      </div>

      <div
        className="input-box"
        style={{ marginLeft: "8vw", width: "40vw", position: "relative" }}
      >
        <FormControl
          as="textarea"
          placeholder="Vietnamese translation."
          className="rounded"
          rows={1}
          style={{
            padding: "0",
            width: "100%",
            border: "16px solid #101010",
            backgroundColor: "#101010",
            color: "#fff",
            boxSizing: "border-box",
          }}
        />
      </div>
    </div>
  );
};

export default P2T;
