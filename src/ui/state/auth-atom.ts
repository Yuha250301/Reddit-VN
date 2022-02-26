import { atom } from "recoil";
import AuthManager from "data/auth-manager";
const authAtom = atom({
  key: "app/auth",
  default: !!AuthManager.isLogged(),
});
export const userAtom = atom({
  key: "app/user",
  default: {},
});
export default authAtom;
