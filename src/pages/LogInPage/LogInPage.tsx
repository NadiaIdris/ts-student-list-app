import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../context/AuthContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { apiEndpoints } from "../../apiEndpoints/apiEndpoints";

interface UserLogInDetailsType {
  email: string;
  password: string;
}

interface LogInPageProps {
  /* Url to navigate to if user requested other than login page, but are not authenticated yet */
  url?: string;
}

const LogInPage = ({ url }: LogInPageProps) => {
  const { logIn } = useAuthContext();
  const navigate = useNavigate();
  const [userLogInDetails, setUserLogInDetails] =
    useState<UserLogInDetailsType>({
      email: "",
      password: "",
    });

  const handleSubmit = async (
    userLogInDetails: UserLogInDetailsType,
    loginFn: (user: UserType) => void
  ) => {
    // Make a post request to the server
    try {
      const reqUrl = `http://localhost:4000${apiEndpoints.logInEndpoint}`;
      const response = await axios.post(reqUrl, userLogInDetails);
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
      navigate(url || "/students", { replace: true });
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <>
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
          Not a member? <a href={apiEndpoints.signUpEndpoint}>Sign up now</a>
        </p>
        <p>* Required fields</p>
      </div>
    </>
  );
};

export { LogInPage };
