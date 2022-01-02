/* eslint-disable prettier/prettier */

import React from "react";
import ContentBoard from "./content-board";
// interface MainProps {}

const Root = "rvn-main";
const ClassNames = {
  Root,
  NavOpen: `${Root}__nav-open`,
  NavClose: `${Root}__nav-close`,
};

const Main: React.FC = function Main() {
  return (
    <main id={Root} className={ClassNames.Root}>
      <ContentBoard/>
    </main>
  );
};

export default Main;
