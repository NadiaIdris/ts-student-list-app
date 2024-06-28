import { IUserLogInData } from "../pages/LogInPage";
import { validateLoginForm } from "./validate";

const validEmail = 'test@example.com'
const validPassword = 'password123'

describe("validateLoginForm", () => {
  it("should return undefined if login data is correctly formatted", () => {
    const validData: IUserLogInData = {
      email: validEmail,
      password: validPassword,
    };

    const { error } = validateLoginForm(validData);
    expect(error).toBeUndefined();
  });

  it("should return correct error messages if email and password are empty", () => {
    const invalidData = {
      email: "",
      password: "",
    };

    const { error } = validateLoginForm(invalidData);
    const emailErrorMsg = error?.details[0].message;
    const passwordErrorMsg = error?.details[1].message;

    expect(emailErrorMsg).toEqual("Email is not allowed to be empty");
    expect(passwordErrorMsg).toEqual("Password is not allowed to be empty");
  });

  it("should return correct error messages if email and password are too long", () => {
    const startOfEmail = "a".repeat(256);
    const invalidData = {
      email: `${startOfEmail}@gmail.com`,
      password: "a".repeat(1025),
    };

    const { error } = validateLoginForm(invalidData);
    const emailErrorMsg = error?.details[ 0 ].message;
    const passwordErrorMsg = error?.details[ 1 ].message;

    expect(emailErrorMsg).toEqual("Email length must be less than or equal to 255 characters long");
    expect(passwordErrorMsg).toEqual("Password length must be less than or equal to 1024 characters long");
  });


  it("should return correct error message if email is invalid format", () => {
    const invalidData = {
      email: "s@s",
      password: validPassword,
    };

    const { error } = validateLoginForm(invalidData);
    const emailErrorMsg = error?.details[0].message;

    expect(emailErrorMsg).toEqual("Email must be a valid email");
  });

  it("should return correct error message if password is too short", () => {
    const invalidData = {
      email: validEmail,
      password: "passw",
    };

    const { error } = validateLoginForm(invalidData);
    const passwordErrorMsg = error?.details[ 0 ].message;
    
    expect(passwordErrorMsg).toEqual("Password length must be at least 6 characters long");
  });
});
