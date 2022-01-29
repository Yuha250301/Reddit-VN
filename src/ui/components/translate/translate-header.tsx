import React, { useEffect, useState } from "react";

import PostController from "controller/core/post";

import ToolCus from "../common/tool-custom";
import clsx from "clsx";
import { PostData } from "data/post-manager";
import manager from "../modal/manager";
import { ModalType } from "../modal/const";


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
interface TranslateHeaderProps {
  post: PostData | undefined;
  setPost: React.Dispatch<React.SetStateAction<PostData | undefined>>;
}

const TranslateHeader: React.FC<TranslateHeaderProps> = ({
  post,
  setPost,
}) => {
  const [url, setUrl] = useState(post?.link || "");
  useEffect(() => {
    setUrl(post?.link || "");
  }, [post?.link]);

  const updateUrl = (e: any) => {
    if (!post) setUrl(e.target.value);
  };

  const crawl = () => {
    PostController.crawl(url)
      .then(setPost)
      .catch((err) => console.log("CoreError: err when crawl", err));
  };
  const deletePost = async () => {
    if (post) await PostController.delete(post.id);
    setPost(undefined);
  };
  return (
    <>
      {url && (
        <p className="mb-2">
          *Click to open{" "}
          <a href={url} target="_blank" style={{ color: "#fd7e14" }}>
            the link
          </a>{" "}
          in new tab
        </p>
      )}
      <div
        className={clsx("d-flex", "justify-content-between", "mb-3")}
        style={{ width: "100%" }}
      >
        <input
          placeholder="Paste the Reddit link to translate"
          className={clsx(ClassNames.FormControl)}
          style={{
            backgroundColor: "#101010",
            border: "16px solid #101010",
            color: "#fff",
          }}
          disabled={!!post}
          value={url}
          onChange={updateUrl}
        />
        <ToolCus
          content="Go ahead"
          bgColor="#414141"
          height="56px"
          width="144px"
          onClick={crawl}
          dis={!!post}
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
            onClick={() => manager.addModal(ModalType.NAME_MODAL)}
          />
          <ToolCus
            icon={noteIcon}
            content="Notes"
            bgColor="#101010"
            height="48px"
            onClick={() => manager.addModal(ModalType.NOTE_MODAL)}
          />
          {post && (
            <>
              <ToolCus
                icon={deleteIcon}
                content="Delete"
                bgColor="#101010"
                height="48px"
                onClick={() => manager.addModal(ModalType.DELETE_MODAL)}
              />
              <ToolCus
                icon={downloadImgIcon}
                content="Download"
                bgColor="#101010"
                height="48px"
                dis={!post.isImage}
              />
              <ToolCus
                icon={downloadVideoIcon}
                content="Download"
                bgColor="#101010"
                height="48px"
                dis={!post.isVideo}
              />
              <ToolCus
                icon={eyeIcon}
                content="Preview"
                bgColor="#101010"
                height="48px"
                onClick={() => manager.addModal(ModalType.PREVIEW_MODAL)}
              />
            </>
          )}
        </div>

        {post && (
          <ToolCus
            icon={saveIcon}
            content="Save"
            bgColor="#E85B25"
            height="48px"
            width="144px"
          />
        )}
      </div>
    </>
  );
};

export default TranslateHeader;
