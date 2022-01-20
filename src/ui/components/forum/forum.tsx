/* eslint-disable prettier/prettier */
import React from "react";
import Header from "../common/header";
import ToolCus from "../common/tool-custom";
import clsx from "clsx";
import SuggestMenu from "./suggest-menu";
import TableForum from "./common/table-forum"

const imgIcon = require("assets/img/img.svg").default;
const hashtagIcon = require("assets/img/hashtag.svg").default;
const example = require("assets/img/sample_avatar.svg").default;

const Root = "rvn-forum";
const ClassNames = {
  Root,
  Body: `${Root}__body`,
  Content: `${Root}__content`,
  FormControl: `${Root}__form-control`,
  Tool: `${Root}__tool`,
  Nav: `${Root}__nav-forum`,
};

const HotTopicList = [
  { avatar: example, name: "#Announcement" },
  { avatar: example, name: "#Entertainment" },
  { avatar: example, name: "#FAQ" },
  { avatar: example, name: "#Music" },
  { avatar: example, name: "#Gaming" },
  { avatar: example, name: "#Entertainment" },
  { avatar: example, name: "#Music" },
];
const DirectMessage = [
  { avatar: example, name: "Lê Nhật Duy" },
  { avatar: example, name: "Lâm Nguy" },
  { avatar: example, name: "Kira Yagami" },
  { avatar: example, name: "Tuấn Trịnh" },
  { avatar: example, name: "Lê Huỳnh Bảo" },
  { avatar: example, name: "Minh Châu" },
  { avatar: example, name: "Anh Huy" },
];
const ListForum = [
  {name: "Rules & Guides", description: "How-to guides, FAQ's and Rules.", info:"24 Threads | 356 Messages"},
  {name: "Introductions", description: "Welcome to RVN! Please take some time to introduce yourself to the community.", info:"24 Threads | 356 Messages"},
  {name: "Suggestions & Feedback", description: "Have some feedback that might make RVN a better place? Let us know here.", info:"24 Threads | 356 Messages"},
  {name: "Rules & Guides", description: "How-to guides, FAQ's and Rules.", info:"24 Threads | 356 Messages"},
  {name: "Introductions", description: "Welcome to RVN! Please take some time to introduce yourself to the community.", info:"24 Threads | 356 Messages"},
  {name: "Suggestions & Feedback", description: "Have some feedback that might make RVN a better place? Let us know here.", info:"24 Threads | 356 Messages"},
  {name: "Rules & Guides", description: "How-to guides, FAQ's and Rules.", info:"24 Threads | 356 Messages"},
  {name: "Introductions", description: "Welcome to RVN! Please take some time to introduce yourself to the community.", info:"24 Threads | 356 Messages"},
  {name: "Suggestions & Feedback", description: "Have some feedback that might make RVN a better place? Let us know here.", info:"24 Threads | 356 Messages"},
]

const ListForum1 = [
  {name: "Giới thiệu subreddit", description: "Description....", info:"24 Threads | 356 Messages"},
  {name: "Âm nhạc", description: "Description....", info:"24 Threads | 356 Messages"},
  {name: "Games", description: "Description....", info:"24 Threads | 356 Messages"},
  {name: "Ẩm thực", description: "Description....", info:"24 Threads | 356 Messages"},
  {name: "Meme", description: "Description....", info:"24 Threads | 356 Messages"},
  {name: "Truyện trò linh tinh", description: "Description....", info:"24 Threads | 356 Messages"},
]

const Forum: React.FC = () => {
  return (
    <div className={Root}>
      <Header />
      <div className={ClassNames.Content}>
        <div
          className={clsx("d-flex", "justify-content-between", "mb-4")}
          style={{ height: "6vh", width: "100%" }}
        >
          <input
            placeholder="Show your opinion and don’t forget choose a topic."
            className={clsx(ClassNames.FormControl)}
            style={{
              backgroundColor: "#101010",
              border: "16px solid #101010",
              color: "#fff",
            }}
          />
          <ToolCus
            content="POST"
            bgColor="#414141"
            height="6vh"
            width="144px"
          />
        </div>
        <div className={clsx("d-flex")} style={{ width: "810px", gap: "30px" }}>
          <ToolCus
            icon={imgIcon}
            content="Photos"
            bgColor="#101010"
            height="4.8vh"
          />
          <ToolCus
            icon={hashtagIcon}
            content="Topic"
            bgColor="#101010"
            height="4.8vh"
          />
        </div>
        <TableForum title="#Announcement" listForum={ListForum} length={3}/>
        <TableForum title="#Góc giải trí" listForum={ListForum1} length={ListForum1.length}/>
      </div>
      <div className={ClassNames.Nav}>
        <SuggestMenu title="Hot topic" list={HotTopicList} haveBest={true}/>
        <SuggestMenu title="Direct message" list={DirectMessage} haveBest={false}/>
      </div>
    </div>
  );
};

export default Forum;
