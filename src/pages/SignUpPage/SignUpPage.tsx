import { useState } from "react";
import "./SignUpPage.css";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput } from "../../components/PasswordInput";
import { validateSignUpForm } from "../../validation/validate";
import { axiosInstance } from "../../api/axiosConfig";
import { LOGIN_ENDPOINT, SIGNUP_ENDPOINT } from "../../api/apiConstants";
import { useAuthContext } from "../../hooks/useAuthContext";

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

const defaultUserSignUpData = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  repeat_password: "",
};

const SignUpPage = () => {
  const [formData, setFormData] = useState<IUserSignUpData>(
    defaultUserSignUpData
  );
  const [errors, setErrors] = useState<IUserSignUpData>(defaultUserSignUpData);
  const [showSignUpErrorMsg, setShowSignUpErrorMsg] =
    useState<IShowSignUpErrorMsg>({
      showErrorMsg: false,
      errorMsg: null,
    });
  const navigate = useNavigate();
  const { logIn } = useAuthContext();

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
    // Trim the white spaces from all the form data
    const trimmedFormData = Object.keys(formData).reduce(
      (acc, key) => ({
        ...acc,
        [key]: formData[key as keyof IUserSignUpData].trim(),
      }),
      defaultUserSignUpData
    );
    // Validate the user sign up data
    const { error } = validateSignUpForm(trimmedFormData);

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
    const formDataWithoutRepeatPassword = { ...trimmedFormData };
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

      try {
        const userLogInDetails = {
          email: trimmedFormData.email,
          password: trimmedFormData.password,
        };
        // Automatically log in the user after signing up
        const response = await axiosInstance.post(
          LOGIN_ENDPOINT,
          userLogInDetails
        );
        // Extract the token and user details from the response
        const bearerToken =
          response.headers.Authorization || response.headers.authorization;
        const token = bearerToken.split(" ")[1];
        const { registered_user_uid, first_name, last_name, email } =
          response.data;
        const user = {
          isAuthenticated: true,
          token: token,
          userId: registered_user_uid,
          firstName: first_name,
          lastName: last_name,
          email: email,
        };
        logIn(user);

        navigate("/students/");
      } catch (error: any) {
        console.error(error);
      }
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
