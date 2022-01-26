/* eslint-disable prettier/prettier */
import React from "react";
import { crawler } from "utils/crawler";

import NavbarRvn from "../common/nav";
import ToolCus from "../common/tool-custom";
import ScrollButton from "../common/scroll-button";
import clsx from "clsx";
import Post from "./post";
import NoteModal from "./note-modal";
import NameModal from "./name-modal";
import DeleteModal from "./delete-modal";
import PreviewModal from "./preview-modal";
import CustomizedDialogs from "./common/basic-modal";


const nameIcon = require("assets/img/name_icon.svg").default;
const deleteIcon = require("assets/img/delete_icon.svg").default;
const noteIcon = require("assets/img/list_icon.svg").default;
const downloadVideoIcon = require("assets/img/download_video_icon.svg").default;
const downloadImgIcon = require("assets/img/download_img_icon.svg").default;
const eyeIcon = require("assets/img/eye_icon.svg").default;
const saveIcon = require("assets/img/save_icon.svg").default;
const copyIcon = require("assets/img/copy_icon.svg").default;


const Root = "rvn-translate";
const ClassNames = {
  Root,
  Body: `${Root}__body`,
  Content: `${Root}__content`,
  FormControl: `${Root}__form-control`,
  Tool: `${Root}__tool`,
  DisableTool: `${Root}__disable-tool`,
};

const Translate: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [contentModal, setContentModal] = React.useState({title:"",large:false, content: <></>});

  const previewContent = "";

  const handleModal = () => {
    setOpenModal(!openModal);
  }

  const handleContentModal = (type: string) => {
    switch (type) {
      case "note":
        setContentModal({
          title: "WANNA SAY SOMETHING?",
          large: false,
          content:
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
                  onClick={handleModal}
                />
              </div>
            </>
        })
        break;
      case "name":
        setContentModal({
          title: "TRANSLATED BY",
          large: false,
          content:
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
                  onClick={handleModal}
                />
              </div>
            </>
        });
        break;
      case "delete":
        setContentModal({
          title: "ARE YOU SURE TO DELETE THIS TRANSLATION?",
          large: false,
          content:
            <>
              <div className={clsx("d-flex", "justify-content-center", "m-4")}>
                <div className="me-5">
                  <ToolCus
                    content="YES"
                    bgColor="#FFFFFF"
                    height="4.8vh"
                    width="144px"
                    onClick={handleModal}
                  />
                </div>
                <ToolCus
                  content="NO"
                  bgColor="#E85B25"
                  height="4.8vh"
                  width="144px"
                  onClick={handleModal}
                />
              </div>
            </>
        });
        break;
      case "preview":
        setContentModal({
          title: "PREVIEW YOUR POST",
          large: true,
          content:
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
                  onClick={handleModal}
                />
              </div>
            </>
        });
        break;
    }
  }

  return (
    <div className={Root}>
      <NavbarRvn />
      <div className={ClassNames.Content}>
        <p className="mb-2">
          *Click to open <u>the link</u> in new tab
        </p>
        <div
          className={clsx("d-flex", "justify-content-between", "mb-3")}
          style={{ width: "100%" }}
        >
          <input
            placeholder="Paste the Reddit link to translate"
            className={clsx(ClassNames.FormControl)}
            style={{ backgroundColor: "#101010", border: "16px solid #101010", color: "#fff" }}
          />
          <ToolCus
            content="Go ahead"
            bgColor="#414141"
            height="56px"
            width="144px"
          />
        </div>
        <div className={clsx("d-flex", "justify-content-between", "pb-4")}>
          <div
            className={clsx("d-flex", "justify-content-start", "flex-wrap")}
            style={{ width: "810px", gap: "10px" }}
          >
            <ToolCus
              icon={nameIcon}
              content="Name"
              bgColor="#101010"
              height="48px"
              onClick={() => {handleModal(); handleContentModal("name")}}
            />
            <ToolCus
              icon={noteIcon}
              content="Notes"
              bgColor="#101010"
              height="48px"
              onClick={() => {handleModal(); handleContentModal("note")}}
            />
            <ToolCus
              icon={deleteIcon}
              content="Delete"
              bgColor="#101010"
              height="48px"
              onClick={() => {handleModal(); handleContentModal("delete")}}
            />
            <ToolCus
              icon={downloadImgIcon}
              content="Download"
              bgColor="#101010"
              height="48px"
              dis={true}
            />
            <ToolCus
              icon={downloadVideoIcon}
              content="Download"
              bgColor="#101010"
              height="48px"
              dis={true}
            />
            <ToolCus
              icon={eyeIcon}
              content="Preview"
              bgColor="#101010"
              height="48px"
              onClick={() => {handleModal(); handleContentModal("preview")}}
            />
          </div>

          <ToolCus
            icon={saveIcon}
            content="Save"
            bgColor="#E85B25"
            height="48px"
            width="144px"
          />
        </div>
        <Post />
      </div>
      <ScrollButton />
      <CustomizedDialogs
        title={contentModal.title}
        open={openModal}
        handleClose={handleModal}
        large={contentModal.large}
      >
        {contentModal.content}
      </CustomizedDialogs>

    </div>
  );
};

export default Translate;
