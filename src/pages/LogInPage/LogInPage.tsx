import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { routes } from "../../routes/routes";
import axios from "axios";
import { UserType } from "../../context/AuthContext";

interface UserLogInDetailsType {
  email: string;
  password: string;
}

const LogInPage = () => {
  const { logIn } = useAuthContext();
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
      const url = `http://localhost:4000${routes.logInRoute}`;
      const response = await axios.post(url, userLogInDetails);
      // Extract the token and user details from the response
      const bearerToken = response.headers.Authorization || response.headers.authorization;
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
          Not a member? <a href={routes.signUpRoute}>Sign up now</a>
        </p>
        <p>* Required fields</p>
      </div>
    </>
  );
};

export { LogInPage };
