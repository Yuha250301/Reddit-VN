import React, { useEffect, useState } from "react";

import PostController from "controller/core/post";
import TransController from "controller/core/trans";

import ToolCus from "../common/tool-custom";
import clsx from "clsx";
import { PostData } from "data/post-manager";
import ModalManager from "../modal/manager";
import { ModalType } from "../modal/const";
import downloadImg from "utils/image-downloader";
import { getPathFromUrl } from "utils/url-helper";

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
  isCrawl: boolean;
  setIsCrawl: React.Dispatch<React.SetStateAction<boolean>>;
}

const TranslateHeader: React.FC<TranslateHeaderProps> = ({
  post,
  setPost,
  setIsCrawl,
  isCrawl,
}) => {
  const [url, setUrl] = useState(post?.link || "");
  const [imgContent, setImgContent] = useState("Download");
  const [downloadingVideo, setDownloadingVideo] = useState(false);
  useEffect(() => {
    setUrl(post?.link || "");
  }, [post?.link]);

  const updateUrl = (e: any) => {
    if (!post) setUrl(e.target.value);
  };

  const crawl = (e: any) => {
    if (e) e.preventDefault();
    if (!isCrawl) {
      PostController.crawl(getPathFromUrl(url))
        .then(setPost)
        .catch((err) => {
          console.log("CoreError: err when crawl", err);
          ModalManager.addModal(ModalType.ERROR_MODAL, err.message);
        })
        .finally(() => {
          setIsCrawl(false);
        });
      setIsCrawl(true);
    }
  };

  const savePost = async () => {
    try {
      if (post) await TransController.save(post.id);
      ModalManager.addModal(
        ModalType.ANNOUCE_MODAL,
        "Bài dịch của bạn đã được lưu thành công",
      );
    } catch (err: any) {
      ModalManager.addModal(ModalType.ERROR_MODAL, err.message);
    }
  };

  const downloadImage = async () => {
    if (post && post.isImage && post.url) {
      setImgContent("Downloading");
      await downloadImg(post.url, post.id);
      setImgContent("Download");
    }
  };

  const startDownloadVideo = () => {
    if (post && post.url && (post.fallbackUrl || post.url)) {
      setDownloadingVideo(true);
    }
  };

  return (
    <>
      {url && (
        <p className="mb-2">
          *Click to open{" "}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fd7e14" }}
          >
            the link
          </a>{" "}
          in new tab
        </p>
      )}
      <form>
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
              marginRight: "20px",
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
        <button style={{ display: "none" }} onClick={crawl} type="submit" />
      </form>
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
            onClick={() => ModalManager.addModal(ModalType.NAME_MODAL)}
          />
          <ToolCus
            icon={noteIcon}
            content="Notes"
            bgColor="#101010"
            height="48px"
            onClick={() => ModalManager.addModal(ModalType.NOTE_MODAL)}
          />
          {post && (
            <>
              <ToolCus
                icon={deleteIcon}
                content="Delete"
                bgColor="#101010"
                height="48px"
                onClick={() => ModalManager.addModal(ModalType.DELETE_MODAL)}
              />
              <ToolCus
                icon={downloadImgIcon}
                content={imgContent}
                bgColor="#101010"
                height="48px"
                dis={!post.isImage || !post.url}
                onClick={downloadImage}
              />
              <ToolCus
                icon={downloadVideoIcon}
                content="Download"
                bgColor="#101010"
                height="48px"
                dis={
                  !post.isVideo ||
                  downloadingVideo ||
                  (!post.url && !post.fallbackUrl)
                }
                onClick={startDownloadVideo}
              />
              <ToolCus
                icon={eyeIcon}
                content="Preview"
                bgColor="#101010"
                height="48px"
                onClick={() => ModalManager.addModal(ModalType.PREVIEW_MODAL)}
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
            onClick={savePost}
          />
        )}
        {post && downloadingVideo && (
          <iframe
            key={post.id}
            src={
              "https://down-583a6.web.app/?video=" +
              btoa(post.fallbackUrl) +
              "&audio=" +
              btoa(post.url + "/audio")
            }
            style={{ display: "none" }}
          />
        )}
      </div>
    </>
  );
};

export default TranslateHeader;
