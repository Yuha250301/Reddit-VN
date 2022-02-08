import React, { useState } from "react";
import clsx from "clsx";
import { useRecoilState } from "recoil";

import postAtom from "ui/state/post-atom";

import ToolCus from "../common/tool-custom";
import { PostData } from "data/post-manager";
import PostController from "controller/core/post";
import { ContentModalProps } from "./const";
import TransController from "controller/core/trans";

const DeleteModal: React.FC<ContentModalProps> = ({ handleCloseModal }) => {
  const [post, setPost] = useRecoilState<PostData | undefined>(postAtom);
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = async () => {
    try {
      if (post && !isDeleting) {
        setIsDeleting(true);
        setPost(undefined);
        handleCloseModal();
        await PostController.delete(post.id);
        await TransController.deleteAll(post.id);
      }
    } catch (err) {
      setIsDeleting(false);
      console.log("CoreErr: err when delete post", err);
    }
  };
  return (
    <>
      <div className={clsx("d-flex", "justify-content-center", "m-4")}>
        <div className="me-5">
          <ToolCus
            content="YES"
            bgColor="#E85B25"
            height="4.8vh"
            width="144px"
            onClick={deletePost}
          />
        </div>
        <ToolCus
          content="NO"
          bgColor="#FFFFFF"
          height="4.8vh"
          width="144px"
          onClick={handleCloseModal}
        />
      </div>
    </>
  );
};

export default DeleteModal;
