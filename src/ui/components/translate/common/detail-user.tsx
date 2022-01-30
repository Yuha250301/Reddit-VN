/* eslint-disable prettier/prettier */
import React from "react";
import useWindowDimensions from "../../common/useWindowDimension";

const upIcon = require("assets/img/uparrow_icon.svg").default;

interface DetailUserProps {
  user: string;
  reward: string;
}

const DetailUser: React.FC<DetailUserProps> = ({ user, reward }) => {
  const {width} = useWindowDimensions();
  return (
    <div className={width > 890 ? "d-flex" : ""}>
      <h6 style={{ fontWeight: "700" }}>u/{user}</h6>
      <div className={width > 890 ? "ms-2 d-flex align-items-center" : "mb-1 d-flex align-items-center"}>
        <img src={upIcon} width="14" height="14" />
        <span style={{ fontSize: "12px" }}>{reward}</span>
      </div>
    </div>
  );
};

export default DetailUser;
