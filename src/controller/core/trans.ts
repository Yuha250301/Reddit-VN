import Fetcher from "../network/api";
import TransManager, { CommentTranslate } from "data/trans-manager";
import PostController, { PostServerData } from "./post";
import PostDb from "database/post-db";

const UPDATE_TIME = "rvn_post_";

class TransController {
  private isLocalMap: Map<string, boolean>;
  constructor() {
    this.isLocalMap = new Map();
  }
  async initTime(posts: PostServerData[]) {
    posts.forEach((item) => {
      this.isLocalMap.set(
        item.rawPostId,
        parseInt(item.lastUpdated || "0") <
          parseInt(
            localStorage.getItem(`${UPDATE_TIME}${item.rawPostId}`) || "0",
          ),
      );
    });
    await this.initData();
  }
  async initData() {
    const list: CommentTranslate[] = await Fetcher.getTrans();
    const localComments: CommentTranslate[] =
      (await PostDb.getAllTrans()) || [];
    localComments.forEach((item) => {
      TransManager.addComment(item);
    });
    list.forEach((item) => {
      if (!this.isLocalMap.get(item.postId)) {
        item.isModified = false;
        item.isSubmit = true;
        if (TransManager.checkExist(item.postId, item.commentId))
          TransManager.updateTrans(item);
        else TransManager.addTrans(item);
      } else TransManager.updateSubmitStatus(item);
    });
  }
  async update(comment: CommentTranslate) {
    comment.isModified = true;
    if (TransManager.checkExist(comment.postId, comment.commentId))
      await TransManager.updateTrans(comment);
    else {
      comment.isSubmit = false;
      await TransManager.addTrans(comment);
    }
    localStorage.setItem(
      `${UPDATE_TIME}${comment.postId}`,
      Date.now().toString(),
    );
  }
  async save(postId: string) {
    try {
      const list = TransManager.getTransByPost(postId);
      const promises = list
        .map((item: CommentTranslate) => {
          if (!item.isModified) return;
          if (!item.isSubmit) {
            const submitItem = { ...item };
            delete submitItem.isSubmit;
            return Fetcher.createTrans(submitItem)
              .then(() => {
                item.isSubmit = true;
                item.isModified = false;
              })
              .catch((err) => {
                throw err;
              });
          } else {
            return Fetcher.updateTrans(item.commentId, item.content)
              .then(() => {
                item.isModified = false;
              })
              .catch((err) => {
                throw err;
              });
          }
        })
        .filter((item) => item);
      await Promise.all(promises);
      if (promises.length)
        await PostController.updateLastTime(postId, Date.now());
    } catch (err) {
      console.log("NetworkErr: err when save ", err);
    }
  }

  async delete(postId: string) {
    await Fetcher.deleteCommentInPost(postId);
    await TransManager.deleteListTrans(postId);
  }
}
const transController = new TransController();
export default transController;
