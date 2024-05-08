import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LOGIN_ENDPOINT } from "../../api/apiConstants";
import { axiosInstance } from "../../api/axiosConfig";
import { Button } from "../../components/Button";
import { Field, FieldSize } from "../../components/form/Field";
import { Form } from "../../components/form/Form";
import { Heading1 } from "../../components/text/Heading1";
import { Heading2 } from "../../components/text/Heading2";
import { TextField } from "../../components/TextField";
import { useAuthContext } from "../../hooks/useAuthContext";
import { validateLoginForm } from "../../validation/validate";
import { StudentsPage } from "../StudentsPage";

export interface IUserLogInData {
  email: string;
  password: string;
}

const StyledWrapperDiv = styled.div<{ $isDisabled: boolean; $size: FieldSize }>`
  position: absolute;
  top: 50%;
  right: ${({ $size }) => ($size === "small" ? "4px" : "2px")};
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 2px;
  ${({ $isDisabled }) =>
    $isDisabled && "pointer-events: none; opacity: 0.5; cursor: disabled;"};
`;

const StyledIconSpan = styled.span<{ $size: FieldSize }>`
  padding: ${({ $size }) => ($size === "small" ? "4px" : "8px")};
  background-color: transparent;
  border-radius: 100px;
  display: flex;
  color: var(--color-black-700);
  &:hover {
    background-color: var(--color-gray-600);
    color: var(--color-black);
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
  const [submitting, setSubmitting] = useState(false);

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
      setSubmitting(true);
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
    } finally {
      setSubmitting(false);
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

  const passwordIcons = (
    id: string,
    $isDisabled: boolean,
    $size: FieldSize
  ) => (
    <StyledWrapperDiv
      id={`${id}-icon`} // This is useful measuring the width of the icons wrapper span to add the correct padding-right to the input field.
      onClick={handleTogglePasswordIcon}
      $isDisabled={$isDisabled}
      $size={$size}
    >
      <StyledIconSpan $size={$size}>
        {showPassword ? (
          <FiEyeOff style={{ width: "16px", height: "16px" }} />
        ) : (
          <FiEye style={{ width: "16px", height: "16px" }} />
        )}
      </StyledIconSpan>
    </StyledWrapperDiv>
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
      <Heading1>Welcome to students app</Heading1>
      <Heading2>Log in</Heading2>{" "}
      <Form onSubmit={handleOnSubmit}>
        <Field
          id="login-email"
          label="Email"
          isRequired
          invalidFieldMessage={errors.email}
        >
          {(inputProps) => (
            <TextField
              type="email"
              name="email" 
              value={userLogInData.email} 
              onChange={handleOnChange}
              placeholder="Enter your email"
              $isInvalid={Boolean(errors.email)}
              isDisabled={submitting}
              {...inputProps}
            />
          )}
        </Field>
        <Field
          id="login-password"
          label="Password"
          isRequired
          invalidFieldMessage={errors.password}
        >
          {(inputProps) => (
            <TextField
              type="password"
              name="password" 
              value={userLogInData.password} 
              onChange={handleOnChange}
              placeholder="Enter your password"
              $isInvalid={Boolean(errors.password)}
              isDisabled={submitting}
              renderIcon={(isDisabled, $size) =>
                passwordIcons("login-password", isDisabled, $size)
              }
              showPassword={showPassword}
              {...inputProps}
            />
          )}
        </Field>

        {wrongCredentials && (
          <p>
            Please check your credentials. The email or password is incorrect.
          </p>
        )}
        <Button
          type="submit"
          $appearance="primary"
          $fullWidth
          isDisabled={submitting}
        >
          Log in
        </Button>
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
