import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ENDPOINT } from "../../api/apiConstants";
import { axiosInstance } from "../../api/axiosConfig";
import { IUser } from "../../context/AuthContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { StudentsPage } from "../StudentsPage";
import { PasswordInput } from "../../components/PasswordInput";
import { validateLoginForm } from "../../validation/validate";

export interface IUserLogInData {
  email: string;
  password: string;
}

const LogInPage = () => {
  const { user, logIn } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [userLogInDetails, setUserLogInDetails] =
    useState<IUserLogInData>({
      email: "",
      password: "",
    });
  const [errors, setErrors] = useState<IUserLogInData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>,
    userLogInDetails: IUserLogInData,
    loginFn: (user: IUser) => void
  ) => {
    event.preventDefault();
    // Make a post request to the server
    const {error, value} = validateLoginForm(userLogInDetails);
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
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => { 
    setUserLogInDetails({
      ...userLogInDetails,
      [event.target.id]: event.target.value,
    })
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
      <form
        onSubmit={(event) => handleSubmit(event, userLogInDetails, logIn)}
        autoComplete="true"
      >
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={userLogInDetails.email}
            onChange={(event) => handleOnChange(event)        }
          />
        </div>
        <PasswordInput
          id="password"
          value={userLogInDetails.password}
          onChange={(event) =>
            setUserLogInDetails({
              ...userLogInDetails,
              password: event.target.value,
            })
          }
        />
      
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
