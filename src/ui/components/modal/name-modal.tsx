import React, { useState } from "react";
import clsx from "clsx";

import AuthController from "controller/core/auth";
import AuthManager from "data/auth-manager";
import ToolCus from "../common/tool-custom";
import { ContentModalProps } from "./const";

const saveIcon = require("assets/img/save_icon.svg").default;

const NameModal: React.FC<ContentModalProps> = ({ handleCloseModal }) => {
  const [name, setName] = useState<string>(AuthManager.getAliasName());
  const updateName = async () => {
    await AuthController.updateAliasName(name);
    handleCloseModal();
  };
  return (
    <>
      <textarea
        placeholder={"Muốn tên gì thì viết vào đây nè"}
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
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className={clsx("d-flex", "justify-content-center", "mt-3")}>
        <ToolCus
          icon={saveIcon}
          content="SAVE"
          bgColor="#E85B25"
          height="4.8vh"
          width="144px"
          onClick={updateName}
        />
      </div>
    </>
  );
};

export default NameModal;
