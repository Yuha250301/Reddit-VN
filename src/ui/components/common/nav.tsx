/* eslint-disable prettier/prettier */
import clsx from "clsx";
import React from "react";
import NavItem from "./nav-item";
import { useNavigate, useLocation } from "react-router-dom";
import { Section, NAV } from "../main/const";

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

  const location = useLocation();
  const navigate = useNavigate();

  const selectSection = (key: Section) => {
    if (NAV.includes(key)) {
      navigate(`/${key}`);
    }
  };

  return (
    <div className={Root}>
          <div className={clsx("d-flex","flex-column","justify-content-around",ClassNames.Content)}>
            <NavItem content="Translation now"><img src={translationIcon} onClick={()=>selectSection(Section.TRANSLATE)}/> </NavItem>
            <NavItem content="Your Translations"><img src={listDoneIcon} onClick={()=>selectSection(Section.TRANSLATING)}/> </NavItem>
            <NavItem content="Guide"><img src={questionIcon} onClick={()=>selectSection(Section.GUIDE)}/> </NavItem>
            <NavItem content="Suggestions"><img src={GuideIcon} onClick={()=>selectSection(Section.SUGGESTION)}/> </NavItem>
          </div>
    </div>
  );
};

export default NavbarRvn;
