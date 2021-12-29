/* eslint-disable prettier/prettier */
import React from "react";
import Header from "../common/header";
import { FormControl } from "react-bootstrap";
import NavbarRvn from "../common/nav";
import ToolCus from "./tool-custom";
import ScrollButton from "../common/scroll-button";
import clsx from "clsx";
import Post from "./post";

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
  return (
    <div className={Root}>
      <Header />
      <NavbarRvn />
      <div className={ClassNames.Content}>
        <p className="mb-2">
          *Click to open <u>the link</u> in new tab
        </p>
        <div
          className={clsx("d-flex", "justify-content-between", "mb-4")}
          style={{ height: "6vh", width: "100%" }}
        >
          <FormControl
            placeholder="Paste the Reddit link to translate"
            className={clsx(ClassNames.FormControl)}
          />
          <ToolCus
            content="Go ahead"
            bgColor="#414141"
            height="6vh"
            width="144px"
          />
        </div>
        <div className={clsx("d-flex", "justify-content-between", "pb-4")}>
          <div
            className={clsx("d-flex", "justify-content-between")}
            style={{ width: "810px" }}
          >
            <ToolCus
              icon={nameIcon}
              content="Name"
              bgColor="#101010"
              height="4.8vh"
            />
            <ToolCus
              icon={noteIcon}
              content="Notes"
              bgColor="#101010"
              height="4.8vh"
            />
            <ToolCus
              icon={deleteIcon}
              content="Delete"
              bgColor="#101010"
              height="4.8vh"
            />
            <ToolCus
              icon={downloadImgIcon}
              content="Download"
              bgColor="#101010"
              height="4.8vh"
              dis={true}
            />
            <ToolCus
              icon={downloadVideoIcon}
              content="Download"
              bgColor="#101010"
              height="4.8vh"
              dis={true}
            />
            <ToolCus
              icon={eyeIcon}
              content="Preview"
              bgColor="#101010"
              height="4.8vh"
            />
          </div>

          <ToolCus
            icon={saveIcon}
            content="Save"
            bgColor="#E85B25"
            height="4.8vh"
            width="144px"
          />
        </div>
        <Post />
      </div>
      <ScrollButton/>
    </div>
  );
};

export default Translate;
