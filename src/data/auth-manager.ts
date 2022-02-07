export interface UserData {
  username?: string;
  token?: string;
  email?: string;
  avatar?: string;
  name?: string;
  aliasName?: string;
}
const RVN_USER_PATH = "rvn_user";
const DEFAULT_ALIAS_NAME = "một member chăm chỉ dịch bài";

export class AuthManager {
  private username?: string;
  private token?: string;
  private email?: string;
  private avatar?: string;
  private name?: string;
  private aliasName: string;
  constructor() {
    this.aliasName = DEFAULT_ALIAS_NAME;
    try {
      const data = localStorage.getItem(RVN_USER_PATH);
      if (data) {
        const user: UserData = JSON.parse(data);
        this.username = user.username;
        this.token = user.token;
        this.email = user.email;
        this.avatar = user.avatar;
        this.name = user.name;
        if (user.aliasName) this.aliasName = user.aliasName;
      }
    } catch (err) {
      console.log("ClientStorage Err: can't parse user data");
    }
  }
  updateUser(data: UserData) {
    localStorage.setItem(RVN_USER_PATH, JSON.stringify(data));
    this.username = data.username;
    this.token = data.token;
    this.email = data.email;
    this.avatar = data.avatar;
    this.name = data.name;
    if (data.aliasName) this.aliasName = data.aliasName;
  }
  removeUser() {
    localStorage.removeItem(RVN_USER_PATH);
    this.username = "";
    this.token = "";
    this.email = "";
    this.avatar = "";
    this.name = "";
  }
  getUsername() {
    return this.username;
  }
  getAliasName() {
    return this.aliasName;
  }
  updateAliasName(name: string) {
    this.aliasName = name;
    try {
      const data = localStorage.getItem(RVN_USER_PATH);
      if (data) {
        const user: UserData = JSON.parse(data);
        localStorage.setItem(RVN_USER_PATH, JSON.stringify({...user, aliasName: name}));
      }
    } catch (err) {
      console.log("ClientStorage Err: can't parse user data");
    }
  }
  getToken() {
    return this.token;
  }
  getAvatar() {
    return this.avatar;
  }
  getEmail() {
    return this.email;
  }
  getName() {
    return this.name;
  }
}
const authManager = new AuthManager();
export default authManager;
