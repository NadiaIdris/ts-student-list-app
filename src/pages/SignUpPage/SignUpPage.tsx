import { useState } from "react";
import "./SignUpPage.css";
import { Link } from "react-router-dom";
import { PasswordInput } from "../../components/PasswordInput";
import { validateSignUpForm } from "../../validation/validate";

export interface IUserSignUpData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const SignUpPage = () => {
  const [formData, setFormData] = useState<IUserSignUpData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Validate the user sign up data
    // const errors = validateForm(signUpSchema, formData);
    const { error, value } = validateSignUpForm(formData);
    console.log("name:   ", error?.name);
    console.log("details: ", error?.details);
    console.log("details[0].message:   ", error?.details[ 0 ].message);
    console.log("details[0].path:   ", error?.details[ 0 ].path)
    console.log("details[0].type:  ", error?.details[ 0 ].type);
    console.log("details[0].context:   ", error?.details[ 0 ].context);
    console.log("details[0].context.key:  ", error?.details[ 0 ].context?.key);
    console.log("details[0].context.label:   ", error?.details[ 0 ].context?.label);
    console.log("details[0].context.value:   ", error?.details[ 0 ].context?.value);
    console.log("value:  ", value);

    // Send the user sign up data to the server
    console.log("Sign up form submitted");
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };
  return (
    <>
      <h1>Welcome to students app</h1>
      <h2>Sign in</h2>
      <form onSubmit={handleOnSubmit} autoComplete="true">
        <div className="form-group">
          <label htmlFor="firstName">First name*</label>
          <input
            id="first_name"
            type="text"
            placeholder="Enter your first name"
            value={formData.first_name}
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last name*</label>
          <input
            id="last_name"
            type="text"
            placeholder="Enter your last name"
            value={formData.last_name}
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleOnChange}
          />
        </div>
        <PasswordInput value={formData.password} onChange={handleOnChange} />
        <button type="submit">Sign up</button>
      </form>
      <div>
        <p>
          Already a member? <Link to="/login">Log in now</Link>
        </p>
        <p>* Required fields</p>
      </div>
    </>
  );
};

export { SignUpPage };
