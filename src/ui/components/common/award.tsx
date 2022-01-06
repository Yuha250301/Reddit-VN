/* eslint-disable prettier/prettier */
import clsx from "clsx";
import React from "react";
import GiftTooltip from "./gift-tooltip";

const translatorOfMonth =
  require("assets/img/award_translator_icon.svg").default;
const goldMember = require("assets/img/award_gold_icon.svg").default;
const silverMember = require("assets/img/award_silver_icon.svg").default;

interface AwardProps {
  content: string;
}

const Award: React.FC<AwardProps> = ({ content }) => {
  const imgAward = (award: string) => {
    switch (award) {
      case "TRANSLATOR OF THE MONTH":
        return <img src={translatorOfMonth} width="129px" height="129px" />;
      case "GOLD MEMBER":
        return <img src={goldMember} width="129px" height="129px" />;
      case "SILVER MEMBER":
        return <img src={silverMember} width="115px" height="115px" />;
      default:
        return null;
    }
  };

  return (
    <GiftTooltip imgAward={imgAward(content)} content={content}>
      <div
        style={{
          height: "267px",
          width: "180px",
          backgroundColor: "#101010",
          borderRadius: "10px",
          padding: "30px 20px",
          paddingTop: "15px",
          // marginRight: "36px",
        }}
      >
        <header
          className={clsx(
            "d-flex",
            "align-items-center",
            "justify-content-center",
            "p-0",
            "border-gradient",
          )}
          style={{
            height: "80%",
            marginBottom: "10px",
            borderBottom:
              "2px solid linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.91875) 51.56%, rgba(255, 255, 255, 0) 100%)",
          }}
        >
          {imgAward(content)}
        </header>
        <footer>
          <h5 style={{ textAlign: "center", fontWeight: "700" }}>{content}</h5>
        </footer>
      </div>
    </GiftTooltip>
  );
};

export default Award;
