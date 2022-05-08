import Fetcher from "../network/api";
import PostActions from "ui/action/post-action";
import EventEmitter from "utils/event-emitter";
import PostManager, { PostData } from "data/post-manager";
import { crawler } from "utils/crawler";
import RedditDB from "database/raw-db";
import PostDb from "database/post-db";
import TransController from "./trans";
import ConfigManager from "data/config";
import { parseUrlLink } from "utils/url-helper";
import AuthManager from "data/auth-manager";

export interface PostServerData {
  rawPostId: string;
  subreddit: string;
  title: string;
  url: string;
  mediaLink?: string;
  isPosted?: boolean;
  lastUpdated: string;
}

export interface PostSubmitServerData {
  mediaLink?: string;
  isPosted?: boolean;
  lastUpdated?: string;
}

class PostController {
  constructor() {}
  async init() {
    const listPost: PostServerData[] = await Fetcher.getPosts();
    await [TransController.initTime(listPost), PostManager.init(listPost)];
    EventEmitter.emit(PostActions.INIT_AFTER_AUTH); //emit to trigger update, don't send heavy data via event emitter
  }
  async crawl(url: string, lastUpdated?: number, isSubmit: boolean = false) {
    if (!url) throw new Error("Url not valid");
    else {
      const id = parseUrlLink(url);
      if (PostManager.getListPost().includes(id) && !isSubmit) {
        throw new Error("Bạn đã dịch bài này rồi");
      } else {
        RedditDB.closeDatabase(); //close all db relate to browser bug: https://bugs.webkit.org/show_bug.cgi?id=171049
        const data: PostData = await crawler(url, ConfigManager.getIsFull());
        const post = await PostDb.getPost(data.id);
        if (!isSubmit) {
          const param: PostServerData = {
            rawPostId: data.id,
            subreddit: data.subReddit,
            title: data.title,
            url,
            lastUpdated: Date.now().toString(),
          };
          await Fetcher.createPost(param);
        }
        if (!post) {
          if(lastUpdated) data.lastModified = lastUpdated;
          await PostManager.addPost(data);
        } else if(lastUpdated) post.lastModified = lastUpdated;
        EventEmitter.emit(PostActions.ADD_POST, data);
        return data;
      }
    }
  }

  async updateLastTime(id: string, timestamp: number) {
    await Fetcher.updatePost(id, { lastUpdated: timestamp.toString() });
    const post = await PostManager.getPost(id);
    if(post) {
      const newPost = { ...post, lastModified: timestamp };
      await PostManager.updatePost(newPost);
    }
    EventEmitter.emit(PostActions.UPDATE_POST, post);
  }

  async delete(id: string) {
    await Fetcher.deletePost(id);
    EventEmitter.emit(PostActions.DELETE_POST, id);
    await PostManager.deletePost(id);
  }
}
const postController = new PostController();
if (AuthManager.isLogged()) postController.init();
export default postController;
