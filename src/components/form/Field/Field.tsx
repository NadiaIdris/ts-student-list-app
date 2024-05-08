import { ReactNode } from "react";
import styled from "styled-components";
import { Label } from "../Label";
import { RequiredAsterisk } from "../RequiredAsterisk";
import { ErrorMessage } from "../ErrorMessage";

export type FormFieldDirection = "row" | "column";
export type FieldSize = "small" | "medium";

interface FieldProps {
  id: string;
  label: ReactNode | string;
  isRequired?: boolean;
  invalidFieldMessage?: string;
  /*
   * Form field direction.
   */
  $direction?: FormFieldDirection;
  /*
   * The size of the field.
   */
  $size?: FieldSize;
  children: ReactNode | ((fieldProps: any) => JSX.Element | null);
  /**
   * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
   */
  testId?: string;
}

const StyledField = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledWrapper = styled.div<{ $direction: FormFieldDirection }>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  ${({ $direction }) => {
    if ($direction === "row") return `align-items: center;`;
  }}
`;

const Field = ({
  id,
  label,
  isRequired = false,
  invalidFieldMessage = "",
  $direction = "column",
  $size = "medium",
  children,
  testId,
}: FieldProps) => {
  return (
    <StyledField data-testid={testId}>
      <StyledWrapper $direction={$direction}>
        <Label htmlFor={id} $direction={$direction} $size={$size}>
          {label}
          {isRequired && <RequiredAsterisk />}
        </Label>
        {typeof children === "function"
          ? children({ $direction, id, $size })
          : children}
      </StyledWrapper>
      {invalidFieldMessage && (
        <ErrorMessage $direction={$direction}>{invalidFieldMessage}</ErrorMessage>
      )}
    </StyledField>
  );
};

export { Field };
