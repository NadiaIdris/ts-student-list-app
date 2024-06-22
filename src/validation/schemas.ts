import Joi from "joi";
import { IUserSignUpData } from "../pages/SignUpPage";

const validateFirstName = Joi.string().min(1).max(100).required();
const validateLastName = Joi.string().min(2).max(100).required();
const validateEmail = Joi.string()
  .email({ tlds: { allow: false } }) // TLD (top level domain) validation is disabled
  .min(3)
  .max(255)
  .required();
const validatePassword = Joi.string().min(6).max(1024).required();
const validateGender = Joi.string();
const validateDateOfBirth = Joi.string().required();

const signUpSchema = Joi.object<IUserSignUpData>({
  first_name: validateFirstName,
  last_name: validateLastName,
  email: validateEmail,
  password: validatePassword,
  repeat_password: Joi.any().valid(Joi.ref("password")).required().messages({
    // Add custom error messages
    "any.only": "Password must match",
  }),
});

const logInSchema = Joi.object({
  email: validateEmail,
  password: validatePassword,
});

const studentSchema = Joi.object({
  first_name: validateFirstName,
  last_name: validateLastName,
  email: validateEmail,
  gender: validateGender,
  date_of_birth: validateDateOfBirth,
});

export { signUpSchema, logInSchema, studentSchema };
