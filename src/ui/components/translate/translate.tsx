/* eslint-disable prettier/prettier */
import React from "react";
import Header from "../common/header";
import NavbarRvn from "../common/nav";
import ToolCus from "../common/tool-custom";
import ScrollButton from "../common/scroll-button";
import clsx from "clsx";
import Post from "./post";
import NoteModal from "./note-modal";
import NameModal from "./name-modal";
import DeleteModal from "./delete-modal";
import PreviewModal from "./preview-modal";

const nameIcon = require("assets/img/name_icon.svg").default;
const deleteIcon = require("assets/img/delete_icon.svg").default;
const noteIcon = require("assets/img/list_icon.svg").default;
const downloadVideoIcon = require("assets/img/download_video_icon.svg").default;
const downloadImgIcon = require("assets/img/download_img_icon.svg").default;
const eyeIcon = require("assets/img/eye_icon.svg").default;
const saveIcon = require("assets/img/save_icon.svg").default;

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
  const [openNote, setOpenNote] = React.useState(false);
  const [openName, setOpenName] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openPreview, setOpenPreview] = React.useState(false);

  // const [openModal,setOpenModal] = React.useState(false);

  // const handleModal = (type: string) => {
  //   setModal
  // }

  const handleOpen = (type: string) => {
    switch (type) {
      case "note":
        setOpenNote(true);
        break;
      case "name":
        setOpenName(true);
        break;
      case "delete":
        setOpenDelete(true);
        break;
      case "preview":
        setOpenPreview(true);
        break;
    }
  };
  const handleClose = (type: string) => {
    switch (type) {
      case "note":
        setOpenNote(false);
        break;
      case "name":
        setOpenName(false);
        break;
      case "delete":
        setOpenDelete(false);
        break;
      case "preview":
        setOpenPreview(false);
        break;
    }
  };

  return (
    <div className={Root}>
      <Header />
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
            style={{backgroundColor: "#101010",border: "16px solid #101010", color: "#fff"}}
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
            className={clsx("d-flex", "justify-content-start","flex-wrap")}
            style={{ width: "810px", gap: "10px" }}
          >
            <ToolCus
              icon={nameIcon}
              content="Name"
              bgColor="#101010"
              height="48px"
              onClick={()=>handleOpen("name")}
            />
            <ToolCus
              icon={noteIcon}
              content="Notes"
              bgColor="#101010"
              height="48px"
              onClick={()=>handleOpen("note")}
            />
            <ToolCus
              icon={deleteIcon}
              content="Delete"
              bgColor="#101010"
              height="48px"
              onClick={()=>handleOpen("delete")}
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
              onClick={()=>handleOpen("preview")}
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
      <NoteModal open={openNote} handleClose={()=> handleClose("note")}/>
      <NameModal open={openName} handleClose={()=> handleClose("name")}/>
      <DeleteModal open={openDelete} handleClose={()=> handleClose("delete")}/>
      <PreviewModal open={openPreview} handleClose={()=> handleClose("preview")} content=''/>
    </div>
  );
};

export default Translate;
