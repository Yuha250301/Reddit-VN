import { PostServerData, PostSubmitServerData } from "controller/core/post";
import AuthManager, { UserData } from "data/auth-manager";
import { CommentTranslate } from "data/trans-manager";
import AuthController from "controller/core/auth";

export class ClientAPI {
  private origin: string;
  constructor() {
    this.origin = "https://api.rvninc.net";
    //this.origin = "http://localhost:3000";
  }
  _authHeader(url: string) {
    // return auth header with jwt if user is logged in and request is to the api url
    const token = AuthManager.getToken();
    const isLoggedIn = !!token;
    const isApiUrl = url.includes("api");
    if (isLoggedIn && isApiUrl) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return null;
    }
  }
  _createUrl(path: string) {
    return `${this.origin}/api/${path}`;
  }
  _get<T>(url: string, needAuth: boolean = true): Promise<T> {
    return this._fetch(url, "get", needAuth);
  }
  _post<T>(url: string, data: string, needAuth: boolean = true): Promise<T> {
    return this._fetch(url, "post", needAuth, data);
  }
  _put<T>(url: string, data: string, needAuth: boolean = true): Promise<T> {
    return this._fetch(url, "put", needAuth, data);
  }
  _delete<T>(url: string, needAuth: boolean = true, data?: string): Promise<T> {
    return this._fetch(url, "delete", needAuth, data);
  }
  async _fetch<T>(
    url: string,
    type: "get" | "post" | "put" | "delete",
    needAuth: boolean = true,
    data?: string,
  ): Promise<T> {
    {
      const authHeader = needAuth ? this._authHeader(url) : null;
      const request: RequestInit = {
        method: type,
        headers: {
          "Content-Type": "application/json",
          ...(authHeader && { ...authHeader }),
        },
        ...(data && { body: data }),
      };
      const fetchResult = await fetch(url, request);
      if (!fetchResult.ok && fetchResult.status === 401) {
        AuthController.logout();
        window.location.href = window.location.href;
        throw new Error("Unauthorized");
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
    return this._post(url, JSON.stringify(body), false);
  }
  login(credential: string, password: string) {
    if (!credential)
      throw new Error("ClientNetworkError: miss credential when login");
    const url = this._createUrl("auth/local");
    const body = {
      email: credential,
      password,
    };
    return this._post(url, JSON.stringify(body), false);
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
  forgotPassword(email: string) {
    const url = this._createUrl("auth/forgot-password");
    const body = {
      email,
    };
    return this._post(url, JSON.stringify(body), false);
  }
  refreshToken(refreshToken: string) {
    const url = this._createUrl("auth/refresh-token");
    const body = {
      refreshToken,
    };
    return this._post(url, JSON.stringify(body), false);
  }
  revokeToken(token: string) {
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
  deleteCommentInPost(postId: string) {
    const url = this._createUrl(`trans`);
    return this._delete(url, true, JSON.stringify({ postId }));
  }
}
const fetcher = new ClientAPI();
export default fetcher;
