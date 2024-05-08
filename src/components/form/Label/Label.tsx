import { ReactNode } from "react";
import styled from "styled-components";
import { Size } from "../../TextField";

interface LabelProps {
  /*
   * The `htmlFor` prop is a unique identifier for the form element that the label is associated with
   */
  htmlFor: string;
  /*
   * The content of the label
   */
  children: ReactNode;
  /**
   * The `size` prop specifies the size of the label text. The default value is "medium".
   */
  $size?: Size;
  /*
   * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
   */
  testId?: string;
}

const LabelStyles = styled.label<{ $size: Size }>`
  font-size: ${({ $size }) => ($size === "small" ? "0.875rem" : "1rem")};
  width: fit-content;
`;

const Label = ({
  htmlFor,
  children,
  $size = "medium",
  ...props
}: LabelProps) => {
  return (
    <LabelStyles htmlFor={htmlFor} $size={$size} {...props}>
      {children}
    </LabelStyles>
  );
};

export { Label };
