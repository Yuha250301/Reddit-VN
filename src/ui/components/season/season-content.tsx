/* eslint-disable prettier/prettier */
import clsx from "clsx";
import React from "react";

interface SeasonContentProps {
  title: string;
}

const SeasonContent: React.FC<SeasonContentProps> = ({ title, children }) => {
  return (
    <div>
      <div className={"rvn-season__content"}>
        <h6>{title}</h6>
        {children}
      </div>
    </div>
  );
};

export default SeasonContent;
