import React from "react";
import clsx from "clsx";

import ToolCus from "../common/tool-custom";
import { ContentModalProps } from "./const";

const ErrorModal: React.FC<ContentModalProps> = ({
  content,
  handleCloseModal,
}) => {
  return (
    <>
      <h5 style={{ color: "#fff", textAlign: "center" }}>
        {content ||
          "I think we have some error but i can't be sure what that's?"}
      </h5>
      <div className={clsx("d-flex", "justify-content-center", "mt-3")}>
        <ToolCus
          content="OK"
          bgColor="#E85B25"
          height="4.8vh"
          width="144px"
          onClick={handleCloseModal}
        />
      </div>
    </>
  );
};

export default ErrorModal;
