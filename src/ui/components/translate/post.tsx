/* eslint-disable prettier/prettier */
import React, { useState, useRef } from "react";
//@ts-ignore
import Popover from "react-text-selection-popover";
//@ts-ignore
import placeRightBelow from "react-text-selection-popover/lib/placeRightBelow";

import DetailUser from "./common/detail-user";
import clsx from "clsx";
import Switch from "@mui/material/Switch";
import P2T from "./common/preview-to-translate";
import { PostData } from "data/post-manager";
import ListComment from "./common/list-comment";
import Loading from "../common/loading";
import ConfigManager from "data/config";
import useTranslate from "ui/controller/use-translate";

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
  const selectionRef = useRef<HTMLDivElement>(null); //ref for highlight functional
  const popoverRef = useRef<Popover>(null);
  
  useTranslate(popoverRef);

  const handleComment = () => {
    setIsFullComment(!isFullComment);
    ConfigManager.setIsFull(!isFullComment);
  };

  return (
    <div ref={selectionRef} className={Root}>
      <div className={ClassNames.Title}>
        <h6 style={{ fontWeight: "700" }}>{post.subReddit}</h6>
        <DetailUser
          user={post.author}
          reward={
            (post.upvotes || "") +
            (post.upvotes && post.awards ? " | " : "") +
            (post.awards || "")
          }
          isBold={true}
        />
        <P2T
          content={post.title + "\r\n\r\n" + post.text}
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
      <Popover
        selectionRef={selectionRef}
        isOpen={true}
        onTextSelect={() => {
          if (popoverRef.current) popoverRef.current.style.opacity = 1;
        }}
        onTextUnselect={() => {
          if (popoverRef.current) {
            popoverRef.current.style.opacity = 0;
            popoverRef.current.innerHTML = "Sẵn sàng dịch";
          }
        }}
        placementStrategy={placeRightBelow}
        style={{ position: "absolute" }}
      >
        <div className="pop-over" id="popover" ref={popoverRef}>
          Sẵn sàng dịch
        </div>
      </Popover>
    </div>
  );
};

export default Post;
