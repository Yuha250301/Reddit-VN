/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import clsx from 'clsx';


const Root = "rvn-login__password-field";

const PasswordField: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const showHide = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  return (
    <div className={clsx("mb-3",Root)}>
      <FormControl className="form-input"
        type={!showPassword ? "password" : "text"}
        placeholder="Password"
      />
      <i
        onClick={showHide}
        className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
      ></i>
    </div>
  );
};

export default PasswordField;
