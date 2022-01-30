/* eslint-disable prettier/prettier */
import React from "react";

const forumIcon = require("assets/img/forum.svg").default;

const Root = "rvn-forum__table-forum__node-forum";
const ClassNames = {
    Root,
    Body: `${Root}__body`,
  };

interface NodeForumProps {
  title: string;
  description: string;
  info: string;
}

const NodeOfForum: React.FC<NodeForumProps> = ({ title, description, info }) => {
  return (
    <div className={Root}>
        <img src={forumIcon} />
        <div className={ClassNames.Body}>
            <h6>{title}</h6>
            <p>{description}</p>
        </div>
        <p>{info}</p>
    </div>
  );
};

export default NodeOfForum;
