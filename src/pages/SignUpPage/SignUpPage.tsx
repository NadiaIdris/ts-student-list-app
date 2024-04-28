import { useState } from "react";
import "./SignUpPage.css";
import { Link } from "react-router-dom";
import { PasswordInput } from "../../components/PasswordInput";
import { useForm, SubmitHandler } from "react-hook-form";

export interface IUserSignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignUpPage = () => {
  // TODO: Implement sign up form
  const handleOnSubmit: SubmitHandler<IUserSignUpData> = (data) => {
    console.log(data);
  };
  const [userSignUpData, setUserSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUserSignUpData>();

  return (
    <>
      <h1>Welcome to students app</h1>
      <h2>Sign in</h2>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        autoComplete="true"
      >
        <div className="form-group">
          <label htmlFor="first_name">First name*</label>
          <input
            id="first_name"
            type="text"
            placeholder="Enter your first name"
            {...register("firstName", { required: true })}
            aria-invalid={errors.firstName ? "true" : "false"}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last name*</label>
          <input
            id="last_name"
            type="text"
            placeholder="Enter your last name"
            {...register("lastName", { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
        </div>
        <PasswordInput
          onChange={(event) =>
            setUserSignUpData({
              ...userSignUpData,
              password: event.target.value,
            })
          }
          register={register}
        />
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
