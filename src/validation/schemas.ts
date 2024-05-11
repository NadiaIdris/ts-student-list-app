import Joi from "joi";
import { IUserSignUpData } from "../pages/SignUpPage";

const signUpSchema = Joi.object<IUserSignUpData>({
  first_name: Joi.string().min(1).max(100).required(),
  last_name: Joi.string().min(2).max(100).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(3)
    .max(255)
    .required(),
  password: Joi.string().min(6).max(1024).required(),
  repeat_password: Joi.any().valid(Joi.ref("password")).required().messages({
    // Add custom error messages
    "any.only": "Password must match",
  }),
});

const logInSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(3)
    .max(255)
    .required(),
  password: Joi.string().min(6).max(1024).required(),
});

export { signUpSchema, logInSchema };
