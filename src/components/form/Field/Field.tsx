import { ReactNode } from "react";
import styled from "styled-components";

export type FormFieldDirection = "row" | "column";

interface FieldProps {
  /*
   * Form field direction.
   */
  $direction?: FormFieldDirection;
  children: ReactNode;
  /**
   * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
   */
  testId?: string;
}

const StyledField = styled.div<{ $direction: FormFieldDirection }>`
  display: flex;
  ${({ $direction }) =>
    $direction &&
    ($direction === "row"
      ? "flex-direction: row; justify-content: space-between; align-items: center;"
      : "flex-direction: column;")}
`;

const Field = ({ $direction = "column", children, testId }: FieldProps) => {
  return (
    <StyledField $direction={$direction} data-testid={testId}>
      {children}
    </StyledField>
  );
};

export { Field };
