import { ReactNode } from "react";
import styled from "styled-components";

interface ErrorMessageProps {
  children: ReactNode | string;
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
