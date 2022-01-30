import { atom } from "recoil";
const noteAtom = atom<string>({
  key: "app/note",
  default: '',
});
export default noteAtom;
