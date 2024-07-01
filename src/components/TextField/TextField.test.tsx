import { render, screen } from "@testing-library/react";
import { TextField } from "./TextField";

describe("TextField", () => {
  it("renders the TextField component with type text and default values", () => {
    // Default size is 'large', autocomplete is 'on', placeholder is empty string
    render(<TextField id="test" type="text" name="test_name" testId="textfield" />);

    const textField = screen.getByTestId("textfield");

    expect(textField).toBeInTheDocument();
    // Test html attributes
    expect(textField).toHaveAttribute("id", "test");
    expect(textField).toHaveAttribute("type", "text");
    expect(textField).toHaveAttribute("name", "test_name");
    expect(textField).toHaveAttribute("autocomplete", "on");
    // Test styles
    expect(textField).toHaveStyle({
      height: "var(--input-height-large)",
      fontSize: "var(--font-size-16)",
      borderRadius: "var(--border-radius)",
      padding: "0px 12px",
      width: "100%",
      fontFamily: "inherit",
    });
  });

  it("renders the TextField component with small size and autocomplete off", () => {
    render(<TextField id="test" type="text" name="test_name" size="small" testId="textfield" autoComplete="off" />);
    const textField = screen.getByTestId("textfield");
    // Test html attributes
    expect(textField).toHaveAttribute("autocomplete", "off");
    // Test styles
    expect(textField).toHaveStyle({
      height: "var(--input-height-small)",
      fontSize: "var(--font-size-14)",
      padding: "0px 8px",
    });
  });

  it("renders the TextField component with medium size and placeholder attribute", () => {
    render(
      <TextField
        id="test"
        type="text"
        name="test_name"
        size="medium"
        testId="textfield"
        placeholder="Your first name"
      />
    );
    const textField = screen.getByTestId("textfield");
    // Test html attributes
    expect(textField).toHaveAttribute("placeholder", "Your first name");
    // Test styles
    expect(textField).toHaveStyle({
      height: "var(--input-height-medium)",
      fontSize: "var(--font-size-16)",
      padding: "0px 8px",
    });
  });

  it("renders invalid TextField component", () => {
    render(<TextField id="test" type="text" name="test_name" testId="textfield" isInvalid />);
    const textField = screen.getByTestId("textfield");
    // Test styles
    expect(textField).toHaveStyle({
      borderColor: "var(--color-danger)",
    });
  });

  it("renders disabled TextField component", () => {
    render(<TextField id="test" type="text" name="test_name" testId="textfield" isDisabled />);
    const textField = screen.getByTestId("textfield");
    // Test html attributes
    expect(textField).toBeDisabled();
    // Test styles
    expect(textField).toHaveStyle({
      opacity: "0.5",
      cursor: "not-allowed",
    });
  });

  it("renders focused TextField component", () => {
    render(<TextField id="test" type="text" name="test_name" testId="textfield" />);
    const textField = screen.getByTestId("textfield");
    textField.focus();
    // Test styles
    expect(textField).toHaveFocus();
    expect(textField).toHaveStyle({
      border: "2px",
    });
  });
});
