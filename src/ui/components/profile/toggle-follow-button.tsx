/* eslint-disable prettier/prettier */
import clsx from "clsx";
import React, { useState } from "react";

const followers = require("assets/img/followers.svg").default;
const unFollowers = require("assets/img/followers1.svg").default;

const FollowToggle: React.FC = () => {
  const [isFollowing, setIsFollowing] = useState(true);

  function toggleFollow() {
    setIsFollowing(!isFollowing);
  }

  return (
    <>
      {isFollowing ? (
        <div
          className={clsx("d-flex", "justify-content-center")}
          onClick={toggleFollow}
          style={{
            width: "92px",
            fontSize: "12px",
            fontWeight: "700",
            borderRadius: "25px",
            backgroundColor: "#E85B25",
            color: "#fff",
            padding: "3px",
          }}
        >
          <img src={followers} className="me-2" />
          Following
        </div>
      ) : (
        <div
          className={clsx("d-flex", "justify-content-center")}
          onClick={toggleFollow}
          style={{
            width: "92px",
            fontSize: "12px",
            fontWeight: "700",
            borderRadius: "25px",
            backgroundColor: "#fff",
            color: "#000",
            padding: "3px",
          }}
        >
          <img src={unFollowers} className="me-2" />
          <span>Follow</span>
        </div>
      )}
    </>
  );
};

export default FollowToggle;
