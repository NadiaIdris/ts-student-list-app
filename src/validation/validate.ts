import { ValidationErrorItem } from "joi";
import { IUserSignUpData } from "../pages/SignUpPage";
import { logInSchema, signUpSchema } from "./schemas";
import { IUserLogInData } from "../pages/LogInPage/LogInPage";

const formatErrorMessages = (
  errorDetails: ValidationErrorItem[],
  errorLabels: Record<string, string>
) => {
  const formattedErrorMessages = errorDetails.map((detail) => {
    // Get the detail.message. Replace the text in "" with the label from errorLabels.
    if (detail.context) {
      const label = errorLabels[detail.context.label!];
      return detail.message.replace(/"(.*?)"/g, label);
    }
    return detail.message;
  });
  return formattedErrorMessages;
};

const validateSignUpForm = (data: IUserSignUpData) => {
  const { error, value } = signUpSchema.validate(data, { abortEarly: false });

  const signUpFormErrorLabels = {
    first_name: "First name",
    last_name: "Last name",
    email: "Email",
    password: "Password",
    repeat_password: "Confirm password",
  };

  // Format the error messages
  if (error) {
    const updatedErrorMessages = formatErrorMessages(
      error.details,
      signUpFormErrorLabels
    );
    // Update error with the new error messages.
    error.details.forEach((detail, index) => {
      detail.message = updatedErrorMessages[index];
    });
  }

  return { error, value: value as IUserSignUpData };
};

const validateLoginForm = (data: IUserLogInData) => {
  const { error, value } = logInSchema.validate(data, { abortEarly: false });

  const logInFormErrorLabels = {
    email: "Email",
    password: "Password",
  };

  if (error) {
    const updatedErrorMessages = formatErrorMessages(
      error.details,
      logInFormErrorLabels
    );
    error.details.forEach((detail, index) => {
      detail.message = updatedErrorMessages[index];
    });
  }
  return { error, value: value as IUserLogInData };
};

export { validateSignUpForm, validateLoginForm };
