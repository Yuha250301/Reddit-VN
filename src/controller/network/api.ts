import { PostServerData } from "controller/core/post";
import AuthManager from "data/auth-manager";

export class ClientAPI {
  private origin: string;
  constructor() {
    this.origin = "http://localhost:3001";
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
  _delete<T>(url: string, needAuth: boolean = true): Promise<T> {
    return this._fetch(url, "delete", needAuth);
  }
  _fetch<T>(
    url: string,
    type: "get" | "post" | "put" | "delete",
    needAuth: boolean = true,
    data?: string,
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const authHeader = needAuth ? this._authHeader(url) : null;
      const request: RequestInit = {
        method: type,
        headers: {
          "Content-Type": "application/json",
          ...(authHeader && { ...authHeader }),
        },
        ...(data && { body: data }),
      };
      fetch(url, request)
        .then((response) => {
          if (!response.ok) {
            const message = "Error with Status Code: " + response.status;
            throw new Error(message);
          } else {
            if ([401, 403].includes(response.status)) {
              const error = response.statusText;
              return Promise.reject(error);
            }
            return response.json() as Promise<T>;
          }
        })
        .then(resolve)
        .catch((err) => {
          console.log("NetworkError: err when post to server", err);
          reject(err);
        });
    });
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
  createPost(data: PostServerData) {
    const url = this._createUrl("posts");
    return this._post(url, JSON.stringify(data));
  }
  getPosts(): Promise<PostServerData[]> {
    const url = this._createUrl("posts");
    return this._get<PostServerData[]>(url);
  }
  deletePost(postId: string) {
    const url = this._createUrl(`posts/single/${postId}`);
    return this._delete(url);
  }
}
const fetcher = new ClientAPI();
export default fetcher;
