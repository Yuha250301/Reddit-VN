/* eslint-disable prettier/prettier */
import clsx from "clsx";
import React from "react";

import Avatar from "../common/avatar";
const Root = "rvn-forum__suggest-menu__suggest-item";

interface SuggestItemProps {
  avatar: any;
  name: string;
}

const SuggestItem: React.FC<SuggestItemProps> = ({ avatar, name }) => {
  return <div className={Root}>
    <Avatar avatar={avatar} square={39} isCircle={false}/>
    <span className="ms-3">{name}</span>
  </div>;
};

export default SuggestItem;
