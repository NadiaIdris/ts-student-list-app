import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ENDPOINT, SIGNUP_ENDPOINT } from "../../api/apiConstants";
import { axiosInstance } from "../../api/axiosConfig";
import { IUser } from "../../context/AuthContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { StudentsPage } from "../StudentsPage";

interface UserLogInDetailsType {
  email: string;
  password: string;
}

const LogInPage = () => {
  const { user, logIn } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [userLogInDetails, setUserLogInDetails] =
    useState<UserLogInDetailsType>({
      email: "",
      password: "",
    });

  const handleSubmit = async (
    userLogInDetails: UserLogInDetailsType,
    loginFn: (user: IUser) => void
  ) => {
    // Make a post request to the server
    try {
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
      loginFn(user);
      // Redirect to the url that the user was trying to access

      if (user) {
        const intendedUrl = location.state?.from;
        // Redirect to the intended URL if it exists or to the students page
        if (intendedUrl) {
          navigate(intendedUrl);
        } else {
          navigate("/students");
        }
      }

      // navigate("/students", { replace: true });
    } catch (error) {
      console.error("Error logging in", error);
    }
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
    // navigate("/students", { replace: true });
    return <StudentsPage />;
  }

  return (
    <div>
      <h1>Welcome to students app</h1>
      <h2>Log in</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(userLogInDetails, logIn);
        }}
      >
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={userLogInDetails.email}
            onChange={(event) =>
              setUserLogInDetails({
                ...userLogInDetails,
                email: event.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={userLogInDetails.password}
            onChange={(event) =>
              setUserLogInDetails({
                ...userLogInDetails,
                password: event.target.value,
              })
            }
          />
        </div>
        <button type="submit">Log in</button>
      </form>
      <div>
        <p>
          Not a member? <a href={SIGNUP_ENDPOINT}>Sign up now</a>
        </p>
        <p>* Required fields</p>
      </div>
    </div>
  );
};

export { LogInPage };
