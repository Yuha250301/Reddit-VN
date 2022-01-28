/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import DetailUser from "./detail-user";
import P2T from "./preview-to-translate";
import Comment from "./comment";
import clsx from "clsx";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

const nodeIcon = require("assets/img/node_icon.svg").default;

const Root = "rvn-translate__post__comment";
const ClassNames = {
  Root,
  Title: `${Root}__title`,
  Content: `${Root}__content`,
  Disable: `${Root}__disable`,
  Node: `${Root}__node`,
};

interface UICommentProps {
  postId: string;
  user: string;
  reward: string;
  content: string;
  comments: string[];
}

const UIComment: React.FC<UICommentProps> = ({
  user,
  reward,
  content,
  comments,
  postId,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  const [childComment, setChildComment] = useState(false);

  const handleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleChildComment = () => {
    setChildComment(!childComment);
  };

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
              onClick={comments.length !== 0 ? handleChildComment : () => this}
              sx={{
                cursor: comments.length !== 0 ? "pointer" : "auto",
                color:
                  comments.length !== 0 ? "white" : "rgba(255, 255, 255, 0.5)",
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
            defaultChecked={isHidden}
          />
          <span className="checkbox-custom rectangular"></span>
        </label>
      </div>
      <div className={clsx(ClassNames.Content)}>
        <P2T content={content} isHidden={isHidden} />
        <div className={clsx(!childComment && "disable")}>
          {childComment && comments.map((commentId: string, index: number) => (
            <div key={index} className="position-relative">
              <img src={nodeIcon} className={ClassNames.Node} />
              <Comment commentId={commentId} postId={postId} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UIComment;
