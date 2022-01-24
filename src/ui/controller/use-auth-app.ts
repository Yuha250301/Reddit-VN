import { useEffect } from "react";
import { useRecoilState } from "recoil";

import EventEmitter from "utils/event-emitter";
import authAtom from "ui/state/auth-atom";
import AuthActions from "ui/action/auth-action";

const useAuthApp = (): boolean => {
  const [isAuth, setAuth] = useRecoilState(authAtom);
  useEffect(() => {
    const listener = EventEmitter.addListener(
      AuthActions.SET_AUTH,
      (token: string | null) => {
        setAuth(!!token);
      },
    );
    return () => listener.remove();
  });
  return isAuth;
};

export default useAuthApp;
