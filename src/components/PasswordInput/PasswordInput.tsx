import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface PasswordInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
}

const PasswordInput = ({
  value,
  onChange,
  label = "Password",
  placeholder = "Enter your password",
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group ">
      <label htmlFor="password">{label}*</label>
      <div className="password-input">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
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
    </div>
  );
};

export { PasswordInput };
