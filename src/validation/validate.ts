import { ValidationErrorItem } from "joi";
import { IUserSignUpData } from "../pages/SignUpPage";
import { signUpSchema } from "./schemas";

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
    repeat_password: "Repeat password",
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

  return { error, value };
};

export { validateSignUpForm };