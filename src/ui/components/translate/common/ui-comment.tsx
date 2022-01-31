/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef } from "react";
import DetailUser from "./detail-user";
import P2T from "./preview-to-translate";
import Comment from "./comment";
import clsx from "clsx";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

const Root = "rvn-translate__post__comment";
const ClassNames = {
  Root,
  Title: `${Root}__title`,
  Content: `${Root}__content`,
  Disable: `${Root}__disable`,
  Node: `${Root}__node`,
};

interface UICommentProps {
  id: string;
  postId: string;
  user: string;
  reward: string;
  content?: string;
  rootCommentId?: string;
  comments?: string[];
}

const UIComment: React.FC<UICommentProps> = ({
  id,
  rootCommentId,
  user,
  reward,
  content,
  comments,
  postId,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const [childComment, setChildComment] = useState(false);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    setIsHidden(true);
    setChildComment(false);
    if (inputRef.current && inputRef.current.checked)
      inputRef.current.checked = false;
  }, [id]);

  const handleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleChildComment = () => {
    setChildComment(!childComment);
  };

  const children: string[] = [];
  const hasChild = comments && comments.length;
  if (childComment && hasChild)
    comments.forEach((item: any) => {
      if (
        item.kind === "more" &&
        item?.data?.children &&
        Array.isArray(item?.data?.children)
      )
        children.push(...item.data.children);
      else if (item && item?.data?.id) children.push(item.data.id);
      else console.log("DataErr: comment do not match requirements", item);
    });
  return (
    <div className={ClassNames.Root}>
      <div className={ClassNames.Title}>
        <div
          style={{
            position: "relative",
            left: "-9px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {!childComment ? (
            <ArrowRightRoundedIcon
              onClick={hasChild ? handleChildComment : undefined}
              sx={{
                cursor: hasChild ? "pointer" : "auto",
                color: hasChild ? "white" : "rgba(255, 255, 255, 0.5)",
              }}
            />
          ) : (
            <ArrowDropDownRoundedIcon
              onClick={handleChildComment}
              sx={{ cursor: "pointer", color: "#fff" }}
            />
          )}
          <DetailUser user={user} reward={reward} />
        </div>

        <label className="checkbox-label">
          <input
            type="checkbox"
            onChange={handleHidden}
            defaultChecked={!isHidden}
            ref={inputRef}
          />
          <span className="checkbox-custom rectangular"></span>
        </label>
      </div>
      {content && rootCommentId && (
        <div className={clsx(ClassNames.Content)}>
          <P2T
            content={content}
            isHidden={isHidden}
            commentId={id}
            postId={postId}
            rootCommentId={rootCommentId}
          />
          <div className={clsx(!childComment && "disable")}>
            {childComment &&
              children.map((commentId: string, index: number) => (
                <div key={index} className="position-relative">
                  <Comment
                    commentId={commentId}
                    postId={postId}
                    rootCommentId={rootCommentId}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UIComment;
