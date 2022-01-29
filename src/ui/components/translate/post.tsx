/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import DetailUser from "./common/detail-user";
import clsx from "clsx";
import Switch from "@mui/material/Switch";
import P2T from "./common/preview-to-translate";
import { PostData } from "data/post-manager";
import Comment from "./common/comment";

const commentIcon = require("assets/img/comment_icon.svg").default;

interface PostProps {
  post: PostData;
  isReady: boolean;
}

const Root = "rvn-translate__post";
const ClassNames = {
  Root,
  Title: `${Root}__title`,
  UIComment: `${Root}__comment`,
};

const Post: React.FC<PostProps> = ({ post, isReady }) => {
  const [isFullComment, setIsFullComment] = useState(true);

  const handleComment = () => {
    setIsFullComment(!isFullComment);
  };

  return (
    <div className={Root}>
      <div className={ClassNames.Title}>
        <h6>{post.subReddit}</h6>
        <DetailUser
          user={post.author}
          reward={`${post.upvotes} | ${post.awards}`}
        />
        <P2T
          content={post.title}
          isHidden={false}
          commentId={post.id}
          postId={post.id}
          rootCommentId={post.id}
        />
      </div>
      <div className={ClassNames.UIComment}>
        <div className={clsx("d-flex", "justify-content-between")}>
          <div className={clsx("d-flex", "align-items-center")}>
            <img src={commentIcon} width="21" height="21" />
            <h5>Found {post.num_comments} comments</h5>
          </div>
          <div className={clsx("d-flex", "align-items-center")}>
            <Switch
              checked={isFullComment}
              onChange={handleComment}
              sx={{
                "& .MuiSwitch-thumb": {
                  color: "#fff",
                },
                "& .MuiSwitch-switchBase": {
                  "&.Mui-checked": {
                    "& + .MuiSwitch-track": {
                      backgroundColor: "#E85B25",
                      opacity: "1",
                    },
                  },
                },
              }}
            />
            <h5>Full comments</h5>
          </div>
        </div>
        {isReady && post.rootComments && post.rootComments.length
          ? post.rootComments.map((id: string, index: number) => (
              <Comment postId={post.id} commentId={id} key={index} />
            ))
          : null}
      </div>
    </div>
  );
};

export default Post;
