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
  checkPostExist(postId: string) {
    return !!this.db?.objectStoreNames.contains(postId);
  }
  async getCommentById(postId: string, commentId: string) {
    return await this.db?.get(postId, commentId);
  }
  async getCommentByAuthor(postId: string, keyword: string) {
    return await this.db?.getAllFromIndex(
      postId,
      INDEX_KEY_WORD,
      IDBKeyRange.only(getAllWords(keyword)),
    );
  }
  async deletePost(postId: string) {
    if (this.db) {
      this.db.close();
      this.db = await openDB(REDDIT_RAW_POST, this.version + 1, {
        upgrade(db) {
          db.deleteObjectStore(postId);
        },
      });
      this.version++;
    }
  }
  async deleteListPosts(posts: string[]) {
    if (this.db) {
      this.db.close();
      this.db = await openDB(REDDIT_RAW_POST, this.version + 1, {
        upgrade(db) {
          posts.forEach((postId) => db.deleteObjectStore(postId));
        },
      });
      this.version++;
    }
  }
}
const redditDB = new RedditDB();
redditDB.init();
export default redditDB;
