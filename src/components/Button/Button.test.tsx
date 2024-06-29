import { render, fireEvent, screen } from "@testing-library/react";
import { Button, ButtonProps } from "./Button";
import { FiEye } from "react-icons/fi";

const repeatingStyles = {
  borderRadius: "var(--border-radius)",
  border: "transparent",
  font: "inherit",
  fontWeight: "700",
  cursor: "pointer",
};

describe("Button", () => {
  const defaultProps: ButtonProps = {
    active: false,
    onClick: jest.fn(),
    type: "button",
    appearance: "primary",
    size: "large",
    fullWidth: false,
    isLoading: false,
    isDisabled: false,
  };

  it("renders default button", () => {
    render(<Button {...defaultProps}>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
    expect(button).not.toBeDisabled();
    expect(button).toHaveStyle({
      ...repeatingStyles,
      height: "var(--input-height-large)", // Large size
      width: "auto", // It means not full width
      fontSize: "var(--font-size-16)",
      padding: "0px 25px",
      background: "var(--color-button-primary-bg)",
    });
    expect(button).not.toHaveStyle({
      opacity: "0.6", // Loading has opacity 0.6
      position: "relative", // Loading has position relative
    });
  });

  it("renders a small secondary, full width, type submit button", () => {
    render(
      <Button size="small" appearance="secondary" type="submit" fullWidth>
        Click me
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveStyle({
      ...repeatingStyles,
      height: "var(--input-height-small)", // Small size
      width: "100%", // It means full width
      fontSize: "var(--font-size-14)",
      padding: "0px 12px",
      background: "var(--color-button-secondary-bg)",
    });
  });

  it("renders a medium warning button with type reset", () => {
    render(
      <Button size="medium" appearance="warning" type="reset">
        Click me
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveStyle({
      ...repeatingStyles,
      height: "var(--input-height-medium)", // Medium size
      width: "auto", // It means not full width
      fontSize: "var(--font-size-16)",
      padding: "0px 16px",
      background: "var(--color-button-warning-bg)",
    });
  });

  it("renders a large link-with-background button", () => {
    render(
      <Button size="large" appearance="link-with-background">
        Click me
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveStyle({
      ...repeatingStyles,
      height: "var(--input-height-large)", // Large size
      width: "auto", // It means not full width
      fontSize: "var(--font-size-16)",
      padding: "0px 25px",
      background: "var(--color-button-secondary-bg)",
    });
  });

  it("renders a large link button", () => {
    render(
      <Button size="large" appearance="link">
        Click me
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveStyle({
      ...repeatingStyles,
      height: "var(--input-height-large)", // Large size
      width: "auto", // It means not full width
      fontSize: "var(--font-size-16)",
      padding: "0px 25px",
      background: "var(--color-button-default-bg)",
    });
  });

  it("renders an icon button with small background", () => {
    render(<Button size="small" iconBefore={<FiEye />} />);
    const icon = screen.getByRole("button");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle({
      height: "auto",
      width: "auto",
      padding: "4px",
    });
  });

  it("renders an icon button with medium background", () => {
    render(<Button size="medium" iconBefore={<FiEye />} />);
    const icon = screen.getByRole("button");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle({
      height: "auto",
      width: "auto",
      padding: "8px",
    });
  });

  it("calls the onClick event handler when clicked", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled", () => {
    render(<Button isDisabled>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("is disabled when isLoading", () => {
    render(<Button isLoading>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("renders icon before the text", () => {
    render(<Button iconBefore={<FiEye data-testid="icon-before" />}>Click me</Button>);
    const icon = screen.getByTestId("icon-before");
    expect(icon).toBeInTheDocument();
  });

  it("renders icon after the text", () => {
    render(<Button iconAfter={<FiEye data-testid="icon-after" />}>Click me</Button>);
    const icon = screen.getByTestId("icon-after");
    expect(icon).toBeInTheDocument();
  });

  it("renders icons both before and after the text", () => {
    render(
      <Button iconBefore={<FiEye data-testid="icon-before" />} iconAfter={<FiEye data-testid="icon-after" />}>
        Click me
      </Button>
    );
    const iconBefore = screen.getByTestId("icon-before");
    const iconAfter = screen.getByTestId("icon-after");
    expect(iconBefore).toBeInTheDocument();
    expect(iconAfter).toBeInTheDocument();
  });
});
