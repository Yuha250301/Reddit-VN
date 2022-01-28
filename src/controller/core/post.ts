import Fetcher from "../network/api";
import PostActions from "ui/action/post-action";
import EventEmitter from "utils/event-emitter";
import PostManager, { PostData } from "data/post-manager";
import { crawler } from "utils/crawler";
import RedditDB from "database/raw-db";
import PostDb from "database/post-db";

export interface PostServerData {
  rawPostId: string;
  subreddit: string;
  title: string;
  url: string;
  mediaLink?: string;
  isPosted?: boolean;
}

class PostController {
  constructor() {}
  async init() {
    const listPost: PostServerData[] = await Fetcher.getPosts();
    await PostManager.init(listPost);
    EventEmitter.emit(PostActions.INIT_AFTER_AUTH); //emit to trigger update, don't send heavy data via event emitter
  }
  async crawl(url: string, isSubmit: boolean = false, isFull: boolean = true) {
    if (!url) throw new Error("ControllerError: url not valid");
    else {
      RedditDB.closeDatabase(); //close all db relate to browser bug: https://bugs.webkit.org/show_bug.cgi?id=171049
      const data: PostData = await crawler(url, isFull);
      const post = await PostDb.getPost(data.id);
      if (!post) await PostManager.addPost(data);
      if (!isSubmit) {
        const param: PostServerData = {
          rawPostId: data.id,
          subreddit: data.subReddit,
          title: data.title,
          url,
        };
        await Fetcher.createPost(param);
      }
      EventEmitter.emit(PostActions.ADD_POST, data);
      return data;
    }
  }

  async delete(id: string) {
    await Fetcher.deletePost(id);
    EventEmitter.emit(PostActions.DELETE_POST, id);
    await PostManager.deletePost(id);
  }
}
const postController = new PostController();
export default postController;
