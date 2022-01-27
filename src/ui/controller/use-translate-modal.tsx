import React, { useState } from "react";
import ToolCus from "ui/components/common/tool-custom";
import clsx from "clsx";

const saveIcon = require("assets/img/save_icon.svg").default;
const copyIcon = require("assets/img/copy_icon.svg").default;

interface ContentModal {
  title: string;
  large: boolean;
  content: JSX.Element | null;
}

const EMPTY_MODAL: ContentModal = {
  title: "",
  large: false,
  content: null,
};

const useTranslateModal = (): [
  ContentModal,
  (type: string, callback?: Function) => void,
  () => void,
] => {
  const [contentModal, setContentModal] = useState<ContentModal>(EMPTY_MODAL);

  const previewContent = "";

  const handleCloseModal = () => {
    setContentModal(EMPTY_MODAL);
  };

  const handleContentModal = (type: string, callback?: Function) => {
    const handleConfirm = (e: any) => {
      if (e) e.preventDefault();
      if (callback) callback();
      handleCloseModal();
    };
    switch (type) {
      case "note":
        setContentModal({
          title: "WANNA SAY SOMETHING?",
          large: false,
          content: (
            <>
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
              <div className={clsx("d-flex", "justify-content-center", "mt-3")}>
                <ToolCus
                  icon={saveIcon}
                  content="SAVE"
                  bgColor="#E85B25"
                  height="4.8vh"
                  width="144px"
                  onClick={handleCloseModal}
                />
              </div>
            </>
          ),
        });
        break;
      case "name":
        setContentModal({
          title: "TRANSLATED BY",
          large: false,
          content: (
            <>
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
              <div className={clsx("d-flex", "justify-content-center", "mt-3")}>
                <ToolCus
                  icon={saveIcon}
                  content="SAVE"
                  bgColor="#E85B25"
                  height="4.8vh"
                  width="144px"
                  onClick={handleCloseModal}
                />
              </div>
            </>
          ),
        });
        break;
      case "delete":
        setContentModal({
          title: "ARE YOU SURE TO DELETE THIS TRANSLATION?",
          large: false,
          content: (
            <>
              <div className={clsx("d-flex", "justify-content-center", "m-4")}>
                <div className="me-5">
                  <ToolCus
                    content="YES"
                    bgColor="#FFFFFF"
                    height="4.8vh"
                    width="144px"
                    onClick={handleConfirm}
                  />
                </div>
                <ToolCus
                  content="NO"
                  bgColor="#E85B25"
                  height="4.8vh"
                  width="144px"
                  onClick={handleCloseModal}
                />
              </div>
            </>
          ),
        });
        break;
      case "preview":
        setContentModal({
          title: "PREVIEW YOUR POST",
          large: true,
          content: (
            <>
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
                {previewContent}
              </div>
              <div className={clsx("d-flex", "justify-content-center", "mt-3")}>
                <ToolCus
                  icon={copyIcon}
                  content="COPY"
                  bgColor="#E85B25"
                  height="4.8vh"
                  width="144px"
                  onClick={handleCloseModal}
                />
              </div>
            </>
          ),
        });
        break;
    }
  };
  return [contentModal, handleContentModal, handleCloseModal];
};

export default useTranslateModal;
