/* eslint-disable prettier/prettier */
import React from "react";
import Header from "../common/header";
import NavbarRvn from "../common/nav";

const Root = "rvn-translate__suggestions";

const listSuggestion = [
  {
    tagName: "r/todayilearned",
    title:
      "TIL năm 1980, một con chó hoang dingo đã ăn thịt một đứa bé của cặp vợ chồng người Úc khi họ đi cắm...",
  },
  {
    tagName: "r/UnsentLetters",
    title: "Gửi chú, tài xế xe tải đã đâm phải mẹ cháu.",
  },
];

const Suggestions: React.FC = () => {
  return (
    <>
      <Header />
      <NavbarRvn />
      <div className={Root}>
        {listSuggestion.map((title: any, index: number) => (
          <div key={index} style={{ cursor: "pointer", width: "100%" }}>
            <span style={{ display: 'inline-block', width: "300px" }}>{title.tagName}</span>
            <span style={{ width: "100%" }}>{title.title}</span>
            <hr style={{ margin: "25px 0px", opacity: "0.8" }} />
          </div>
        ))}
      </div>
      ;
    </>
  );
};

export default Suggestions;
