import { ValidationErrorItem } from "joi";
import { IUserSignUpData } from "../pages/SignUpPage";
import { logInSchema, signUpSchema, studentSchema } from "./schemas";
import { IUserLogInData } from "../pages/LogInPage/LogInPage";
import { IStudentData } from "../pages/AddStudentModal";

const formatErrorMessages = (errorDetails: ValidationErrorItem[], errorLabels: Record<string, string>) => {
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
  // Add the abortEarly option to show all the errors at once. The abortEarly option stops validation on the first error.
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
    const updatedErrorMessages = formatErrorMessages(error.details, signUpFormErrorLabels);
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

  // Format the error messages
  if (error) {
    const updatedErrorMessages = formatErrorMessages(error.details, logInFormErrorLabels);
    // Update error with the new error messages.
    error.details.forEach((detail, index) => {
      detail.message = updatedErrorMessages[index];
    });
  }
  return { error, value: value as IUserLogInData };
};

const validateStudentData = (data: IStudentData) => {
  const { error, value } = studentSchema.validate(data, { abortEarly: false });

  const studentFormErrorLabels = {
    first_name: "First name",
    last_name: "Last name",
    email: "Email",
    gender: "Gender",
    date_of_birth: "Birthday",
  };

  // Format the error messages
  if (error) {
    const updatedErrorMessages = formatErrorMessages(error.details, studentFormErrorLabels);
    // Update error with the new error messages.
    error.details.forEach((detail, index) => {
      detail.message = updatedErrorMessages[index];
    });
  }
  return { error, value: value as IStudentData };
};

export { validateSignUpForm, validateLoginForm, validateStudentData };
