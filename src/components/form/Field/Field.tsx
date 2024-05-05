import { ReactNode } from "react";
import styled from "styled-components";

interface FieldProps {
  children: ReactNode;
  /**
   * Label displayed above the form field.
   */
  label?: ReactNode;
  /**
   * Passed to the ID attribute of the field. This is randomly generated if it is not specified.
   */
  id?: string;
  /**
   * Specifies the name of the field. This is important for referencing the form data.
   */
  // name: string;
  /**
   * Sets whether the field is disabled. Users cannot edit or focus on the fields. If the parent form component is disabled, then the field will always be disabled.
   */
  isDisabled?: boolean;
  isInvalid?: boolean; // Boolean(state.error),
  /**
   * Sets whether the field is required for submission. Required fields are marked with a red asterisk.
   */
  isRequired?: boolean; // Boolean(props.isRequired),
  /**
   * Element displayed after the label, and after the red asterisk if field is required.
   */
  elementAfterLabel?: ReactNode;
  /**
   * Checks whether the field input is valid. This is usually used to display a message relevant to the current value using `ErrorMessage`, `HelperMessage` or `ValidMessage`.
   */
  // validate?: (
  //   value: FieldValue | undefined,
  //   formState: Object,
  //   fieldState: Meta
  // ) => string | void | Promise<string | void>;
  /**
   * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
   */
  testId?: string;
}

const StyledField = styled.div`
  background-color: yellow;
  display: flex;
  flex-direction: column;
`;

const Field = ({ children, testId, label, id }: FieldProps) => {


  return (
    <StyledField data-testid={testId}>
      {children}
    </StyledField>
  );
};

export { Field };
