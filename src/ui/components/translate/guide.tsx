/* eslint-disable prettier/prettier */
import React from "react";
import clsx from "clsx";
import NavbarRvn from "../common/nav";

const Root = "rvn-translate__guide";
const ClassNames = {
  Root,
  Title: `${Root}__title`,
  Content: `${Root}__content`,
};

// interface GuideProps {
//   user: string;
//   reward: string;
//   content: string;
//   comment: any[];
// }

const Guide: React.FC = ({}) => {
  return (
    <>
      <NavbarRvn />
      <div className={ClassNames.Root}>
        <div>
          <h5>How to manage tabs?</h5>
          <div className={clsx(ClassNames.Content)}>
            <iframe
              width="1153px"
              height="541px"
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
            ></iframe>
          </div>
        </div>

        <div>
          <h5 style={{color: 'white'}}>How to manage comments?</h5>
        </div>

        <div>
          <h5 >Having problems with the translate tool?</h5>
          <div className={clsx(ClassNames.Content)}>
            <p>Contact with <a href="https://www.facebook.com/lcf.star" style={{color: 'white'}}>La Mia</a> for more.</p>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Guide;
