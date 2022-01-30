import { atom } from "recoil";
import AuthManager from "data/auth-manager";
const authAtom = atom({
  key: "app/auth",
  default: !!AuthManager.getToken(),
});
export const userAtom = atom({
  key: "app/user",
  default: {},
});
export default authAtom;
