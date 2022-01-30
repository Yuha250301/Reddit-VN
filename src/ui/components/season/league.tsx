/* eslint-disable prettier/prettier */
import clsx from "clsx";
import React from "react";
import LeagueMember from "./league-member";
// import { FormControl } from "react-bootstrap";

const Root = "rvn-season__league__topic";
const ClassNames = {
  Root,
  Title: `${Root}__title`,
  Body: `${Root}__body`,
  Best: `${Root}__best`,
  Top5: `${Root}__top5`,
  Content: `${Root}__content`,
};

interface LeagueProps {
  title: string;
  list: any[];
}

const League: React.FC<LeagueProps> = ({ title, list }) => {
  const top1 = list.at(0);
  const newList = list.slice(1);
  // console.log(newList.length);

  return (
    <div className={Root}>
      <div className={ClassNames.Title}>{title}</div>
      <div className={ClassNames.Body}>
        <div className={clsx("border-gradient", ClassNames.Best)}>
          <div style={{ width: "70%", height: "50px" }}>
            <LeagueMember avatar={top1.avatar} name={top1.name} />
          </div>
        </div>
        <div className={ClassNames.Top5}>
          <div style={{ width: "70%", height: "100%" }}>
            {newList.map((member, index) => (
              <LeagueMember
                key={index}
                avatar={member.avatar}
                name={member.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default League;
