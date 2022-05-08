import PostDb from "database/post-db";
import PostController, { PostServerData } from "controller/core/post";
import RedditDB from "database/raw-db";

export type TranslatingPost = Pick<PostData, "author" | "subReddit" | "title" | "id" | "lastModified">;

export interface BasicComment {
  id: string;
  user: string;
  reward: string;
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
  rootComments: BasicComment[];
  lastModified?: number;
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
        if (post) this.postDataMap.set(item.rawPostId, {...post, lastModified: +item.lastUpdated});
        if (!post) PostController.crawl(item.url, +item.lastUpdated, true);
      }),
    );
  }
  async getPost(id: string) {
    const post = this.postDataMap.get(id);
    if (post) return post;
    else {
      const dbPost = await PostDb.getPost(id);
      if (dbPost) {
        this.postDataMap.set(dbPost.id, dbPost);
        return dbPost;
      } else return null;
    }
  }
  async addPost(data: PostData) {
    this.postList.add(data.id);
    this.postDataMap.set(data.id, data);
    await PostDb.addPost(data);
  }
  async updatePost(data: PostData) {
    this.postDataMap.set(data.id, data);
    //await PostDb.putPost(data);
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
        Array.from<string>(this.postList).map(async (item) => {
          const data = await this.getPostData(item);
          if (data) {
            const post: TranslatingPost = {
              subReddit: data.subReddit,
              title: data.title,
              id: data.id,
              author: data.author,
              lastModified: data.lastModified
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
