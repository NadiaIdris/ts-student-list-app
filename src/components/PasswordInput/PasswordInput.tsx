import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IUserSignUpData } from "../../pages/SignUpPage/SignUpPage";

interface PasswordInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  register: UseFormRegister<IUserSignUpData>;
}

const PasswordInput = ({
  onChange,
  label = "Password",
  placeholder = "Enter your password",
  register,
  ...props
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group ">
      <label htmlFor="password">{label}*</label>
      <div className="password-input">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register("password", { required: true })}
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
    </div>
  );
};

export { PasswordInput };
