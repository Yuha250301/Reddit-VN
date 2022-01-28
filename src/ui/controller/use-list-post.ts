import PostController from "controller/core/post";
import PostManager, { TranslatingPost, PostData } from "data/post-manager";
import { useState, useEffect } from "react";
import PostActions from "ui/action/post-action";
import EventEmitter from "utils/event-emitter";

const useListPosts = (): TranslatingPost[] => {
  const [posts, setPosts] = useState<TranslatingPost[]>([]);
  const initData = async () => {
    const listPosts = await PostManager.getListPostWithCommonData();
    if (listPosts) setPosts(listPosts);
  };
  useEffect(() => {
    PostController.init();
    const listener = EventEmitter.addListener(
      PostActions.INIT_AFTER_AUTH,
      initData,
    );
    const listener2 = EventEmitter.addListener(
      PostActions.ADD_POST,
      (data: PostData) => {
        const newPost: TranslatingPost = {
          subreddit: data.subReddit,
          title: data.title,
          id: data.id,
        };
        setPosts([...posts, newPost]);
      },
    );
    const listener3 = EventEmitter.addListener(
      PostActions.DELETE_POST,
      (id: string) => {
        setPosts(posts.filter((item) => item.id !== id));
      },
    );
    return () => {
      listener.remove();
      listener2.remove();
      listener3.remove();
    };
  }, []);
  return posts;
};

export default useListPosts;
