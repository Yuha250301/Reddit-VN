import { openDB, DBSchema, IDBPDatabase } from "idb";
import { PostData } from "data/post-manager";
import { CommentTranslate } from "data/trans-manager";
interface RVNPostDatabase extends DBSchema {
  trans: {
    key: string;
    value: CommentTranslate;
  };
  posts: {
    key: string;
    value: PostData;
  };
}

const RVN_POST = "rvn-post";
const POST = "posts";
const TRANS = "trans";

class PostDB {
  private db: IDBPDatabase<RVNPostDatabase> | null;
  constructor() {
    this.db = null;
  }
  async init() {
    const database = await openDB<RVNPostDatabase>(RVN_POST);
    const version = database.version;
    const storeNames = database.objectStoreNames;
    if (!storeNames.contains(POST)) {
      await database.close();
      this.db = await openDB<RVNPostDatabase>(RVN_POST, version + 1, {
        upgrade(db) {
          db.createObjectStore(TRANS, {
            keyPath: "commentId",
          });
          db.createObjectStore(POST, {
            keyPath: "id",
          });
        },
      });
    } else this.db = database;
  }
  async getPost(id: string) {
    if (!this.db) await this.init();
    return await this.db?.get(POST, id);
  }
  async addPost(data: PostData) {
    if (!this.db) await this.init();
    const post = await this.getPost(data.id);
    if (!post) await this.db?.add(POST, data);
  }
  async addListPosts(posts: PostData[]) {
    if (!this.db) await this.init();
    const tx = this.db?.transaction(POST, "readwrite");
    if (tx)
      await Promise.all([
        ...posts.map(async (post) => {
          const isExist = await tx.store.get(post.id);
          if (!isExist) tx.store.add(post);
        }),
        tx.done,
      ]);
  }
  async putPost(data: PostData) {
    if (!this.db) await this.init();
    await this.db?.put(POST, data, data.id);
  }
  async deletePost(id: string) {
    if (!this.db) await this.init();
    const post = await this.getPost(id);
    if (post) await this.db?.delete(POST, id);
  }
  async deleteListPosts(posts: string[]) {
    if (!this.db) await this.init();
    const tx = this.db?.transaction(POST, "readwrite");
    if (tx)
      await Promise.all([
        ...posts.map(async (post) => {
          const isExist = await tx.store.get(post);
          if (isExist) tx.store.delete(post);
        }),
        tx.done,
      ]);
  }
  async getAllTrans() {
    if (!this.db) await this.init();
    return await this.db?.getAll(TRANS);
  }
  async getTrans(id: string) {
    if (!this.db) await this.init();
    return await this.db?.get(TRANS, id);
  }
  async addTrans(comment: CommentTranslate) {
    if (!this.db) await this.init();
    delete comment.isSubmit;
    await this.db?.add(TRANS, comment);
  }
  async updateTrans(comment: CommentTranslate) {
    if (!this.db) await this.init();
    delete comment.isSubmit;
    await this.db?.put(TRANS, comment);
  }
  async deleteTrans(id: string) {
    if (!this.db) await this.init();
    const post = await this.getTrans(id);
    if (post) await this.db?.delete(TRANS, id);
  }
  async deleteListTrans(comments: string[]) {
    if (!this.db) await this.init();
    const tx = this.db?.transaction(TRANS, "readwrite");
    if (tx)
      await Promise.all([
        ...comments.map(async (comment) => {
          const isExist = await tx.store.get(comment);
          if (isExist) tx.store.delete(comment);
        }),
        tx.done,
      ]);
  }
}
const postDb = new PostDB();
export default postDb;
