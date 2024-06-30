import { Label } from "./Label";
import { render, screen } from "@testing-library/react";

describe("Label", () => {
  it("renders label with default props", () => {
    render(<Label htmlFor="test">Test</Label>);

    const label = screen.getByText("Test");
    expect(label).toBeInTheDocument();
    expect(label).toHaveStyle({
      fontSize: "var(--font-size-16)",
      minWidth: "fit-content",
    });
  });

  it("renders small label", () => {
    render(
      <Label htmlFor="test" size="small">
        Test
      </Label>
    );

    const label = screen.getByText("Test");
    expect(label).toBeInTheDocument();
    expect(label).toHaveStyle({
      fontSize: "var(--font-size-14)",
    });
  });

  it("renders medium label with direction set to row", () => {
    render(
      <Label htmlFor="test" size="medium" direction="row">
        Test
      </Label>
    );

    const label = screen.getByText("Test");
    expect(label).toBeInTheDocument();
    expect(label).toHaveStyle({
      fontSize: "var(--font-size-16)",
      minWidth: "113px",
    });
  });

  it("renders large label", () => {
    render(
      <Label htmlFor="test" size="large">
        Test
      </Label>
    );
    const label = screen.getByText("Test");
    expect(label).toBeInTheDocument();
    expect(label).toHaveStyle({
      fontSize: "var(--font-size-16)",
      minWidth: "fit-content",
    });
  });
});
