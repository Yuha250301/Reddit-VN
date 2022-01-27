/* eslint-disable prettier/prettier */
import React from "react";
import { useRecoilState } from "recoil";

import postAtom from "ui/state/post-atom";
import NavbarRvn from "../common/nav";
import ScrollButton from "../common/scroll-button";
import Post from "./post";
import CustomizedDialogs from "./common/basic-modal";
import useTranslateModal from "ui/controller/use-translate-modal";
import TranslateHeader from "./translate-header";
import { PostData } from "data/post-manager";

const Root = "rvn-translate";
const ClassNames = {
  Root,
  Body: `${Root}__body`,
  Content: `${Root}__content`,
  FormControl: `${Root}__form-control`,
  Tool: `${Root}__tool`,
  DisableTool: `${Root}__disable-tool`,
};

const Translate: React.FC = () => {
  const [contentModal, handleOpenModal, handleCloseModal] = useTranslateModal();
  const [post, setPost] = useRecoilState<PostData | undefined>(postAtom);
  return (
    <div className={Root}>
      <NavbarRvn />
      <div className={ClassNames.Content}>
        <TranslateHeader
          handleOpenModal={handleOpenModal}
          post={post}
          setPost={setPost}
        />
        {(post && post.rootComments) && <Post post = {post} />}
      </div>
      <ScrollButton />
      <CustomizedDialogs
        title={contentModal.title}
        open={!!contentModal.content}
        handleClose={handleCloseModal}
        large={contentModal.large}
      >
        {contentModal.content}
      </CustomizedDialogs>
    </div>
  );
};

export default Translate;
