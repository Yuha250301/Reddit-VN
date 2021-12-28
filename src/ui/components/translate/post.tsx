/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import DetailUser from "./common/detail-user";
import clsx from "clsx"
import P2T from "./common/preview-to-translate";

const commentIcon = require("assets/img/comment_icon.svg").default;


const Root = "rvn-translate__post";
const ClassNames = {
  Root,
  Title: `${Root}__title`,
  Comment: `${Root}__comment`,
};

const Post: React.FC = () => {
  return (
    <div className={Root}>
      <div className={ClassNames.Title}>
        <h6>r/rarepuppers</h6>
        <DetailUser
          user="AnhHuy"
          reward="68.2k points  |  x2 Silvers  |  x1 heck  |  x1 rocket like"
        />
        <P2T content="Original post on Reddit."/>
      </div>
      <div className={ClassNames.Comment}>
        <div className={clsx("d-flex","align-items-center")}>
            <img src={commentIcon} width="21" height="21"/>
            <h5>Found 1163 comments</h5>
        </div>
      </div>
    </div>
  );
};

export default Post;
