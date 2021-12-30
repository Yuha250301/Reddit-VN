/* eslint-disable prettier/prettier */
import React from "react";
import ToolCus from "./tool-custom";
import CustomizedDialogs from "./common/basic-modal";

import clsx from "clsx";

const copyIcon = require("assets/img/copy_icon.svg").default;

interface PreviewModalProps {
  open: boolean;
  handleClose: () => void;
  content: string;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  open,
  handleClose,
  content,
}) => {
  return (
    <CustomizedDialogs
      title="PREVIEW YOUR POST"
      open={open}
      handleClose={handleClose}
      large={true}
    >
      <div
        style={{
          padding: 0,
          height: "60vh",
          width: "100%",
          border: "16px solid #111111",
          borderRadius: "20px",
          backgroundColor: "#111111",
          color: "#fff",
          boxSizing: "border-box",
        }}
      >
        {content}
      </div>
      <div className={clsx("d-flex", "justify-content-center", "mt-3")}>
        <ToolCus
          icon={copyIcon}
          content="COPY"
          bgColor="#E85B25"
          height="4.8vh"
          width="144px"
          onClick={handleClose}
        />
      </div>
    </CustomizedDialogs>
  );
};

export default PreviewModal;
