import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LOGIN_ENDPOINT, SIGNUP_ENDPOINT } from "../../api/apiConstants";
import { axiosInstance } from "../../api/axiosConfig";
import { Button } from "../../components/buttons/Button";
import { ErrorMessage } from "../../components/form/ErrorMessage";
import { Field, FieldSize } from "../../components/form/Field";
import { Form } from "../../components/form/Form";
import { RequiredAsterisk } from "../../components/form/RequiredAsterisk";
import { Heading1 } from "../../components/text/Heading1";
import { Heading2 } from "../../components/text/Heading2";
import { TextField } from "../../components/TextField";
import { useAuthContext } from "../../hooks/useAuthContext";
import { validateSignUpForm } from "../../validation/validate";

export interface IUserSignUpData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  repeat_password: string;
}

interface IShowSignUpErrorMsg {
  showErrorMsg: boolean;
  errorMsg: JSX.Element | null;
}

const defaultUserSignUpData = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  repeat_password: "",
};

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

const StyledAlreadyAMemberDiv = styled.div`
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

const SignUpPage = () => {
  const [userSignUpData, setUserSignUpData] = useState<IUserSignUpData>(
    defaultUserSignUpData
  );
  const [errors, setErrors] = useState<IUserSignUpData>(defaultUserSignUpData);
  const [showSignUpErrorMsg, setShowSignUpErrorMsg] =
    useState<IShowSignUpErrorMsg>({
      showErrorMsg: false,
      errorMsg: null,
    });
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { logIn } = useAuthContext();

  const showCorrectErrorMsg = (error: any) => {
    if (error.response.status === 409) {
      return (
        <ErrorMessage $isVisible={true}>
          Email already exists. Please <Link to="/login">log in</Link>.
        </ErrorMessage>
      );
    } else {
      return (
        <ErrorMessage $isVisible={true}>
          An error occurred. Please try again later.
        </ErrorMessage>
      );
    }
  };

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Trim the white spaces from all the form data
    const trimmedFormData = Object.keys(userSignUpData).reduce(
      (acc, key) => ({
        ...acc,
        [key]: userSignUpData[key as keyof IUserSignUpData].trim(),
      }),
      defaultUserSignUpData
    );
    // Validate the user sign up data
    const { error } = validateSignUpForm(trimmedFormData);

    if (error) {
      // Make an object with the error messages
      const errorMsgs = error.details.reduce((acc, detail) => {
        const key = detail.context?.key;
        if (key) {
          return {
            ...acc,
            [key]: detail.message,
          };
        }
        return acc;
      }, defaultUserSignUpData);

      setErrors({ ...errorMsgs });
      // Don't continue with the sign up process if there are errors.
      return;
    } else {
      // If no errors, clear the errors
      setErrors(defaultUserSignUpData);
    }

    // Delete the repeat_password key from the formData
    const formDataWithoutRepeatPassword = { ...trimmedFormData };
    delete (formDataWithoutRepeatPassword as Partial<IUserSignUpData>)
      .repeat_password;

    //Send the user data to the server if there are no errors
    try {
      setSubmitting(true);
      await axiosInstance.post(SIGNUP_ENDPOINT, formDataWithoutRepeatPassword, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Clear the form
      setUserSignUpData(defaultUserSignUpData);

      try {
        const userLogInDetails = {
          email: trimmedFormData.email,
          password: trimmedFormData.password,
        };
        // Automatically log in the user after signing up
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
        logIn(user);

        navigate("/students/");
      } catch (error: any) {
        console.error(error);
      }
    } catch (error: any) {
      const errorMsg = showCorrectErrorMsg(error);
      setShowSignUpErrorMsg({ showErrorMsg: true, errorMsg });
    } finally {
      setSubmitting(false);
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserSignUpData({
      ...userSignUpData,
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

  return (
    <StyledLoginPageWrapper>
      <Heading1 style={{ textAlign: "center" }}>
        Welcome to students app
      </Heading1>
      <StyledFormWrapper>
        <Heading2>Sign up</Heading2>
        <Form onSubmit={handleOnSubmit}>
          <Field
            id="first-name"
            label="First name"
            isRequired
            invalidFieldMessage={errors.first_name}
            style={{ margin: "0 0 12px 0" }}
          >
            {(inputProps) => (
              <TextField
                type="text"
                name="first_name"
                value={userSignUpData.first_name}
                onChange={handleOnChange}
                placeholder="Enter your first name"
                $isInvalid={Boolean(errors.first_name)}
                isDisabled={submitting}
                {...inputProps}
              />
            )}
          </Field>
          <Field
            id="last-name"
            label="Last name"
            isRequired
            invalidFieldMessage={errors.last_name}
            style={{ margin: "0 0 12px 0" }}
          >
            {(inputProps) => (
              <TextField
                type="text"
                name="last_name"
                value={userSignUpData.last_name}
                onChange={handleOnChange}
                placeholder="Enter your last name"
                $isInvalid={Boolean(errors.last_name)}
                isDisabled={submitting}
                {...inputProps}
              />
            )}
          </Field>
          <Field
            id="email"
            label="Email"
            isRequired
            invalidFieldMessage={errors.email}
            style={{ margin: "0 0 12px 0" }}
          >
            {(inputProps) => (
              <TextField
                type="email"
                name="email"
                value={userSignUpData.email}
                onChange={handleOnChange}
                placeholder="Enter your email"
                $isInvalid={Boolean(errors.email)}
                isDisabled={submitting}
                {...inputProps}
              />
            )}
          </Field>
          <Field
            id="password"
            label="Password"
            isRequired
            invalidFieldMessage={errors.password}
            style={{ margin: "0 0 12px 0" }}
          >
            {(inputProps) => (
              <TextField
                type="password"
                name="password"
                value={userSignUpData.password}
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
          <Field
            id="repeat-password"
            label="Confirm password"
            isRequired
            invalidFieldMessage={errors.repeat_password}
            style={{ margin: "0 0 12px 0" }}
          >
            {(inputProps) => (
              <TextField
                type="password"
                name="repeat_password"
                value={userSignUpData.repeat_password}
                onChange={handleOnChange}
                placeholder="Enter your password again"
                $isInvalid={Boolean(errors.repeat_password)}
                isDisabled={submitting}
                renderIcon={(isDisabled, $size) =>
                  passwordIcons("login-password", isDisabled, $size)
                }
                showPassword={showPassword}
                {...inputProps}
              />
            )}
          </Field>
          {showSignUpErrorMsg.showErrorMsg && showSignUpErrorMsg.errorMsg}
          <Button
            type="submit"
            fullWidth
            isLoading={submitting}
            style={{ marginTop: "24px" }}
          >
            Sign up
          </Button>
        </Form>
        <StyledAlreadyAMemberDiv>
          Already a member? <Link to="/login">Log in now</Link>
          <br />
          <RequiredAsterisk /> Required fields
        </StyledAlreadyAMemberDiv>
      </StyledFormWrapper>
    </StyledLoginPageWrapper>
  );
};

export { SignUpPage };
