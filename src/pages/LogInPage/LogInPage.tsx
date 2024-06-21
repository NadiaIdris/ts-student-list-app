import { useEffect, useState } from "react";
import { Form, Link, useActionData, useNavigate, useNavigation } from "react-router-dom";
import styled from "styled-components";
import { LOGIN_ENDPOINT } from "../../api/apiConstants";
import { axiosInstance } from "../../api/axiosConfig";
import { Button } from "../../components/Button";
import { ErrorMessage } from "../../components/form/ErrorMessage";
import { Field } from "../../components/form/Field";
import { RequiredAsterisk } from "../../components/form/RequiredAsterisk";
import { Heading1 } from "../../components/text/Heading1";
import { Heading2 } from "../../components/text/Heading2";
import { TextField } from "../../components/TextField";
import { IUser } from "../../context/AuthContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { validateLoginForm } from "../../validation/validate";
import { removeWhiteSpace } from "../../utils/utils";
import { renderPasswordIcons } from "../SignUpPage";

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
  const trimmedUserLogInData = removeWhiteSpace(formData) as unknown as IUserLogInErrors;

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
    const response = await axiosInstance.post(LOGIN_ENDPOINT, trimmedUserLogInData);
    // Extract the token and user details from the response
    const bearerToken = response.headers.Authorization || response.headers.authorization;
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
  font-size: var(--font-size-14);
  color: var(--color-gray-text-light);
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
  const { logIn } = useAuthContext();
  const navigate = useNavigate();
  const actionData: ILogInData | undefined = useActionData() as ILogInData;
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  const emailErrorMsg = actionData?.errorMsgs?.email;
  const passwordErrorMsg = actionData?.errorMsgs?.password;

  useEffect(() => {
    const userData = actionData?.user;
    if (userData) {
      logIn(userData);
      // Redirect to the url that the user was trying to access
      const intendedUrl = localStorage.getItem("endpoint");
      if (intendedUrl) {
        navigate(intendedUrl);
      } else {
        navigate("/students");
      }
    }
  }, [actionData?.user, navigate, logIn]);

  return (
    <StyledLoginPageWrapper>
      <Heading1 style={{ textAlign: "center" }}>Welcome to students app</Heading1>
      <StyledFormWrapper>
        <Heading2>Log in</Heading2>
        <Form method="post">
          <Field
            id="login-email"
            label="Email"
            isRequired
            invalidFieldMessage={emailErrorMsg}
            style={{ margin: "0 0 12px 0" }}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                type="email"
                name="email"
                placeholder="Enter your email"
                isInvalid={Boolean(emailErrorMsg)}
                isDisabled={submitting}
              />
            )}
          </Field>
          <Field
            id="login-password"
            label="Password"
            isRequired
            invalidFieldMessage={passwordErrorMsg}
            style={{ margin: "0 0 12px 0" }}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                type="password"
                name="password"
                placeholder="Enter your password"
                isInvalid={Boolean(passwordErrorMsg)}
                isDisabled={submitting}
                renderIcon={(isDisabled) =>
                  renderPasswordIcons("login-password", isDisabled, showPassword, setShowPassword)
                }
                passwordIsVisible={showPassword}
              />
            )}
          </Field>

          {actionData?.wrongCredentials && (
            <ErrorMessage isVisible={actionData?.wrongCredentials}>
              Please check your credentials. The email or password is incorrect.
            </ErrorMessage>
          )}
          <Button type="submit" fullWidth isLoading={submitting} style={{ marginTop: "24px" }}>
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
