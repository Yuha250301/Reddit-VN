/* eslint-disable prettier/prettier */
import clsx from "clsx";
import React from "react";
import Award from "../common/award";
import Avatar from "../common/avatar";
import NavItem from "../common/nav-item";
import ProgressCircle from "./progress-circle";
import FollowMember from "./following-translator";

const avatar = require("assets/img/logo.svg").default;
const noneBanner = require("assets/img/none_banner.svg").default;

const Root = "rvn-profile";
const ClassNames = {
  Root,
  Body: `${Root}__body`,
  Content: `${Root}__content`,
  Info: `${Root}__info`,
  Collection: `${Root}__collection`,
  Following: `${Root}__following`,
};

const ListAward = ["TRANSLATOR OF THE MONTH", "GOLD MEMBER", "SILVER MEMBER"];
const ListFollowing = [
  { name: "Translator name", isBest: true },
  { name: "Translator name", isBest: true },
  { name: "Translator name", isBest: true },
  { name: "Translator name", isBest: true },
  { name: "Translator name", isBest: true },
  { name: "Translator name", isBest: true },
];

const Profile: React.FC = () => {
  return (
    <div className={Root}>
      <div className={ClassNames.Body}>
        <div className={clsx(ClassNames.Info)}>
          <ProgressCircle value={30}>
            <Avatar avatar={avatar} square={94} isCircle={true} />
          </ProgressCircle>
          <div>
            <div className={clsx("d-flex", "align-items-center")}>
              <h1>Username</h1>
              <NavItem content="Set your banner">
                <div style={{ cursor: "pointer" }}>
                  <img src={noneBanner} width="36" height="36" />
                </div>
              </NavItem>
            </div>
            <p>8/20 translations to Gold member</p>
          </div>
          <div className="change-button">CHANGE YOUR PROFILE</div>
        </div>
        <div
          className={clsx(
            ClassNames.Content,
            ClassNames.Collection,
            "d-flex",
            "flex-wrap",
          )}
        >
          <h6>YOUR COLLECTION</h6>
          {ListAward.map((award, index) => (
            <Award key={index} content={award} />
          ))}
        </div>
        <div className={clsx(ClassNames.Content)}>
          <h6>FOLLOWING</h6>
          <div className={clsx(ClassNames.Following)}>
            {ListFollowing.map((follower, index) => (
              <FollowMember
                key={index}
                avatar={noneBanner}
                isBest={follower.isBest}
                name={follower.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
