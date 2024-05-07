import { ReactNode } from "react";
import styled from "styled-components";

interface FieldProps {
  children: ReactNode;
  /**
   * Sets whether the field is disabled. Users cannot edit or focus on the fields. If the parent form component is disabled, then the field will always be disabled.
   */
  isDisabled?: boolean;
  /**
   * Sets whether the field is invalid. An invalid field is marked with a red border and the error message is displayed below the field.
   */
  isInvalid?: boolean; // Boolean(state.error),
  /**
   * Sets whether the field is required for submission. Required fields are marked with a red asterisk.
   */
  isRequired?: boolean; // Boolean(props.isRequired),
  /**
   * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
   */
  testId?: string;
}

const StyledField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Field = ({ children, testId }: FieldProps) => {
  return <StyledField data-testid={testId}>{children}</StyledField>;
};

export { Field };
