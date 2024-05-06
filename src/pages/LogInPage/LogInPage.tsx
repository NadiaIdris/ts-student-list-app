import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ENDPOINT } from "../../api/apiConstants";
import { axiosInstance } from "../../api/axiosConfig";
import { Label } from "../../components/form/Label";
import { TextField } from "../../components/TextField";
import { useAuthContext } from "../../hooks/useAuthContext";
import { validateLoginForm } from "../../validation/validate";
import { StudentsPage } from "../StudentsPage";
import { Form } from "../../components/form/Form";
import { Field } from "../../components/form/Field";
import { ErrorMessage } from "../../components/form/ErrorMessage";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { RequiredAsterisk } from "../../components/form/RequiredAsterisk";
import styled from "styled-components";

export interface IUserLogInData {
  email: string;
  password: string;
}

const StyledWrapperSpan = styled.span`
  position: absolute;
  top: 50%;
  right: 6px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const StyledIconSpan = styled.span`
  padding: 8px;
  background-color: transparent;
  border-radius: 100px;
  // Add margin-right to all the spans except the last one
  &:not(:last-child) {
    margin-right: 4px;
  }
  // On hover, change the background color
  &:hover {
    background-color: lightgray;
  }
`;

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
  const [showPassword, setShowPassword] = useState(false);

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      [event.target.name]: event.target.value,
    });
  };

  const handleTogglePasswordIcon = () => {
    setShowPassword(!showPassword);
  };

  const passwordIcons = (id: string) => (
    <StyledWrapperSpan
      id={`${id}-icon`} // This is useful measuring the width of the icons wrapper span to add the correct padding-right to the input field.
      onClick={handleTogglePasswordIcon}
    >
      <StyledIconSpan>{showPassword ? <FiEyeOff /> : <FiEye />}</StyledIconSpan>
    </StyledWrapperSpan>
  );

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

  //If fieldId is not provided, generate a unique id
  // const fieldId = useMemo(
  //   () => (id ? id : `${name}-${uid({ id: name })}`),
  //   [id, name]
  // );

  return (
    <>
      <h1>Welcome to students app</h1>
      <h2>Log in</h2>
      <Form onSubmit={handleOnSubmit}>
        <Field>
          <Label htmlFor="login-email">
            Email
            <RequiredAsterisk />
          </Label>
          <TextField
            id="login-email"
            type="email"
            placeholder="Enter your email"
            name="email" // This is the form field key
            value={userLogInData.email} // This is the form field value
            onChange={handleOnChange}
            autoComplete="email"
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </Field>
        <Field>
          <Label htmlFor="login-password">
            Password
            <RequiredAsterisk />
          </Label>
          <TextField
            id="login-password"
            type="password"
            placeholder="Enter your password"
            name="password" // This is the form field key
            value={userLogInData.password} // This is the form field value
            onChange={handleOnChange}
            renderIcon={() => passwordIcons("login-password")}
            showPassword={showPassword}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </Field>
        {wrongCredentials && (
          <p>
            Please check your credentials. The email or password is incorrect.
          </p>
        )}
        <button type="submit">Log in</button>
      </Form>
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
