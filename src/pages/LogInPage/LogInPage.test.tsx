import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "../../context/AuthContext";
import { LogInPage } from "./LogInPage";

describe("LogInPage", () => {
  it("renders the LogInPage", async () => {
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
      return responseObj;
    };

    const router = createMemoryRouter([
      {
        path: "/",
        element: <LogInPage />,
        action: testLogInAction,
      },
      {
        path: "/students/",
        element: <div>Students</div>,
      },
    ]);

    render(
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    );

    // Populating the input fields
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i, { selector: "input" });

    // Add email and password to the input fields
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(emailInput).toHaveValue("test@example.com");

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput).toHaveValue("password123");

    const button = screen.getByRole("button", { name: /log in/i });
    expect(button).toBeInTheDocument();
    button.click();

    expect(await screen.findByText(/students/i)).toBeInTheDocument();
  });
});
