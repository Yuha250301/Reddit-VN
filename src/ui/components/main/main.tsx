/* eslint-disable prettier/prettier */

import React from "react";

import Header from "../common/header";
import Footer from "../common/footer";
import ContentBoard from "./content-board";
import useAuthApp from "ui/controller/use-auth-app";
import Modal from "../modal/index";


// interface MainProps {}

const Root = "rvn-main";
const ClassNames = {
  Root,
  NavOpen: `${Root}__nav-open`,
  NavClose: `${Root}__nav-close`,
};

const Main: React.FC = function Main() {
  const isAuth = useAuthApp();
  return (
    <main id={Root} className={ClassNames.Root}>
      {isAuth && <Header/>}
      <Modal/>
      <ContentBoard isAuth={isAuth} />
      <Footer />
    </main>
  );
};

export default Main;
