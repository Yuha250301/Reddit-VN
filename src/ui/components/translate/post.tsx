/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import DetailUser from "./common/detail-user";
import Comment from "./common/comment";
import clsx from "clsx";
import Switch from "@mui/material/Switch";
import P2T from "./common/preview-to-translate";

const commentIcon = require("assets/img/comment_icon.svg").default;

const Root = "rvn-translate__post";
const ClassNames = {
  Root,
  Title: `${Root}__title`,
  Comment: `${Root}__comment`,
};

const Post: React.FC = () => {
  const [isFullComment, setIsFullComment] = useState(true);

  const handleComment = () => {
    setIsFullComment(!isFullComment);
  };

  return (
    <div className={Root}>
      <div className={ClassNames.Title}>
        <h6>r/rarepuppers</h6>
        <DetailUser
          user="AnhHuy"
          reward="68.2k points  |  x2 Silvers  |  x1 heck  |  x1 rocket like"
        />
        <P2T content="Original post on Reddit." isHidden={true} />
      </div>
      <div className={ClassNames.Comment}>
        <div className={clsx("d-flex", "justify-content-between")}>
          <div className={clsx("d-flex", "align-items-center")}>
            <img src={commentIcon} width="21" height="21" />
            <h5>Found 1163 comments</h5>
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

        <Comment
          user="NoLoveLostOrFound"
          reward="28k points  |  x1 Silvers"
          content="Original post on Reddit."
          comment={[
            {
              user: "NoLoveLostOrFound",
              reward: "28k points  |  x1 Silvers",
              content: "Original post on Reddit.",
              comment: [
                {
                  user: "NoLoveLostOrFound",
                  reward: "28k points  |  x1 Silvers",
                  content: "Original post on Reddit.",
                  comment: [],
                },
                {
                  user: "NoLoveLostOrFound",
                  reward: "28k points  |  x1 Silvers",
                  content: "Original post on Reddit.",
                  comment: [],
                },
              ],
            },
            {
              user: "NoLoveLostOrFound",
              reward: "28k points  |  x1 Silvers",
              content: "Original post on Reddit.",
              comment: [],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Post;
