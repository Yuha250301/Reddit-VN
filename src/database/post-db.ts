import { openDB, DBSchema, IDBPDatabase } from "idb";
import { PostData } from "data/post-manager";
interface RVNPostDatabase extends DBSchema {
  trans: {
    key: string;
    value: string;
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
    this.db = await openDB<RVNPostDatabase>(RVN_POST, 1, {
      upgrade(db) {
        db.createObjectStore("trans", {
          keyPath: "id",
        });
        db.createObjectStore(POST, {
          keyPath: "id",
        });
      },
    });
  }
  async getPost(id: string) {
    if (!this.db) return null;
    else return await this.db.get(POST, id);
  }
  async addPost(data: PostData) {
    if (!this.db) return;
    await this.db.add(POST, data);
  }
  async addListPosts(posts: PostData[]) {
    if (!this.db) return;
    const tx = this.db.transaction(POST, "readwrite");
    await Promise.all([...posts.map((post) => tx.store.add(post)), tx.done]);
  }
  async putPost(data: PostData) {
    if (!this.db) return;
    await this.db.put(POST, data, data.id);
  }
  async deletePost(id: string) {
    if (!this.db) return;
    await this.db.delete(POST, id);
  }
  async deleteListPosts(posts: string[]) {
    if (!this.db) return;
    const tx = this.db.transaction(POST, "readwrite");
    await Promise.all([
      ...posts.map((post) => tx.store.delete(post)),
      tx.done,
    ]);
  }
  async getTrans(id: string) {
    if (!this.db) return null;
    else return await this.db.get(TRANS, id);
  }
  async updateTrans(commentId: string, content: string) {
    if (!this.db) return;
    await this.db.put(TRANS, commentId, content);
  }
  async deleteTrans(id: string) {
    if (!this.db) return;
    await this.db.delete(TRANS, id);
  }
}
const postDb = new PostDB();
postDb.init();
export default postDb;
