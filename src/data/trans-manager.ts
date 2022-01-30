import PostDb from "database/post-db";

export interface CommentTranslate {
  commentId: string;
  postId: string;
  content: string;
  rootCommentId: string;
  isSubmit?: boolean;
  isModified?: boolean;
}

export class TransManager {
  private commentMap: Map<string, CommentTranslate[]>;
  constructor() {
    this.commentMap = new Map();
  }
  async addComment(comment: CommentTranslate) {
    const list = this.commentMap.get(comment.postId);
    if (list) list.push(comment);
    else this.commentMap.set(comment.postId, [comment]);
  }
  checkExist(postId: string, commentId: string) {
    const list = this.commentMap.get(postId);
    if (list)
      return !!list.find(
        (item: CommentTranslate) => item.commentId === commentId,
      );
    else return false;
  }
  updateSubmitStatus(trans: CommentTranslate) {
    const list = this.commentMap.get(trans.postId);
    if (list) {
      this.commentMap.set(
        trans.postId,
        list.map((item) => {
          if (item.commentId === trans.commentId) {
            item.isSubmit = true;
          }
          return item;
        }),
      );
    }
  }
  async addTrans(trans: CommentTranslate) {
    this.addComment(trans);
    await PostDb.updateTrans({...trans});
  }
  async getTrans(postId: string, commentId: string) {
    const list = this.commentMap.get(postId);
    if (!list) return "";
    const trans = list.find(
      (item: CommentTranslate) => item.commentId === commentId,
    );
    if (!trans) {
      const comment = await PostDb.getTrans(commentId);
      if (comment) {
        list.push(comment);
        return comment.content;
      } else return "";
    } else return trans.content;
  }
  getTransByPost(postId: string) {
    return this.commentMap.get(postId) || [];
  }
  setTransByPost(postId: string, trans: CommentTranslate[]) {
    return this.commentMap.set(postId, trans);
  }
  async updateTrans(trans: CommentTranslate) {
    const list = this.commentMap.get(trans.postId);
    if (list) {
      this.commentMap.set(
        trans.postId,
        list.map((item) => {
          if (item.commentId === trans.commentId) {
            trans.isSubmit = item.isSubmit;
            return trans;
          }
          return item;
        }),
      );
      await PostDb.updateTrans({...trans});
    }
  }
  async deleteListTrans(postId: string) {
    const list = this.commentMap.get(postId);
    if (list) {
      this.commentMap.set(postId, []);
      await PostDb.deleteListTrans(list.map((item) => item.commentId));
    }
  }
}
const transManager = new TransManager();
export default transManager;
