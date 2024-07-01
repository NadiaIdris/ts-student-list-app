import { render, screen } from "@testing-library/react";
import { Field } from "./Field";

describe("Field", () => {
  it("renders field with default props", () => {
    render(
      <Field id="test" label="First name">
        {" "}
        Tom{" "}
      </Field>
    );
    const field = screen.getByText("Tom");
    expect(field).toBeInTheDocument();
    expect(field).toHaveStyle({
      display: "flex",
      flexDirection: "column",
    });
    expect(field).toHaveTextContent("First name");
    expect(field).toHaveTextContent("Tom");
  });
});
