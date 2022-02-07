/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";

import clsx from "clsx";
import EventEmitter from "utils/event-emitter";
import AuthActions from "ui/action/auth-action";
import AuthController from "controller/core/auth";

import OrangeButton from "../common/orange-button";
import PasswordField from "./password-field";
import { useNavigate } from "react-router";
import { Section } from "../main/const";

const logo = require("assets/img/logo.svg").default;
const REGISTER_PATH = "/register";
const LOGIN_PATH = "/login";

const Root = "rvn-login";
const ClassNames = {
  Root,
  Body: `${Root}__body`,
  Content: `${Root}__content`,
  Visual: `${Root}__visual`,
  FormControl: `${Root}__form-control`,
  Anchor: `${Root}__anchor`,
  LastChild: `${Root}__last-child`,
};

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(
    window.location.pathname === REGISTER_PATH,
  );
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const listener = EventEmitter.addListener(AuthActions.DONE_REGISTER, () => {
      setIsSignUp(false);
    });
    const listener2 = EventEmitter.addListener(
      AuthActions.SET_AUTH,
      (token: string) => {
        if (token) navigate(`/${Section.TRANSLATE}`);
      },
    );
    return () => {
      listener.remove();
      listener2.remove();
    };
  }, []);

  useEffect(() => {
    if (window.location.pathname === REGISTER_PATH) {
      setIsSignUp(true);
    } else if (window.location.pathname === LOGIN_PATH) {
      setIsSignUp(false);
    }
  }, [window.location.pathname]);

  const handleSignUp = (e: any) => {
    e.preventDefault();
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!disable) {
      setDisable(true);
      let promise;
      if (isSignUp)
        promise = AuthController.register(credential, email, password, password);
      else {
        promise = AuthController.login(password, credential);
      }
      promise.finally(() => setDisable(false));
    }
  };

  return (
    <div className={Root}>
      <div
        className={clsx(
          "text-center",
          "d-flex",
          "flex-column",
          "align-items-center",
          ClassNames.Body,
        )}
      >
        <div
          className={clsx(
            "text-center",
            "d-flex",
            "flex-column",
            "align-items-center",
            ClassNames.Visual,
          )}
        >
          <img src={logo} alt="logo-login" className="m-5" />
          <div className={ClassNames.Content}>
            <input
              type="text"
              placeholder={isSignUp ? "Username" : "Username or email"}
              className={ClassNames.FormControl}
              name="credential"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
            />
            {isSignUp && (
              <input
                type="email"
                placeholder="Email"
                className={ClassNames.FormControl}
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}

            <PasswordField password={password} setPassword={setPassword} />
            <OrangeButton
              content={!isSignUp ? "Log in" : "Sign up"}
              onClick={handleSubmit}
            />
          </div>
          <div className={ClassNames.Anchor}>
            <span onClick={handleSignUp}>
              {isSignUp ? "Log in" : "Sign up"}
            </span>
            <span> • </span>
            <span>Ban log</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
