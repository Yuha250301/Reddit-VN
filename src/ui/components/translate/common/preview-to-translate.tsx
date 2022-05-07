/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useMemo, useCallback } from "react";
import clsx from "clsx";
import Markdown from "react-markdown";
import TransManager, { CommentTranslate } from "data/trans-manager";
import debounce from "utils/debounce";
import TransController from "controller/core/trans";
import parseContent from "utils/decode-text";

interface P2TProps {
  content: string;
  commentId: string;
  postId: string;
  rootCommentId: string;
  isHidden?: boolean;
}

const DEBOUNCE_TIME = 500;

const P2T: React.FC<P2TProps> = ({
  content,
  isHidden,
  commentId,
  postId,
  rootCommentId,
}) => {
  const [translate, setTranslate] = useState<string>("");
  const getTrans = async (subscribed: boolean) => {
    const data = await TransManager.getTrans(postId, commentId);
    if (subscribed) setTranslate(data);
  };
  const updateContent = (comment: CommentTranslate) => {
    if (comment.content) TransController.update(comment);
    else TransController.delete(comment);
  }
  const updateTrans = useMemo(() => {
    return debounce(updateContent, DEBOUNCE_TIME);
  }, []);

  const handleTextChange = useCallback((value: string) => {
    setTranslate(value);
    const comment = {
      content: value,
      commentId,
      postId,
      rootCommentId,
    };
    updateTrans(comment);
  }, [rootCommentId, commentId, postId]);

  useEffect(() => {
    let subscribed = true;
    if (!isHidden) getTrans(subscribed);
    return () => {
      subscribed = false;
    };
  }, [commentId, isHidden]);
  return (
    <div
      className={clsx(
        "d-flex",
        "align-content-stretch",
        "justify-content-between",
        isHidden && "disable",
      )}
    >
      <div
        className="rounded"
        style={{
          width: "calc(100% - 48vw)",
          padding: "16px",
          backgroundColor: "#101010",
          color: "#fff",
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
          lineHeight: "1.25rem"
        }}
      >
        <Markdown>{parseContent(content) || ""}</Markdown>
      </div>

      <div
        className="input-box"
        style={{
          marginLeft: "8vw",
          width: "40vw",
          position: "relative",
        }}
      >
        <textarea
          placeholder="Vietnamese translation."
          className="rounded"
          style={{
            padding: "0",
            width: "100%",
            border: "16px solid #101010",
            backgroundColor: "#101010",
            color: "#fff",
            boxSizing: "border-box",
            outline: "none",
            height: "100%",
            lineHeight: "1.25rem"
          }}
          value={translate}
          onChange={(e) => handleTextChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default P2T;
