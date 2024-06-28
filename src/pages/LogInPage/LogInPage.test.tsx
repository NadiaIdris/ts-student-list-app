import "@testing-library/jest-dom";
import mockAxios from "jest-mock-axios";
import { render, screen, waitFor } from "@testing-library/react";
import { LogInPage, action as logInAction } from "./LogInPage";
import { AuthContextProvider, IUser } from "../../context/AuthContext";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});

it("renders the LogInPage", async () => {
  const router = createMemoryRouter([
    {
      path: "/",
      element: <LogInPage />,
      action: logInAction,
    },
    {
      path: "/login",
      element: <LogInPage />,
      action: logInAction,
    },
  ]);

  render(
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );

  const button = screen.getByRole("button", { name: /log in/i });
  expect(button).toBeInTheDocument();
  button.click();

  // simulating a server response
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
  mockAxios.mockResponse(responseObj);
});
