import { ReactNode } from "react";
import styled from "styled-components";

interface LabelProps {
  /*
   * The `htmlFor` prop is a unique identifier for the form element that the label is associated with
   */
  htmlFor: string;
  /*
   * The content of the label
   */
  children: ReactNode;
  /*
   * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
   */
  testId?: string;
}

const LabelStyles = styled.label`
  width: fit-content;
`;

const Label = ({ htmlFor, children, ...props }: LabelProps) => {
  return (
    <LabelStyles htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyles>
  );
};

export { Label };
