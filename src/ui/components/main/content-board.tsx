/* eslint-disable prettier/prettier */
import React from "react";
import { Route, Routes } from "react-router-dom";

import Translate from "../translate/translate";
import Season from "../season/season";
import Login from "../login/login";
import NotFound from "./not-found";
import Profile from "../profile/profile";
import Translating from "../translate/translating";
import Suggestions from "../translate/suggestions";
import Guide from "../translate/guide"
import { Section } from "./const";


 interface ContentProps {
    props?: any;
 }

const ContentBoard: React.FC<ContentProps> = ({props}) => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path={Section.TRANSLATE} element={<Translate/>} />
        <Route path={Section.TRANSLATING} element={<Translating/>} />
        <Route path={Section.SUGGESTION} element={<Suggestions/>} />
        <Route path={Section.GUIDE} element={<Guide/>} />
        
        <Route path={Section.SEASON} element={<Season/>} />
        {/* <Route path={Section.FORUM} element={<Defi />} />
        <Route path={Section.MISSION} element={<ComingSoon />} />*/}
        <Route path={Section.PROFILE} element={<Profile/>} /> 
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
};

export default ContentBoard;
