import Joi, { ValidationErrorItem } from "joi";
import { IUserSignUpData } from "../pages/SignUpPage";

const getFormattedErrorMessage = (errorType: string, errorLabel: string) => {
  switch (errorType) { 
    case "string.base":
      return `Please enter ${errorLabel} in alphanumerics`;
    case "string.empty":
      return `Please enter ${errorLabel}`;
    case "string.min":
      return `Please `;
  }
  "string.base": `{#label} should be a type of 'text'`,
  "string.empty": `{#label} should not be empty`,
  "string.min": `{#label} should have a minimum length of {#limit}`,
  "string.max": `{#label} should have a maximum length of {#limit}`,
  "string.email": `Please enter a valid email address`,
  "any.required": `{#label} is required`,
  return '';
};

const formatErrorMessages = (errorDetails: ValidationErrorItem[] | undefined, errorLabels: Record<string, string>) => { 
  // Loop over errorDetails array. For each message
  const formattedErrorMessages = errorDetails?.map(detail => { 
    if (detail.context) { 
      const label = errorLabels[ detail.context.label! ];
      detail.message = getFormattedErrorMessage(detail.type, label)
    }
  })
  return formatErrorMessages;
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
  });

  const { error, value } = signUpSchema.validate(data, { abortEarly: false });

  const errorLabels = {
    first_name: "first name",
    last_name: "last name",
    email: "email",
    password: "password",
  };
  // Format the error messages
  const updatedErrorMessages = formatErrorMessages(error?.details, errorLabels);
  // Update error with the new error messages.
  error?.details.forEach((detail, index) => { 
    detail.message = updatedErrorMessages[ index ];
  })
  return { error, value };
};

export { validateSignUpForm };
