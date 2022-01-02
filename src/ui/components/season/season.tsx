/* eslint-disable prettier/prettier */
import clsx from "clsx";
import React from "react";
import Header from "../common/header";
import CustomizedProgressBars from "./progress-bar";
// import { FormControl } from "react-bootstrap";

const ranking = require("assets/img/top1_season_icon.svg").default;

const Root = "rvn-season";
const ClassNames = {
  Root,
  Body: `${Root}__body`,
  Content: `${Root}__content`,
  Ranking: `${Root}__ranking`,
  FormControl: `${Root}__form-control`,
  Tool: `${Root}__tool`,
  DisableTool: `${Root}__disable-tool`,
};

const Season: React.FC = () => {
  return (
    <div className={Root}>
      <Header />
      <div className={ClassNames.Body}>
        <div
          className={clsx(ClassNames.Ranking, "d-flex", "align-items-center")}
        >
          <div className={clsx(ClassNames.Content,"me-5")}>
            <h6>YOUR RANKING</h6>
            <CustomizedProgressBars value={35} />
          </div>
          <img src={ranking} alt="Your ranking" />
        </div>
      </div>
    </div>
  );
};

export default Season;
