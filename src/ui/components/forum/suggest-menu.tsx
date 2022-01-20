/* eslint-disable prettier/prettier */
import clsx from "clsx";
import React from "react";
import SuggestItem from "./suggest-item";
// import { FormControl } from "react-bootstrap";

const Root = "rvn-forum__suggest-menu";
const ClassNames = {
  Root,
  Title: `${Root}__title`,
  Body: `${Root}__body`,
  Best: `${Root}__best`,
  Top: `${Root}__top`,
  Content: `${Root}__content`,
};

interface SuggestMenuProps {
  title: string;
  list: any[];
  haveBest?: boolean;
}

const SuggestMenu: React.FC<SuggestMenuProps> = ({ title, list, haveBest }) => {
  const top1 = list.at(0);
  let newList = list.slice(1);

  if (!haveBest) {
    newList = list.slice(0);
  }
  // console.log(newList.length);

  return (
    <div className={Root}>
      <h6 className={ClassNames.Title}>{title}</h6>
      <div className={ClassNames.Body}>
        {haveBest && <div className={clsx("border-gradient", ClassNames.Best)}>
          <div style={{ width: "70%", height: "50px" }}>
            <SuggestItem avatar={top1.avatar} name={top1.name} />
          </div>
        </div>}
        <div className={ClassNames.Top}>
          <div style={{ width: "70%", height: "100%" }}>
            {newList.map((member, index) => (
              <SuggestItem
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

export default SuggestMenu;
