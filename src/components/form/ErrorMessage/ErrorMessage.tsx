import { ReactNode } from "react";
import styled from "styled-components";

interface ErrorMessageProps {
  /**
   * The content of the error message
   */
  children: ReactNode | string;
  /**
   * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
   */
  testId?: string;
}

const StyledError = styled.div`
  color: red;
  font-size: 0.8em;
`;

const ErrorMessage = ({ children, testId }: ErrorMessageProps) => {
  return <StyledError data-testid={testId}>{children}</StyledError>;
};

export { ErrorMessage };
