import { PostServerData, PostSubmitServerData } from "controller/core/post";
import AuthManager, { UserData } from "data/auth-manager";
import { CommentTranslate } from "data/trans-manager";
import AuthActions from "ui/action/auth-action";
import EventEmitter from "utils/event-emitter";
import ModalManager from "ui/components/modal/manager";
import { ModalType } from "ui/components/modal/const";

export class ClientAPI {
  private origin: string;
  constructor() {
    this.origin = "https://api.rvninc.net";
    //this.origin = "http://localhost:3000";
  }
  async _handleUnauthorized() {
    //get new token from refresh token
    try {
      const account: UserData = await this._refreshToken();
      if(account?.username === AuthManager.getUsername()) {
        ModalManager.addModal(ModalType.ERROR_MODAL, "Có lỗi xảy ra, bạn vui lòng thử lại nhé"); //force user manual retry
      } else throw new Error("DataAcceptedButNotMatch");
    }
    catch(err) {
      //if still error => throw err => logout;
      AuthManager.removeUser();
      EventEmitter.emit(AuthActions.SET_AUTH, false);
      setTimeout(() => {
        window.location.href = "/";
      }, 200);
      throw new Error("Unauthorized");
    }
  }
  _createUrl(path: string) {
    return `${this.origin}/api/${path}`;
  }
  _get<T>(url: string): Promise<T> {
    return this._fetch(url, "get");
  }
  _post<T>(url: string, data: string): Promise<T> {
    return this._fetch(url, "post", data);
  }
  _put<T>(url: string, data: string): Promise<T> {
    return this._fetch(url, "put", data);
  }
  _delete<T>(url: string, data?: string): Promise<T> {
    return this._fetch(url, "delete", data);
  }
  async _fetch<T>(
    url: string,
    type: "get" | "post" | "put" | "delete",
    data?: string,
  ): Promise<T> {
    {
      const request: RequestInit = {
        method: type,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        ...(data && { body: data }),
      };
      const fetchResult = await fetch(url, request);
      if (!fetchResult.ok && fetchResult.status === 401) {
        await this._handleUnauthorized()
      }
      const result = await fetchResult.json();

      if (fetchResult.ok) {
        return result;
      }

      const responseError = {
        type: "Error",
        message: result.message || "Something went wrong",
        data: result.data || "",
        code: result.code || "",
      };

      let error = new Error();
      error = { ...error, ...responseError };
      throw error;
    }
  }
  register(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) {
    const url = this._createUrl("auth/register");
    const body = {
      username,
      email,
      password,
      confirmPassword,
    };
    return this._post(url, JSON.stringify(body));
  }
  login(credential: string, password: string) {
    if (!credential)
      throw new Error("ClientNetworkError: miss credential when login");
    const url = this._createUrl("auth/local");
    const body = {
      email: credential,
      password,
    };
    return this._post(url, JSON.stringify(body));
  }
  changePassword(
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    const url = this._createUrl("auth/change-password");
    const body = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    return this._post(url, JSON.stringify(body));
  }
  forgotPassword(credentital: string) {
    const url = this._createUrl("auth/forgot-password");
    const body = {
      credentital,
    };
    return this._post(url, JSON.stringify(body));
  }
  _refreshToken<UserData>(refreshToken?: string) {
    const url = this._createUrl("auth/refresh-token");
    const body = {
      refreshToken,
    };
    return this._post<UserData>(url, JSON.stringify(body));
  }
  revokeToken(token?: string) {
    const url = this._createUrl("auth/revoke-token");
    const body = {
      token,
    };
    return this._post(url, JSON.stringify(body));
  }
  updateOwnInfo(data: UserData) {
    const url = this._createUrl("users/me");
    return this._post(url, JSON.stringify(data));
  }
  createPost(data: PostServerData) {
    const url = this._createUrl("posts");
    return this._post(url, JSON.stringify(data));
  }
  getPosts(): Promise<PostServerData[]> {
    const url = this._createUrl("posts");
    return this._get<PostServerData[]>(url);
  }
  updatePost(postId: string, post: PostSubmitServerData) {
    const url = this._createUrl(`posts/single/${postId}`);
    return this._put(url, JSON.stringify(post));
  }
  deletePost(postId: string) {
    const url = this._createUrl(`posts/single/${postId}`);
    return this._delete(url);
  }
  getTrans(): Promise<CommentTranslate[]> {
    const url = this._createUrl("trans");
    return this._get<CommentTranslate[]>(url);
  }
  createTrans(comment: CommentTranslate) {
    const url = this._createUrl("trans");
    return this._post(url, JSON.stringify(comment));
  }
  updateTrans(commentId: string, content: string) {
    const url = this._createUrl(`trans/single/${commentId}`);
    return this._put(url, JSON.stringify({ content }));
  }
  deleteTrans(commentId: string) {
    const url = this._createUrl(`trans/single/${commentId}`);
    return this._delete(url);
  }
  deleteCommentInPost(postId: string) {
    const url = this._createUrl(`trans`);
    return this._delete(url, JSON.stringify({ postId }));
  }
}
const fetcher = new ClientAPI();
export default fetcher;
