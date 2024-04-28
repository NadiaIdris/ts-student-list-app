import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./SignUpPage.css";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  // TODO: Implement sign up form
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {};
  const [userSignUpDetails, setUserSignUpDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <h1>Welcome to students app</h1>
      <h2>Sign in</h2>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First name*</label>
          <input type="text" placeholder="Enter your first name" />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last name*</label>
          <input type="text" placeholder="Enter your last name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div className="form-group ">
          <label htmlFor="password">Password*</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              value={userSignUpDetails.password}
              onChange={(event) =>
                setUserSignUpDetails({
                  ...userSignUpDetails,
                  password: event.target.value,
                })
              }
              placeholder="Enter your password"
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
        <button type="submit">Sign up</button>
      </form>
      <div>
        <p>
        Already a member? <Link to="/login">Log in now</Link>
        </p>
        <p>* Required fields</p>
      </div>
    </>
  );
};

export { SignUpPage };
