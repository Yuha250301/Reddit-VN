import PostDb from "database/post-db";
import PostController, { PostServerData } from "controller/core/post";
import RedditDB from "database/raw-db";

export interface TranslatingPost {
  subreddit: string;
  title: string;
  id: string;
}

export interface PostData {
  id: string;
  subReddit: string;
  shortenLink: string;
  title: string;
  text: string;
  awards: string;
  num_comments: string;
  author: string;
  indexed_author: string[];
  upvotes: string;
  fallbackUrl: string;
  url: string;
  isVideo: boolean;
  isImage: boolean;
  link: string;
}

export class PostManager {
  private postDataMap: Map<string, PostData>;
  private postList: Set<string>;
  constructor() {
    this.postDataMap = new Map();
    this.postList = new Set();
  }
  async init(posts: PostServerData[]) {
    const shouldFetchList = posts.filter((item) => !item.isPosted);
    this.postList = new Set(shouldFetchList.map((item) => item.rawPostId));
    await Promise.all(
      shouldFetchList.map(async (item) => {
        const post = await PostDb.getPost(item.rawPostId);
        const postComments = await RedditDB.checkPostExist(item.rawPostId);
        if (post) this.postDataMap.set(item.rawPostId, post);
        if (!post || !postComments) PostController.crawl(item.url, true);
      }),
    );
  }
  async addPost(data: PostData) {
    this.postList.add(data.id);
    this.postDataMap.set(data.id, data);
    await PostDb.addPost(data);
  }
  async deletePost(postId: string) {
    this.postList.delete(postId);
    this.postDataMap.delete(postId);
    await PostDb.deletePost(postId);
    await RedditDB.deletePost(postId);
  }
  async addListPosts(data: PostData[]) {
    data.forEach((item) => {
      this.postList.add(item.id);
      this.postDataMap.set(item.id, item);
    });
    await PostDb.addListPosts(data);
  }
  async deleteListPost(posts: string[]) {
    posts.forEach((postId) => {
      this.postList.delete(postId);
      this.postDataMap.delete(postId);
    });

    await PostDb.deleteListPosts(posts);
    await RedditDB.deleteListPosts(posts);
  }
  getListPost() {
    return Array.from(this.postList);
  }
  async getListPostWithCommonData() {
    return (
      await Promise.all(
        Array.from(this.postList).map(async (item) => {
          const data = await this.getPostData(item);
          if (data) {
            const post: TranslatingPost = {
              subreddit: data.subReddit,
              title: data.title,
              id: data.id
            };
            return post;
          } else return null;
        }),
      )
    ).filter((item) => item) as TranslatingPost[];
  }
  async getPostData(id: string) {
    return this.postDataMap.get(id) || (await PostDb.getPost(id));
  }
}
const postManager = new PostManager();
export default postManager;
