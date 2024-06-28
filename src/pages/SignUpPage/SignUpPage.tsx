import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Form, Link, useActionData, useNavigate, useNavigation } from "react-router-dom";
import styled from "styled-components";
import { USER_ENDPOINT} from "../../api/apiConstants";
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
import { validateSignUpForm } from "../../validation/validate";
import { generateErrorMessagesObject, trimWhiteSpace } from "../../utils/utils";

interface IUserSignUpErrors {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  repeat_password: string;
}

interface ISignUpData {
  errorMsgs: IUserSignUpErrors;
  user: IUser;
  networkError: any;
}

const defaultUserSignUpData = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  repeat_password: "",
};

async function action({ request }: { request: Request }) {
  let formData = await request.formData();
  // Trim the white spaces from all the form data
  const trimmedUserSignUpData = trimWhiteSpace(formData) as unknown as IUserSignUpErrors;

  // Validate the user sign up data
  const { error } = validateSignUpForm(trimmedUserSignUpData);

  if (error) {
    // Make an object with the error messages
    const errorMsgs = generateErrorMessagesObject(error.details, defaultUserSignUpData);
    return { errorMsgs };
  }

  // Delete the repeat_password key from the formData
  const formDataWithoutRepeatPassword = { ...trimmedUserSignUpData };
  delete (formDataWithoutRepeatPassword as Partial<IUserSignUpData>).repeat_password;

  //Send the user data to the server if there are no errors
  try {
    const SIGNUP_ENDPOINT = `${USER_ENDPOINT}/signup`;
    await axiosInstance.post(SIGNUP_ENDPOINT, formDataWithoutRepeatPassword, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Automatically log in the user after signing up
    try {
      const userLogInDetails = {
        email: trimmedUserSignUpData.email,
        password: trimmedUserSignUpData.password,
      };
      const LOGIN_ENDPOINT = `${USER_ENDPOINT}/login`;
      const response = await axiosInstance.post(LOGIN_ENDPOINT, userLogInDetails);
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
      // Failed to log in the user after signing up.
      console.error(error);
      return { networkError: error };
    }
  } catch (error: any) {
    console.error(`[ACTION ERROR]: ${error}`);
    return { networkError: error };
  }
}

export interface IUserSignUpData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  repeat_password: string;
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

const StyledWrapperDiv = styled.div<{ $isDisabled: boolean }>`
  position: absolute;
  top: 50%;
  right: 6px;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 2px;
  ${({ $isDisabled }) => $isDisabled && "pointer-events: none; opacity: 0.5; cursor: disabled;"};
`;

const StyledSmallPrintDiv = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: var(--font-size-11);
  color: var(--color-gray-text-light);
  a {
    color: var(--color-danger-800);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const renderPasswordIcons = (
  id: string,
  isDisabled: boolean,
  showPassword: boolean,
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const showOrHidePasswordText = showPassword ? "Hide password" : "Show password";
  return (
    <StyledWrapperDiv
      id={`${id}-icon`} // This is useful measuring the width of the icons wrapper span to add the correct padding-right to the input field.
      onClick={() => setShowPassword(!showPassword)}
      $isDisabled={isDisabled}
    >
      <Button
        size="large"
        appearance="link-with-background"
        iconBefore={
          showPassword ? (
            <FiEyeOff style={{ width: "16px", height: "16px" }} />
          ) : (
            <FiEye style={{ width: "16px", height: "16px" }} />
          )
        }
        tooltip={showOrHidePasswordText}
        ariaLabel={showOrHidePasswordText}
      />
    </StyledWrapperDiv>
  );
};

const SignUpPage = () => {
  const { logIn } = useAuthContext();
  const navigate = useNavigate();
  const actionData: ISignUpData | undefined = useActionData() as ISignUpData;
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  const showCorrectErrorMsg = (error: any) => {
    if (error.response.status === 409) {
      return (
        <ErrorMessage isVisible={true}>
          Email already exists. Please <Link to="/login">log in</Link>.
        </ErrorMessage>
      );
    } else {
      return <ErrorMessage isVisible={true}>An error occurred. Please try again later.</ErrorMessage>;
    }
  };

  useEffect(() => {
    const userData = actionData?.user;
    if (userData) {
      logIn(userData);
      navigate("/students");
    }
  }, [actionData?.user, navigate, logIn]);

  return (
    <StyledLoginPageWrapper>
      <Heading1 style={{ textAlign: "center" }}>Welcome to students app</Heading1>
      <StyledFormWrapper>
        <Heading2>Sign up</Heading2>
        <Form method="post">
          <Field
            id="first-name"
            label="First name"
            isRequired
            invalidFieldMessage={actionData?.errorMsgs?.first_name}
            style={{ margin: "0 0 12px 0" }}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                size="large"
                type="text"
                name="first_name"
                placeholder="Enter your first name"
                isInvalid={Boolean(actionData?.errorMsgs?.first_name)}
                isDisabled={submitting}
              />
            )}
          </Field>
          <Field
            id="last-name"
            label="Last name"
            isRequired
            invalidFieldMessage={actionData?.errorMsgs?.last_name}
            style={{ margin: "0 0 12px 0" }}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                size="large"
                type="text"
                name="last_name"
                placeholder="Enter your last name"
                isInvalid={Boolean(actionData?.errorMsgs?.last_name)}
                isDisabled={submitting}
              />
            )}
          </Field>
          <Field
            id="email"
            label="Email"
            isRequired
            invalidFieldMessage={actionData?.errorMsgs?.email}
            style={{ margin: "0 0 12px 0" }}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                size="large"
                type="email"
                name="email"
                placeholder="Enter your email"
                isInvalid={Boolean(actionData?.errorMsgs?.email)}
                isDisabled={submitting}
              />
            )}
          </Field>
          <Field
            id="password"
            label="Password"
            isRequired
            invalidFieldMessage={actionData?.errorMsgs?.password}
            style={{ margin: "0 0 12px 0" }}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                size="large"
                type="password"
                name="password"
                placeholder="Enter your password"
                isInvalid={Boolean(actionData?.errorMsgs?.password)}
                isDisabled={submitting}
                renderIcon={(isDisabled) =>
                  renderPasswordIcons("login-password", isDisabled, showPassword, setShowPassword)
                }
                passwordIsVisible={showPassword}
              />
            )}
          </Field>
          <Field
            id="repeat-password"
            label="Confirm password"
            isRequired
            invalidFieldMessage={actionData?.errorMsgs?.repeat_password}
            style={{ margin: "0 0 24px 0" }}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                size="large"
                type="password"
                name="repeat_password"
                placeholder="Enter your password again"
                isInvalid={Boolean(actionData?.errorMsgs?.repeat_password)}
                isDisabled={submitting}
                renderIcon={(isDisabled) =>
                  renderPasswordIcons("login-password", isDisabled, showPassword, setShowPassword)
                }
                passwordIsVisible={showPassword}
              />
            )}
          </Field>
          {actionData?.networkError && showCorrectErrorMsg(actionData?.networkError)}
          <Button size="large" type="submit" fullWidth isLoading={submitting} style={{ marginTop: "24px" }}>
            Sign up
          </Button>
        </Form>
        <StyledSmallPrintDiv>
          Already a member? <Link to="/login">Log in now</Link>
          <br />
          <RequiredAsterisk /> Required fields
        </StyledSmallPrintDiv>
      </StyledFormWrapper>
    </StyledLoginPageWrapper>
  );
};

export { SignUpPage, renderPasswordIcons, action, StyledSmallPrintDiv };
