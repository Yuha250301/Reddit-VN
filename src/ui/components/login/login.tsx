/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import OrangeButton from "../common/orange-button";
import PasswordField from "./password-field";
import Footer from "../common/footer";
import clsx from "clsx";

const logo = require("assets/img/logo.svg").default;

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
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignUp = (e: any) => {
    setIsSignUp(!isSignUp);
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
            <form>
              <input
                type="text"
                placeholder="Username"
                className={ClassNames.FormControl}
              />
              <PasswordField />
              <OrangeButton
                content={!isSignUp ? "Log in" : "Sign up"}
                onClick={() => this}
              />
            </form>
          </div>
          <div className={ClassNames.Anchor}>
            <span onClick={handleSignUp}>
              {isSignUp ? "Log in" : "Sign up"}
            </span>
            <span> • </span>
            <span>Ban log</span>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
