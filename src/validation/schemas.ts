import Joi from "joi";
import { IUserSignUpData } from "../pages/SignUpPage";

const validateEmail = Joi.string()
  .email({ tlds: { allow: false } }) // TLD (top level domain) validation is disabled
  .min(3)
  .max(255)
  .required();

const signUpSchema = Joi.object<IUserSignUpData>({
  first_name: Joi.string().min(1).max(100).required(),
  last_name: Joi.string().min(2).max(100).required(),
  email: validateEmail,
  password: Joi.string().min(6).max(1024).required(),
  repeat_password: Joi.any().valid(Joi.ref("password")).required().messages({
    // Add custom error messages
    "any.only": "Password must match",
  }),
});

const logInSchema = Joi.object({
  email: validateEmail,
  password: Joi.string().min(6).max(1024).required(),
});

const newUserSchema = Joi.object({
  first_name: Joi.string().min(1).max(100).required(),
  last_name: Joi.string().min(2).max(100).required(),
  email: validateEmail,
  gender: Joi.string(),
  date_of_birth: Joi.string().required(),
});

export { signUpSchema, logInSchema, newUserSchema };
