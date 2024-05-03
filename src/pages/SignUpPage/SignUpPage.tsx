import { useState } from "react";
import "./SignUpPage.css";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput } from "../../components/PasswordInput";
import { validateSignUpForm } from "../../validation/validate";
import { axiosInstance } from "../../api/axiosConfig";
import { SIGNUP_ENDPOINT } from "../../api/apiConstants";
import { error } from "console";

export interface IUserSignUpData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  repeat_password: string;
}

interface IShowSignUpErrorMsg {
  showErrorMsg: boolean;
  errorMsg: JSX.Element | null;
}

const SignUpPage = () => {
  const [formData, setFormData] = useState<IUserSignUpData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    repeat_password: "",
  });

  const [errors, setErrors] = useState<IUserSignUpData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    repeat_password: "",
  });
  const navigate = useNavigate();
  const [showSignUpErrorMsg, setShowSignUpErrorMsg] =
    useState<IShowSignUpErrorMsg>({
      showErrorMsg: false,
      errorMsg: null,
    });

  const showCorrectErrorMsg = (error: any) => {
    if (error.response.status === 409) {
      return (
        <>
          Email already exists. Please <Link to="/login">log in</Link>.
        </>
      );
    } else {
      return <>An error occurred. Please try again later.</>;
    }
  };

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Validate the user sign up data
    const { error } = validateSignUpForm(formData);

    if (error) {
      // Make an object with the error messages
      const errorMsgs = error.details.reduce(
        (acc, detail) => {
          const key = detail.context?.key;
          if (key) {
            return {
              ...acc,
              [key]: detail.message,
            };
          }
          return acc;
        },
        {
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          repeat_password: "",
        }
      );

      setErrors({ ...errorMsgs });
      // Don't continue with the sign up process if there are errors.
      return;
    } else {
      // If no errors, clear the errors
      setErrors({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        repeat_password: "",
      });
    }

    // Delete the repeat_password key from the formData
    const formDataWithoutRepeatPassword = { ...formData };
    delete (formDataWithoutRepeatPassword as Partial<IUserSignUpData>)
      .repeat_password;

    //Send the user data to the server if there are no errors
    try {
      await axiosInstance.post(SIGNUP_ENDPOINT, formDataWithoutRepeatPassword, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Clear the form
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        repeat_password: "",
      });
      navigate("/students/");
    } catch (error: any) {
      const errorMsg = showCorrectErrorMsg(error);
      setShowSignUpErrorMsg({ showErrorMsg: true, errorMsg });
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };
  return (
    <>
      <h1>Welcome to students app</h1>
      <h2>Sign up</h2>
      <form onSubmit={handleOnSubmit} autoComplete="true">
        <div className="form-group">
          <label htmlFor="first_name">First name*</label>
          <input
            id="first_name"
            type="text"
            placeholder="Enter your first name"
            value={formData.first_name}
            onChange={handleOnChange}
          />
          {errors.first_name && <div>{errors.first_name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last name*</label>
          <input
            id="last_name"
            type="text"
            placeholder="Enter your last name"
            value={formData.last_name}
            onChange={handleOnChange}
          />
          {errors.last_name && <div>{errors.last_name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleOnChange}
          />
          {errors.email && <div>{errors.email}</div>}
        </div>
        <PasswordInput
          id="password"
          value={formData.password}
          onChange={handleOnChange}
          passwordErrorMsg={errors.password}
        />
        <PasswordInput
          id="repeat_password"
          label="Confirm password"
          value={formData.repeat_password}
          onChange={handleOnChange}
          passwordErrorMsg={errors.repeat_password}
        />
        {showSignUpErrorMsg.showErrorMsg && showSignUpErrorMsg.errorMsg}
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
