import { openDB, IDBPDatabase } from "idb";

const REDDIT_RAW_POST = "reddit-post";
const INDEX_KEY_WORD = "by_indexed_author";

function getAllWords(text: string): string[] {
  const allWordsIncludingDups = text.split("");
  const wordSet = allWordsIncludingDups.reduce(function (prev: any, current) {
    prev[current] = true;
    return prev;
  }, {});
  return Object.keys(wordSet);
}

class RedditDB {
  private db: IDBPDatabase | null;
  private version: number;
  constructor() {
    this.db = null;
    this.version = 0;
  }
  async init() {
    this.db = await openDB(REDDIT_RAW_POST);
    this.version = this.db.version;
  }
  async checkPostExist(postId: string) {
    if (!this.db) await this.init();
    return !!this.db?.objectStoreNames.contains(postId);
  }
  closeDatabase() {
    if (this.db) {
      this.db.close();
      this.db = null;
      this.version = 0;
    }
  }
  async addCommentById(postId: string, data: any) {
    if (!this.db) await this.init();
    await this.db?.put(postId, data);
  }
  async getCommentById(postId: string, commentId: string) {
    if (!this.db) await this.init();
    return await this.db?.get(postId, commentId);
  }
  async getCommentByAuthor(postId: string, keyword: string) {
    if (!this.db) await this.init();
    return await this.db?.getAllFromIndex(
      postId,
      INDEX_KEY_WORD,
      IDBKeyRange.only(getAllWords(keyword)),
    );
  }
  async deletePost(postId: string) {
    if (!this.db) await this.init();
    this.db?.close();
    this.db = await openDB(REDDIT_RAW_POST, this.version + 1, {
      upgrade(db) {
        db.deleteObjectStore(postId);
      },
    });
    this.version++;
  }
  async deleteListPosts(posts: string[]) {
    if (!this.db) await this.init();
    this.db?.close();
    this.db = await openDB(REDDIT_RAW_POST, this.version + 1, {
      upgrade(db) {
        posts.forEach((postId) => db.deleteObjectStore(postId));
      },
    });
    this.version++;
  }
}
const redditDB = new RedditDB();
export default redditDB;
