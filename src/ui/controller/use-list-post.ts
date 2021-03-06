import PostController from "controller/core/post";
import PostManager, { TranslatingPost, PostData } from "data/post-manager";
import { useState, useEffect } from "react";
import PostActions from "ui/action/post-action";
import EventEmitter from "utils/event-emitter";

const useListPosts = (): [TranslatingPost[], boolean] => {
  const [posts, setPosts] = useState<TranslatingPost[]>([]);
  const [isFetch, setIsFetch] = useState(false);
  const initData = async () => {
    const listPosts = await PostManager.getListPostWithCommonData();
    if (listPosts) setPosts(listPosts);
    setIsFetch(true);
  };
  useEffect(() => {
    if (!PostManager.getListPost().length) PostController.init();
    else initData();
    const listener = EventEmitter.addListener(
      PostActions.INIT_AFTER_AUTH,
      initData,
    );
    const listener2 = EventEmitter.addListener(
      PostActions.ADD_POST,
      (data: PostData) => {
        const newPost: TranslatingPost = {
          subReddit: data.subReddit,
          title: data.title,
          id: data.id,
          author: data.author,
          lastModified: data.lastModified
        };
        setPosts([...posts, newPost]);
      },
    );
    const listener3 = EventEmitter.addListener(
      PostActions.UPDATE_POST,
      (data: PostData) => {
        setPosts(posts.map((post) => {
          if(post.id === data.id) post.lastModified = data.lastModified;
          return {...post};
        }))
      },
    );
    const listener4 = EventEmitter.addListener(
      PostActions.DELETE_POST,
      (id: string) => {
        setPosts(posts.filter((item) => item.id !== id));
      },
    );
    return () => {
      listener.remove();
      listener2.remove();
      listener3.remove();
      listener4.remove();
    };
  }, []);
  return [posts, isFetch];
};

export default useListPosts;
