/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import DetailUser from "./common/detail-user";
import clsx from "clsx";
import Switch from "@mui/material/Switch";
import P2T from "./common/preview-to-translate";
import { PostData } from "data/post-manager";
import ListComment from "./common/list-comment";
import Loading from "../common/loading";
import ConfigManager from "data/config";

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
  const [isFullComment, setIsFullComment] = useState(ConfigManager.getIsFull());

  const handleComment = () => {
    setIsFullComment(!isFullComment);
    ConfigManager.setIsFull(!isFullComment);
  };

  return (
    <div className={Root}>
      <div className={ClassNames.Title}>
        <h6>{post.subReddit}</h6>
        <DetailUser
          user={post.author}
          reward={
            (post.upvotes || "") +
            (post.upvotes && post.awards ? " | " : "") +
            (post.awards || "")
          }
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
        {isReady && post.rootComments && post.rootComments.length ? (
          <ListComment
            itemsPerPage={30}
            list={post.rootComments}
            postId={post.id}
          />
        ) : (
          <Loading style={{ margin: "50px 0" }} />
        )}
      </div>
    </div>
  );
};

export default Post;
