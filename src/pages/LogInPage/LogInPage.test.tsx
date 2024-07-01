import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "../../context/AuthContext";
import { LogInPage, makeUser } from "./LogInPage";
import { AxiosResponse } from "axios";
import React from "react";
import exp from "constants";

describe("LogInPage", () => {
  it("calls action function when log in button is clicked", async () => {
    let actionCalled = false;
    const testLogInAction = async function action({ request }: { request: Request }) {
      let responseObj = {
        data: {
          isAuthenticated: true,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIyNDMwOGY1MS1jNjdkLTQzYzMtOGVkZS1mZjI1NDM1NjhmNTQiLCJpYXQiOjE3MTk1MjM5NTh9.GLMSKCG7QjuKj2rqDhFwP",
          userId: "24308f51-c67d-43c3-8ede-ff2543568f53",
          firstName: "Mary",
          lastName: "Smith",
          email: "test@example.com",
        },
      };
      actionCalled = true;
      return responseObj;
    };

    const routes = [
      {
        path: "/login",
        element: <LogInPage />,
        action: testLogInAction,
      },
    ];

    const router = createMemoryRouter(routes, { initialEntries: ["/login"] });

    render(
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    );

    // Access the input fields
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i, { selector: "input" });

    // Populate email and password input fields
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput).toHaveValue("test@example.com");

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput).toHaveValue("password123");

    const button = screen.getByRole("button", { name: /log in/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
    React.act(() => button.click()); // Wrap the button click in act to get rid of the warning.

    // Waitfor local storage to have value for endpoint key
    await waitFor(() => expect(localStorage.getItem("user")).toBeNull());

    expect(actionCalled).toBe(true);
  });

  it("makeUser function generates a user correctly", () => {
    const response: AxiosResponse = {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      },
      data: {
        registered_user_uid: "24308f51-c67d-43c3-8ede-ff2543568f53",
        first_name: "Mary",
        last_name: "Smith",
        email: "test@example.com",
      },
      status: 200,
      statusText: "OK",
      config: {
        headers: {} as any, // Since we are not testing the config headers, we can use an empty object and type cast it to any
      },
    };

    const user = makeUser(response as AxiosResponse);

    expect(user).toEqual({
      isAuthenticated: true,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      userId: "24308f51-c67d-43c3-8ede-ff2543568f53",
      firstName: "Mary",
      lastName: "Smith",
      email: "test@example.com",
    });
  });
});
