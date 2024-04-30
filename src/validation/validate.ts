import Joi, { ValidationErrorItem } from "joi";
import { IUserSignUpData } from "../pages/SignUpPage";

const formatErrorMessages = (
  errorDetails: ValidationErrorItem[],
  errorLabels: Record<string, string>
) => {
  const formattedErrorMessages = errorDetails.map((detail) => {
    // Get the detail.message. Replace the text in "" with the label from errorLabels.
    if (detail.context) {
      const label = errorLabels[ detail.context.label! ];
      // if (label === "Repeat password") return "Passwords do not match.";
      return detail.message.replace(/"(.*?)"/g, label);
    }
    return detail.message;
  });
  return formattedErrorMessages;
};

const validateSignUpForm = (data: IUserSignUpData) => {
  const signUpSchema = Joi.object<IUserSignUpData>({
    first_name: Joi.string().min(1).max(100).required(),
    last_name: Joi.string().min(2).max(100).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(3)
      .max(255)
      .required(),
    password: Joi.string().min(6).max(1024).required(),
    repeat_password: Joi.ref('password'),
  });

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
      error?.details,
      signUpFormErrorLabels
    );
    // Update error with the new error messages.
    error?.details.forEach((detail, index) => {
      detail.message = updatedErrorMessages[index];
    });
  }

  return { error, value };
};

export { validateSignUpForm };
