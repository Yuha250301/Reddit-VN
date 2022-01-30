import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useRecoilValue } from "recoil";

import noteAtom from "ui/state/note-atom";
import postAtom from "ui/state/post-atom";
import ToolCus from "../common/tool-custom";
import copyToClipBoard from "utils/copy-to-clipboard";
import AuthManager from "data/auth-manager";
import TransManager from "data/trans-manager";
import RedditManager from "data/reddit-manager";
import { ContentModalProps } from "./const";

const copyIcon = require("assets/img/copy_icon.svg").default;

const PreviewModal: React.FC<ContentModalProps> = () => {
  const [copy, setCopy] = useState<string>("Copy");
  const [content, setContent] = useState<string>("");
  const note = useRecoilValue<string>(noteAtom);
  const post = useRecoilValue(postAtom);

  const getContentTrans = (comments: any) => {
    let endLine = "\r\n";
    return (
      comments.prefix +
      comments.author +
      comments.description
        .replace(/points\ points/, "points")
        .replace(/point\ points/, "point") +
      endLine +
      comments.content +
      endLine
    );
  };

  const previewContent = async (subscribed: boolean) => {
    if (!post) return;
    const raw = TransManager.getTransByPost(post.id);
    if (!raw.length) return;
    const trans = await RedditManager.convertListComment(post.id, raw);
    const commentSeparator = "_____________________" + "\r\n";
    const endLine = "\r\n";

    //tạo content theo format
    let content =
      post.subReddit +
      endLine +
      post.author +
      ` (${post.upvotes}${post.awards && " - "}${post.awards}) ` +
      endLine;
    const transMap = trans.reduce((pre: any, item) => {
      if (item.rootCommentId === post.id)
        content = content + item.content + endLine;
      else if (!pre[item.rootCommentId]) pre[item.rootCommentId] = [item];
      else if (item.rootCommentId === item.commentId) {
        pre[item.rootCommentId] = [item, ...pre[item.rootCommentId]];
      } else pre[item.rootCommentId].push(item);
      return pre;
    }, {});

    content = content + commentSeparator;
    content =
      content +
      "Link Reddit: " +
      post.shortenLink +
      endLine +
      commentSeparator +
      endLine;

    Object.values(transMap).forEach((comments: unknown) => {
      const list = comments as any[];
      const deep = list.reduce((pre, comment) => {
        pre += getContentTrans(comment);
        return pre;
      }, "");
      content = content + deep + commentSeparator + endLine;
    });

    content = content.replace(/\r\n$/, "");

    //Thêm note và credit
    if (note !== "") content = content + note + endLine + commentSeparator;
    content =
      content +
      `Dịch bởi ${
        AuthManager.getAliasName() || "một member chăm chỉ dịch bài"
      }` +
      endLine +
      "Edited by https://translate-rvn.web.app/";
    if (subscribed)
      setContent(
        content
          .replace(/\r\n\r\n\r\n/g, "\r\n\r\n")
          .replace(/\r\n\r\n_/, "\r\n"),
      );
  };

  useEffect(() => {
    let subscribed = true;
    previewContent(subscribed);
    return () => {
      subscribed = false;
    };
  }, []);
  return (
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
          whiteSpace: "pre-wrap",
          overflow: "auto"
        }}
      >
        {content}
      </div>
      <div className={clsx("d-flex", "justify-content-center", "mt-3")}>
        <ToolCus
          icon={copyIcon}
          content={copy}
          bgColor="#E85B25"
          height="4.8vh"
          width="144px"
          onClick={() => {
            copyToClipBoard(content, () => {
              setCopy("Copied");
            });
          }}
        />
      </div>
    </>
  );
};

export default PreviewModal;
