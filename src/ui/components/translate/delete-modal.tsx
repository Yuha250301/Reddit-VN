/* eslint-disable prettier/prettier */
import React from "react";
import ToolCus from "./tool-custom";
import CustomizedDialogs from "./common/basic-modal";

import clsx from "clsx";

interface DeleteModalProps {
  open: boolean;
  handleClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ open, handleClose }) => {
  return (
    <CustomizedDialogs
      title="ARE YOU SURE TO DELETE THIS TRANSLATION?"
      open={open}
      handleClose={handleClose}
    >
      <div className={clsx("d-flex", "justify-content-center", "m-4")}>
        <div className="me-5">
          <ToolCus
            content="YES"
            bgColor="#FFFFFF"
            height="4.8vh"
            width="144px"
            onClick={handleClose}
          />
        </div>

        <ToolCus
          content="NO"
          bgColor="#E85B25"
          height="4.8vh"
          width="144px"
          onClick={handleClose}
        />
      </div>
    </CustomizedDialogs>
  );
};

export default DeleteModal;
