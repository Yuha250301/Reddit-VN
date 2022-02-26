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
const FORGOT_PATH = "/forgot-password";
const LOGIN_PATH = "/login";

const Root = "rvn-login";
const ClassNames = {
  Root,
  Body: `${Root}__body`,
  Content: `${Root}__content`,
  Visual: `${Root}__visual`,
  FormControl: `${Root}__form-control`,
  Anchor: `${Root}__anchor`,
  AnchorItem: `${Root}__anchor__item`,
  LastChild: `${Root}__last-child`,
};

enum PageStatus {
  REGISTER = "REGISTER",
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
  LOGIN = "LOGIN",
}

const Login: React.FC = () => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(false);
  const [pageStatus, setPageStatus] = useState(PageStatus.LOGIN);
  const navigate = useNavigate();

  useEffect(() => {
    const listener = EventEmitter.addListener(
      AuthActions.DONE_AUTHEN_ACTION,
      () => {
        setPageStatus(PageStatus.LOGIN);
      },
    );
    const listener2 = EventEmitter.addListener(
      AuthActions.SET_AUTH,
      (isLogged: boolean) => {
        if (isLogged) setTimeout(() => navigate(`/${Section.TRANSLATE}`), 200);
      },
    );
    return () => {
      listener.remove();
      listener2.remove();
    };
  }, []);

  useEffect(() => {
    if (window.location.pathname === REGISTER_PATH) {
      setPageStatus(PageStatus.REGISTER);
    } else if (window.location.pathname === LOGIN_PATH) {
      setPageStatus(PageStatus.LOGIN);
    } else if (window.location.pathname === FORGOT_PATH) {
      setPageStatus(PageStatus.FORGOT_PASSWORD);
    }
  }, [window.location.pathname]);

  const handleSignUp = (e: any) => {
    e.preventDefault();
    setPageStatus(PageStatus.REGISTER);
  };

  const handleForgotPassword = (e: any) => {
    e.preventDefault();
    setPageStatus(PageStatus.FORGOT_PASSWORD);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!disable) {
      setDisable(true);
      let promise;
      if (pageStatus === PageStatus.REGISTER)
        promise = AuthController.register(
          credential,
          email,
          password,
          password,
        );
      else if (pageStatus === PageStatus.FORGOT_PASSWORD) {
        promise = AuthController.forgotPassword(credential);
      } else {
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
              placeholder={
                pageStatus === PageStatus.REGISTER
                  ? "Username"
                  : "Username or email"
              }
              className={ClassNames.FormControl}
              name="credential"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
            />
            {pageStatus === PageStatus.REGISTER && (
              <input
                type="email"
                placeholder="Email"
                className={ClassNames.FormControl}
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}

            {pageStatus !== PageStatus.FORGOT_PASSWORD && (
              <PasswordField password={password} setPassword={setPassword} />
            )}
            <OrangeButton
              content={
                pageStatus === PageStatus.REGISTER
                  ? "Sign up"
                  : pageStatus === PageStatus.LOGIN
                  ? "Log in"
                  : "Forgot password"
              }
              onClick={handleSubmit}
              style={{ marginTop: "12px" }}
            />
          </div>
          <div className={ClassNames.Anchor}>
            <span className={ClassNames.AnchorItem} onClick={handleSignUp}>
              {pageStatus === PageStatus.REGISTER ? "Log in" : "Sign up"}
            </span>
            <span> • </span>
            <span
              className={ClassNames.AnchorItem}
              onClick={handleForgotPassword}
            >
              Forgot password
            </span>
            <span> • </span>
            <a
              href="https://www.facebook.com/groups/rvn.netherworld"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white", textDecoration: "none" }}
            >
              <span className={ClassNames.AnchorItem}>Ban log</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
