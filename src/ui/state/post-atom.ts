import { atom } from "recoil";
import { PostData } from "data/post-manager";
const postAtom = atom<PostData | undefined>({
  key: "app/post",
  default: undefined,
});
export default postAtom;
