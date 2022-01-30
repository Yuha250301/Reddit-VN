import Fetcher from "../network/api";
import AuthManager from "data/auth-manager";
import AuthActions from "ui/action/auth-action";
import EventEmitter from "utils/event-emitter";
import ModalManager from "ui/components/modal/manager";
import { ModalType } from "ui/components/modal/const";

class AuthController {
  constructor() {}
  async login(password: string, credential: string) {
    try {
      const resp: any = await Fetcher.login(credential, password);
      if (resp.jwtToken) {
        const user = {
          username: resp.username,
          token: resp.jwtToken,
          name: resp.name,
          avatar: resp.avatar,
          email: resp.email,
          aliasName: resp.aliasName,
        };
        AuthManager.updateUser(user);
        EventEmitter.emit(AuthActions.SET_AUTH, resp.jwtToken);
      }
    } catch (err: any) {
      console.log(err);
      ModalManager.addModal(ModalType.ERROR_MODAL, err.message);
    }
  }
  async register(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) {
    try {
      const resp: any = await Fetcher.register(
        username,
        email,
        password,
        confirmPassword,
      );
      if (resp) {
        ModalManager.addModal(
          ModalType.ANNOUCE_MODAL,
          "Đăng ký thành công, bạn kiểm tra email và đăng nhập nhé",
        );
        EventEmitter.emit(AuthActions.DONE_REGISTER);
      }
    } catch (err: any) {
      console.log(err);
      ModalManager.addModal(ModalType.ERROR_MODAL, err.message);
    }
  }
  logout() {
    AuthManager.removeUser();
    EventEmitter.emit(AuthActions.SET_AUTH, null);
  }
  async updateAliasName(aliasName: string) {
    await Fetcher.updateOwnInfo({ aliasName });
    AuthManager.updateAliasName(aliasName);
  }
}
const authController = new AuthController();
export default authController;
