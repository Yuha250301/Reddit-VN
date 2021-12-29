/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import DetailUser from "./detail-user";
import P2T from "./preview-to-translate";
import clsx from "clsx";

const nodeIcon = require("assets/img/node_icon.svg").default;

const Root = "rvn-translate__post__comment";
const ClassNames = {
  Root,
  Title: `${Root}__title`,
  Content: `${Root}__content`,
  Disable: `${Root}__disable`,
  Node: `${Root}__node`,
};

interface CommentProps {
  user: string;
  reward: string;
  content: string;
  comment: any[];
}

const Comment: React.FC<CommentProps> = ({
  user,
  reward,
  content,
  comment,
}) => {
  const [isHidden, setIsHidden] = useState(false);

  const handleHidden = () => {
    setIsHidden(!isHidden);
  };
  return (
    <div className={ClassNames.Root}>
      <div className={ClassNames.Title}>
        <DetailUser user={user} reward={reward} />

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
        <div>
          {comment.map((comment, index) => (
            <div key={index} className="position-relative">
              <img src={nodeIcon} className={ClassNames.Node} />
              <Comment
                user={comment.user}
                reward={comment.reward}
                content={comment.content}
                comment={comment.comment}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
