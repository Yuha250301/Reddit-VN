/* eslint-disable prettier/prettier */
import React, { useState } from "react";
// import { FormControl } from "react-bootstrap";
import clsx from 'clsx';


const Root = "rvn-login__password-field";
interface PasswordFieldProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ password, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  const showHide = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  return (
    <div className={clsx(Root)}>
      <input
        className="rvn-login__form-control"
        type={!showPassword ? "password" : "text"}
        placeholder="Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <i
        onClick={showHide}
        className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
      ></i>
    </div>
  );
};

export default PasswordField;
