/* eslint-disable prettier/prettier */
import clsx from "clsx";
import React from "react";
import Header from "../common/header";
import CustomizedProgressBars from "./progress-bar";
import Award from "../common/award";
import League from "./league";
import Footer from "../common/footer";

const ranking = require("assets/img/top1_season_icon.svg").default;
const example = require("assets/img/sample_avatar.svg").default;


const Root = "rvn-season";
const ClassNames = {
  Root,
  Body: `${Root}__body`,
  Content: `${Root}__content`,
  Ranking: `${Root}__ranking`,
  Awards: `${Root}__awards`,
  League: `${Root}__league`,
};

const ListAward = ["TRANSLATOR OF THE MONTH","GOLD MEMBER","SILVER MEMBER","TRANSLATOR OF THE MONTH","GOLD MEMBER","SILVER MEMBER"]

const Season: React.FC = () => {
  return (
    <div className={Root}>
      <Header />
      <div className={ClassNames.Body}>
        <div
          className={clsx(ClassNames.Ranking, "d-flex", "align-items-center")}
        >
          <div className={clsx(ClassNames.Content, "me-5")}>
            <h6>YOUR RANKING</h6>
            <CustomizedProgressBars value={35} />
          </div>
          <img src={ranking} alt="Your ranking" width="123" height="160"/>
        </div>
        <div
          className={clsx(ClassNames.Content, ClassNames.Awards, "d-flex", "flex-wrap")}
        >
          <h6>THIS SEASON AWARDS</h6>
          {ListAward.map((award,index) => (<Award key={index} content={award}/>))}
        </div>
        <div
          className={clsx(ClassNames.Content, ClassNames.League, "d-flex", "justify-content-between")}
        >
          <h6>RANKING LEAGUE</h6>
          <League title="Gold Member" list={[{avatar: example, name: "Tuan Anh Nguyen Tran"}, {avatar: example, name: "Kira Yagami"}, {avatar: example, name: "Lê Huỳnh Bảo"}, {avatar: example, name: "Lê Huỳnh Bảo"}, {avatar: example, name: "Lê Huỳnh Bảo"}, {avatar: example, name: "Lê Huỳnh Bảo"} ]}/>
          <League title="Season Ranking" list={[{avatar: example, name: "Tuan Anh Nguyen"}, {avatar: example, name: "Kira Yagami"}, {avatar: example, name: "Lê Huỳnh Bảo"}, {avatar: example, name: "Lê Huỳnh Bảo"}, {avatar: example, name: "Lê Huỳnh Bảo"}, {avatar: example, name: "Lê Huỳnh Bảo"} ]}/>
          <League title="Growth Member" list={[{avatar: example, name: "Tuan Anh Nguyen"}, {avatar: example, name: "Kira Yagami"}, {avatar: example, name: "Lê Huỳnh Bảo"}, {avatar: example, name: "Lê Huỳnh Bảo"}, {avatar: example, name: "Lê Huỳnh Bảo"}, {avatar: example, name: "Lê Huỳnh Bảo"} ]}/>
          <League title="Silver Member" list={[{avatar: example, name: "Tuan Anh Nguyen"}, {avatar: example, name: "Kira Yagami"}, {avatar: example, name: "Lê Huỳnh Bảo"}, {avatar: example, name: "Lê Huỳnh Bảo"}, {avatar: example, name: "Lê Huỳnh Bảo"}, {avatar: example, name: "Lê Huỳnh Bảo"} ]}/>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Season;
