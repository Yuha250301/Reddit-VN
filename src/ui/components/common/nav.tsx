/* eslint-disable prettier/prettier */
import clsx from "clsx";
import React from "react";
import NavItem from "./nav-item";

const translationIcon = require("assets/img/translation_icon.svg").default;
const listDoneIcon = require("assets/img/list_done_icon.svg").default;
const questionIcon = require("assets/img/question_icon.svg").default;
const GuideIcon = require("assets/img/list_done_icon.svg").default;


const Root = "rvn-navbar";
 const ClassNames = {
   Root,
   Content: `${Root}__content`,
};

// interface HeaderProps {
// }

const NavbarRvn: React.FC = () => {
  return (
    <div className={Root}>
          <div className={clsx("d-flex","flex-column","justify-content-around",ClassNames.Content)}>
            <NavItem content="Translation now"><img src={translationIcon} /> </NavItem>
            <NavItem content="List Translation"><img src={listDoneIcon} /> </NavItem>
            <NavItem content="Question"><img src={questionIcon} /> </NavItem>
            <NavItem content="Guide"><img src={GuideIcon} /> </NavItem>
          </div>
    </div>
  );
};

export default NavbarRvn;
