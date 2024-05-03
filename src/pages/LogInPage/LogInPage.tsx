import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ENDPOINT } from "../../api/apiConstants";
import { axiosInstance } from "../../api/axiosConfig";
import { useAuthContext } from "../../hooks/useAuthContext";
import { StudentsPage } from "../StudentsPage";
import { PasswordInput } from "../../components/PasswordInput";
import { validateLoginForm } from "../../validation/validate";

export interface IUserLogInData {
  email: string;
  password: string;
}

const defaultUserLogInData = {
  email: "",
  password: "",
};

const LogInPage = () => {
  const { user, logIn } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [userLogInData, setUserLogInData] =
    useState<IUserLogInData>(defaultUserLogInData);
  const [errors, setErrors] = useState<IUserLogInData>(defaultUserLogInData);
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Trim the white spaces from the email and password
    const trimmedUserLogInData = Object.keys(userLogInData).reduce(
      (acc, key) => ({
        ...acc,
        [key]: userLogInData[key as keyof IUserLogInData].trim(),
      }),
      defaultUserLogInData
    );
    // Validate the user login data, before sending it to the server
    const { error } = validateLoginForm(trimmedUserLogInData);
    if (error) {
      const errorMsgs = error.details.reduce((acc, detail) => {
        if (detail.context?.key) {
          return { ...acc, [detail.context.key]: detail.message };
        }
        return acc;
      }, defaultUserLogInData);
      setErrors({ ...errorMsgs });
      // Don't continue with the login process if there are errors.
      return;
    } else {
      setErrors(defaultUserLogInData);
    }

    try {
      const response = await axiosInstance.post(LOGIN_ENDPOINT, userLogInData);
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
      // Redirect to the url that the user was trying to access
      const intendedUrl = location.state?.from;
      if (intendedUrl) {
        navigate(intendedUrl);
      } else {
        navigate("/students");
      }
    } catch (error: any) {
      console.error(error);
      if (error.response.status === 401) {
        setWrongCredentials(true);
      }
    }
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUserLogInData({
      ...userLogInData,
      [event.target.id]: event.target.value,
    });
  };

  const isAuthenticated = user?.isAuthenticated;

  // The use effect hook below checks if the user is authenticated and redirects them to the students page if they are.
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  /*
   * If the user is authenticated, render the StudentsPage component, so that there will not be any
   * flicker in the UI when the user is redirected to the students page.
   */
  if (isAuthenticated) {
    return <StudentsPage />;
  }

  return (
    <>
      <h1>Welcome to students app</h1>
      <h2>Log in</h2>
      <form onSubmit={(event) => handleSubmit(event)} autoComplete="true">
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={userLogInData.email}
            onChange={(event) => handleOnChange(event)}
            autoComplete="true"
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <PasswordInput
          id="password"
          value={userLogInData.password}
          onChange={handleOnChange}
          passwordErrorMsg={errors.password}
        />
        {wrongCredentials && (
          <p>
            Please check your credentials. The email or password is incorrect.
          </p>
        )}
        <button type="submit">Log in</button>
      </form>
      <div>
        <p>
          Not a member? <Link to="/signup">Sign up now</Link>
        </p>
        <p>* Required fields</p>
      </div>
    </>
  );
};

export { LogInPage };
