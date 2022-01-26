interface UserData {
  username: string;
  token: string;
  email: string;
  avatar: string;
  name: string;
}
const RVN_USER_PATH = "rvn_user";

export class AuthManager {
  private username?: string;
  private token?: string;
  private email?: string;
  private avatar?: string;
  private name?: string;
  constructor() {
    try {
      const data = localStorage.getItem("rvn_user");
      if (data) {
        const user: UserData = JSON.parse(data);
        this.username = user.username;
        this.token = user.token;
        this.email = user.email;
        this.avatar = user.avatar;
        this.name = user.name;
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
