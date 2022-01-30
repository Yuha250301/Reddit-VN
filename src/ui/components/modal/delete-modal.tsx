import React from "react";
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
  const deletePost = async () => {
    if (post) {
      await PostController.delete(post.id);
      setPost(undefined);
      handleCloseModal();
      await TransController.delete(post.id);
    }
  };
  return (
    <>
      <div className={clsx("d-flex", "justify-content-center", "m-4")}>
        <div className="me-5">
          <ToolCus
            content="YES"
            bgColor="#FFFFFF"
            height="4.8vh"
            width="144px"
            onClick={deletePost}
          />
        </div>
        <ToolCus
          content="NO"
          bgColor="#E85B25"
          height="4.8vh"
          width="144px"
          onClick={handleCloseModal}
        />
      </div>
    </>
  );
};

export default DeleteModal;
