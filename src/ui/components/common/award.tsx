/* eslint-disable prettier/prettier */
import clsx from "clsx";
import React from "react";

const translatorOfMonth = require("assets/img/translator_of_the_month.svg").default;


interface AwardProps {
  avatar: any;
  content: string;
}

const Award: React.FC<AwardProps> = ({ avatar, content }) => {
  return <div>
      <header className={clsx("d-flex","align-items-center","justify-content-center","p-2")} 
      style={{borderBottom: "2px solid linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.91875) 51.56%, rgba(255, 255, 255, 0) 100%)",}}>
        <img src={translatorOfMonth}/>
      </header>
      <footer>
          <h5>
              {content}
          </h5>
      </footer>
  </div>;
};

export default Award;
