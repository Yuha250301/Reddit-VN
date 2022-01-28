/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import postAtom from "ui/state/post-atom";
import NavbarRvn from "../common/nav";
import ScrollButton from "../common/scroll-button";
import Post from "./post";
import CustomizedDialogs from "./common/basic-modal";
import useTranslateModal from "ui/controller/use-translate-modal";
import TranslateHeader from "./translate-header";
import { PostData } from "data/post-manager";
import PostController from "controller/core/post";
import RedditDB from "database/raw-db";

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
  const [isReady, setReady] = useState<boolean>(false); //only show comment when it's ready
  const checkPostExist = async () => {
    if (post) {
      let needFetch = !post.rootComments;
      let isSubmit = !!post.rootComments;
      if (!needFetch) {
        //already crawl
        const postComment = await RedditDB.checkPostExist(post.id); //check local comment
        if (!postComment) {
          needFetch = true;
          isSubmit = true;
        }
      }
      //if miss local comment or not crawl yet => crawl
      if (needFetch) return PostController.crawl(post.link, isSubmit);
      else setReady(true);
    }
    return null;
  };
  useEffect(() => {
    let subscribed = true;
    checkPostExist()
      .then((fullPost) => {
        setReady(true);
        if (subscribed && fullPost) setPost(fullPost);
      })
      .catch((error: any) =>
        console.log("CoreError: Err when recrawl post", error),
      );
    return () => {
      subscribed = false;
    };
  }, [post]);
  return (
    <div className={Root}>
      <NavbarRvn />
      <div className={ClassNames.Content}>
        <TranslateHeader
          handleOpenModal={handleOpenModal}
          post={post}
          setPost={setPost}
        />
        {post && <Post post={post} isReady={isReady} />}
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
