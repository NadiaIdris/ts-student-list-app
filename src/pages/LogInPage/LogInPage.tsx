import { ChangeEvent, useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  Link,
  useNavigate,
  Form,
  useActionData,
} from "react-router-dom";
import styled from "styled-components";
import { LOGIN_ENDPOINT } from "../../api/apiConstants";
import { axiosInstance } from "../../api/axiosConfig";
import { Button } from "../../components/buttons/Button";
import { ErrorMessage } from "../../components/form/ErrorMessage";
import { Field, FieldSize } from "../../components/form/Field";
import { RequiredAsterisk } from "../../components/form/RequiredAsterisk";
import { Heading1 } from "../../components/text/Heading1";
import { Heading2 } from "../../components/text/Heading2";
import { TextField } from "../../components/TextField";
import { useAuthContext } from "../../hooks/useAuthContext";
import { validateLoginForm } from "../../validation/validate";
import { IUser } from "../../context/AuthContext";

interface IUserLogInErrors {
  email: string;
  password: string;
}

interface ILogInData {
  errorMsgs: IUserLogInErrors;
  wrongCredentials: boolean;
  user: IUser;
}

export async function action({ request }: { request: Request }) {
  let formData = await request.formData();
  // Trim the white spaces from the email and password
  const trimmedUserLogInData = Object.fromEntries(
    [...formData.entries()].map(([key, value]) => [
      key,
      value.toString().trim(),
    ])
  ) as unknown as IUserLogInErrors;
  // Validate the user login data, before sending it to the server
  const { error } = validateLoginForm(trimmedUserLogInData);
  if (error) {
    const errorMsgs = error.details.reduce((acc, detail) => {
      if (detail.context?.key) {
        return { ...acc, [detail.context.key]: detail.message };
      }
      return acc;
    }, defaultUserLogInData);
    // Don't continue with the login process if there are errors.
    return { errorMsgs };
  }

  try {
    const response = await axiosInstance.post(
      LOGIN_ENDPOINT,
      trimmedUserLogInData
    );
    // Extract the token and user details from the response
    const bearerToken =
      response.headers.Authorization || response.headers.authorization;
    const token = bearerToken.split(" ")[1];
    const { registered_user_uid, first_name, last_name, email } = response.data;
    const user = {
      isAuthenticated: true,
      token: token,
      userId: registered_user_uid,
      firstName: first_name,
      lastName: last_name,
      email: email,
    };
    return { user };
  } catch (error: any) {
    console.error(`[ACTION ERROR]: ${error}`);
    if (error.response.status === 401) {
      return { wrongCredentials: true } as ILogInData;
    }
  }

  return null;
}

export interface IUserLogInData {
  email: string;
  password: string;
}

const StyledLoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 12px 50px 12px;
  gap: 16px;
`;

const StyledWrapperDiv = styled.div<{ $isLoading: boolean; $size: FieldSize }>`
  position: absolute;
  top: 50%;
  right: ${({ $size }) => ($size === "small" ? "4px" : "2px")};
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 2px;
  ${({ $isLoading }) =>
    $isLoading && "pointer-events: none; opacity: 0.5; cursor: disabled;"};
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

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-width: 340px;
  width: 100%;
