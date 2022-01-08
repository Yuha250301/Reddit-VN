/* eslint-disable prettier/prettier */
import React from "react";
import ToolCus from "./tool-custom";
import CustomizedDialogs from "./common/basic-modal";

import clsx from "clsx";

const saveIcon = require("assets/img/save_icon.svg").default;

interface NameModalProps {
  open: boolean;
  handleClose: () => void;
}

const NameModal: React.FC<NameModalProps> = ({ open, handleClose }) => {
  return (
    <CustomizedDialogs
      title="TRANSLATED BY"
      open={open}
      handleClose={handleClose}
    >
      <textarea
        placeholder="Vietnamese translation."
        className="rounded"
        rows={18}
        style={{
          padding: 0,
          width: "98%",
          border: "16px solid #111111",
          backgroundColor: "#111111",
          color: "#fff",
          boxSizing: "border-box",
          outline: "none",
        }}
      />
      <div className={clsx("d-flex", "justify-content-center","mt-3")}>
        <ToolCus
          icon={saveIcon}
          content="SAVE"
          bgColor="#E85B25"
          height="4.8vh"
          width="144px"
          onClick={handleClose}
        />
      </div>
    </CustomizedDialogs>
  );
};

export default NameModal;
