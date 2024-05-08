import { ReactNode } from "react";
import styled from "styled-components";
import { FormFieldDirection } from "../Field";

interface ErrorMessageProps {
  $direction?: FormFieldDirection;
  /**
   * The content of the error message
   */
  children: ReactNode | string;
  /**
   * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
   */
  testId?: string;
}

const StyledError = styled.div<{ $direction: FormFieldDirection }>`
  color: var(--color-danger);
  font-size: 0.8em;
  ${({ $direction }) => $direction === "row" && "margin-left: 113px;"}
`;

const ErrorMessage = ({
  $direction = "column",
  children,
  testId,
}: ErrorMessageProps) => {
  return (
    <StyledError $direction={$direction} data-testid={testId}>
      {children}
    </StyledError>
  );
};

export { ErrorMessage };
