/* eslint-disable prettier/prettier */

import React from "react";
import Footer from "../common/footer";
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
      <Footer/>
    </main>
  );
};

export default Main;
