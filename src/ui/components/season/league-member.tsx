/* eslint-disable prettier/prettier */
import clsx from "clsx";
import React from "react";

import Avatar from "../common/avatar";

interface LeagueMemberProps {
  avatar: any;
  name: string;
}

const LeagueMember: React.FC<LeagueMemberProps> = ({ avatar, name }) => {
  return <div className={clsx("league-member", "d-flex", "align-items-center","mb-3")}>
    <Avatar avatar={avatar} square={39} isCircle={false}/>
    <span className="ms-3">{name}</span>
  </div>;
};

export default LeagueMember;
