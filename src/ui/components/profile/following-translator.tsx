/* eslint-disable prettier/prettier */
import clsx from "clsx";
import React, { useState } from "react";
import Avatar from "../common/avatar";
import FollowToggle from "./toggle-follow-button"
interface FollowMemberProps {
  avatar: any;
  isBest: boolean;
  name: string;
}



const FollowMember: React.FC<FollowMemberProps> = ({
  avatar,
  isBest,
  name,
}) => {
  const [isFollowing, setIsFollowing] = useState(true);

  function toggleFollow() {
    setIsFollowing(!isFollowing);
  }

  return (
    <div className={clsx("d-flex", "align-items-center")} style={{width: "300px", }}>
      <Avatar avatar={avatar} square={63} isCircle={true} />
      <div className="ms-3">
        <p className="mb-1" style={{fontSize: "18px", fontWeight: "700"}}>{name}</p>
        {isBest && <p className="mb-2" style={{fontSize: "12px", fontWeight: "400"}}>Best Member</p>}
        <FollowToggle/>
      </div>
    </div>
  );
};

export default FollowMember;
