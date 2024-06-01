import { ReactNode } from "react";
import styled from "styled-components";
import { FieldSize, FormFieldDirection } from "../Field";

interface LabelProps {
  /*
   * The `htmlFor` prop is a unique identifier for the form element that the label is associated with
   */
  htmlFor: string;
  /*
   * Form field direction.
   */
  direction?: FormFieldDirection;
  /*
   * The content of the label
   */
  children: ReactNode;
  /**
   * The `size` prop specifies the size of the label text. The default value is "medium".
   */
  size?: FieldSize;
  /*
   * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
   */
  testId?: string;
}

const StyledLabel = styled.label<{
  $size: FieldSize;
  $direction: FormFieldDirection;
}>`
  ${({ $size }) =>
    $size === "small"
      ? " font-size: var(--font-size-14)"
      : " font-size: var(--font-size-16)"};
  width: ${({ $direction }) =>
    $direction && ($direction === "column" ? "" : "113px")};
  min-width: ${({ $direction }) =>
    $direction && ($direction === "column" ? "fit-content" : "113px")};
`;

const Label = ({
  htmlFor,
  direction = "column",
  children,
  size = "medium",
  ...props
}: LabelProps) => {
  return (
    <StyledLabel
      htmlFor={htmlFor}
      $direction={direction}
      $size={size}
      {...props}
    >
      {children}
    </StyledLabel>
  );
};

export { Label };
