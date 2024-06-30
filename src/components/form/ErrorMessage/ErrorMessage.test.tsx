import { ErrorMessage } from "./ErrorMessage";
import { render, screen } from "@testing-library/react";

describe("ErrorMessage", () => {
  it("renders error message with default props", () => {
    render(<ErrorMessage>Email is not allowed to be empty</ErrorMessage>);
    const errorMessage = screen.getByText("Email is not allowed to be empty");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveStyle({
      color: "var(--color-danger)",
      fontSize: "var(--font-size-14)",
      height: "auto",
      overflow: "hidden",
      transform: "translateY(0)",
      transition: "transform 0.3s ease-in-out,max-height 0.3s ease-in-out",
    });
  });

  it("renders with direction set to 'row'", () => {
    render(<ErrorMessage direction="row">Email is not allowed to be empty</ErrorMessage>);
    const errorMessage = screen.getByText("Email is not allowed to be empty");
    expect(errorMessage).toHaveStyle({
      marginLeft: "113px",
    });
  });

  it("renders with isVisible set to false", () => {
    render(<ErrorMessage isVisible={false}>Email is not allowed to be empty</ErrorMessage>);
    const errorMessage = screen.getByText("Email is not allowed to be empty");
    expect(errorMessage).toHaveStyle({
      height: "0",
      transform: "translateY(-20px)",
    });
  });
});