`;

const StyledNotAMemberDiv = styled.div`
  margin-top: 40px;
  text-align: center;
  font-size: 0.875rem;
  color: var(--color-black-400);
  a {
    color: var(--color-danger-500);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const defaultUserLogInData = {
  email: "",
  password: "",
};

const LogInPage = () => {
  const { user, logIn } = useAuthContext();
  const navigate = useNavigate();
  // const location = useLocation();
  const actionData: ILogInData | undefined = useActionData() as ILogInData;
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // Trim the white spaces from the email and password
  //   const trimmedUserLogInData = Object.keys(userLogInData).reduce(
  //     (acc, key) => ({
  //       ...acc,
  //       [key]: userLogInData[key as keyof IUserLogInData].trim(),
  //     }),
  //     defaultUserLogInData
  //   );
  //   // Validate the user login data, before sending it to the server
  //   const { error } = validateLoginForm(trimmedUserLogInData);
  //   if (error) {
  //     const errorMsgs = error.details.reduce((acc, detail) => {
  //       if (detail.context?.key) {
  //         return { ...acc, [detail.context.key]: detail.message };
  //       }
  //       return acc;
  //     }, defaultUserLogInData);
  //     setErrors({ ...errorMsgs });
  //     // Don't continue with the login process if there are errors.
  //     return;
  //   } else {
  //     setErrors(defaultUserLogInData);
  //   }

  //   try {
  //     setSubmitting(true);
  //     const response = await axiosInstance.post(LOGIN_ENDPOINT, userLogInData);
  //     // Extract the token and user details from the response
  //     const bearerToken =
  //       response.headers.Authorization || response.headers.authorization;
  //     const token = bearerToken.split(" ")[1];
  //     const { registered_user_uid, first_name, last_name, email } =
  //       response.data;
  //     const user = {
  //       isAuthenticated: true,
  //       token: token,
  //       userId: registered_user_uid,
  //       firstName: first_name,
  //       lastName: last_name,
  //       email: email,
  //     };
  //     logIn(user);
  //     // Redirect to the url that the user was trying to access
  //     const intendedUrl = location.state?.from;
  //     if (intendedUrl) {
  //       navigate(intendedUrl);
  //     } else {
  //       navigate("/students");
  //     }
  //   } catch (error: any) {
  //     console.error(error);
  //     if (error.response.status === 401) {
  //       setWrongCredentials(true);
  //     }
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleTogglePasswordIcon = () => {
    setShowPassword(!showPassword);
  };

  const passwordIcons = (id: string, $isLoading: boolean, $size: FieldSize) => (
    <StyledWrapperDiv
      id={`${id}-icon`} // This is useful measuring the width of the icons wrapper span to add the correct padding-right to the input field.
      onClick={handleTogglePasswordIcon}
      $isLoading={$isLoading}
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

  useEffect(() => {
    const userData = actionData?.user;
    console.log("userD: ", userData);
    if (userData) {
      logIn(userData);
      navigate("/students");
    }
  }, [actionData?.user, navigate, logIn]);

  return (
    <StyledLoginPageWrapper>
      <Heading1 style={{ textAlign: "center" }}>
        Welcome to students app
      </Heading1>
      <StyledFormWrapper>
        <Heading2>Log in</Heading2>
        <Form method="post">
          <Field
            id="login-email"
            label="Email"
            isRequired
            invalidFieldMessage={actionData?.errorMsgs?.email}
            style={{ margin: "0 0 12px 0" }}
          >
            {(inputProps) => (
              <TextField
                type="email"
                name="email"
                placeholder="Enter your email"
                isInvalid={Boolean(actionData?.errorMsgs?.email)}
                isDisabled={submitting}
                {...inputProps}
              />
            )}
          </Field>
          <Field
            id="login-password"
            label="Password"
            isRequired
            invalidFieldMessage={actionData?.errorMsgs?.password}
            style={{ margin: "0 0 12px 0" }}
          >
            {(inputProps) => (
              <TextField
                type="password"
                name="password"
                placeholder="Enter your password"
                isInvalid={Boolean(actionData?.errorMsgs?.password)}
                isDisabled={submitting}
                renderIcon={(isDisabled, $size) =>
                  passwordIcons("login-password", isDisabled, $size)
                }
                showPassword={showPassword}
                {...inputProps}
              />
            )}
          </Field>

          {actionData?.wrongCredentials && (
            <ErrorMessage $isVisible={actionData?.wrongCredentials}>
              Please check your credentials. The email or password is incorrect.
            </ErrorMessage>
          )}
          <Button
            type="submit"
            fullWidth
            isLoading={submitting}
            style={{ marginTop: "24px" }}
          >
            Log in
          </Button>
        </Form>
        <StyledNotAMemberDiv>
          Not a member? <Link to="/signup">Sign up now</Link>
          <br />
          <RequiredAsterisk /> Required fields
        </StyledNotAMemberDiv>
      </StyledFormWrapper>
    </StyledLoginPageWrapper>
  );
};

export { LogInPage };
