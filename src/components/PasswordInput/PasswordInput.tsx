import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./PasswordInput.css";

interface PasswordInputProps {
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label?: string;
  placeholder?: string;
  passwordErrorMsg?: string;
  // Add the rest of the props here
  [key: string]: any;
}

const PasswordInput = ({
  id,
  onChange,
  value,
  label = "Password",
  placeholder = "Enter your password",
  passwordErrorMsg,
  ...props
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group ">
      <label htmlFor={id}>{label}*</label>
      <div className="password-input">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
        <span
          className={`eye-icon ${showPassword ? "show" : ""}`}
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>
      {passwordErrorMsg && <div>{passwordErrorMsg}</div>}
    </div>
  );
};

export { PasswordInput };
