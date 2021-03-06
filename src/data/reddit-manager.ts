import QuickLRU from "quick-lru";
import RedditDB from "database/raw-db";
import { CommentTranslate } from "./trans-manager";

export class RedditManager {
  private cacheMap: QuickLRU<string, any>; //because data from reddit server (often change datatype so we use any hear)
  constructor() {
    this.cacheMap = new QuickLRU({ maxSize: 1000 });
  }
  async _addToCache(commentId: string, data: any) {
    this.cacheMap.set(commentId, data);
  }
  async addMissComment(postId: string, data: any) {
    this._addToCache(data.id, data);
    await RedditDB.addCommentById(postId, data);
  }
  async getCommentById(postId: string, commentId: string) {
    if (this.cacheMap.has(commentId)) return this.cacheMap.get(commentId);
    else {
      console.log("sec");
      const data = await RedditDB.getCommentById(postId, commentId);
      if (data) this._addToCache(commentId, data);
    }
  }
  async convertListComment(postId: string, comments: CommentTranslate[]) {
    const raw = await RedditDB.getListComment(
      postId,
      comments.map((item) => item.commentId),
    );
    return raw.map((item: any, index: number) => ({
      prefix: item.prefix,
      author: "u/" + item.author,
      description: ` (${item.upvotes}${item.awards && " - "}${item.awards})`,
      ...comments[index],
    }));
  }
  async getCommentByAuthor(postId: string, keyword: string) {
    const listComment = await RedditDB.getCommentByAuthor(postId, keyword);
    if (listComment) {
      listComment.forEach((item: any) => {
        if (!this.cacheMap.has(item.id) && item)
          this.cacheMap.set(item.id, item);
      });
    }
    return listComment || [];
  }
}
const redditManager = new RedditManager();
export default redditManager;
