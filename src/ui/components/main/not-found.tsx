/* eslint-disable prettier/prettier */
import React from "react";

const Root = "rvn-not-found";
const ClassNames = {
  Root,
  Body: `${Root}__body`,
  Text: `${Root}__body__text`,
  Button: `${Root}__body__button`,
};

 // eslint-disable-next-line @typescript-eslint/no-empty-interface
 interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = function NotFound() {
  return (
    <div id={Root} className={ClassNames.Root}>
      <div/>
      <div className={ClassNames.Body}>
        <div className={ClassNames.Text}>Oops, page not found.</div>
        <a className={ClassNames.Button} href="/">
          Back to home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
