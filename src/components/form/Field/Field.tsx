import { CSSProperties, ReactNode } from "react";
import styled from "styled-components";
import { ErrorMessage } from "../ErrorMessage";
import { Label } from "../Label";
import { RequiredAsterisk } from "../RequiredAsterisk";

type Direction = "row" | "column";
type FieldSize = "small" | "medium" | "large";

interface FieldProps {
  id: string;
  label: ReactNode | string;
  isRequired?: boolean;
  invalidFieldMessage?: string;
  /**
   * Form field direction.
   */
  direction?: Direction;
  /**
   * The size of the field.
   */
  size?: FieldSize;
  children: ReactNode | ((fieldProps: any) => JSX.Element | null);
  /**
   * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
   */
  testId?: string;
  /**
   * The `style` prop specifies the style of the field. It will add the style inline. It's great to
   * use it to add margin or padding to the field.
   */
  style?: CSSProperties;
  className?: string;
}

const StyledLabelWrapper = styled.div<{ $direction: Direction }>`
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
  direction = "column",
  size = "large",
  children,
  testId,
  style,
  className,
  ...props
}: FieldProps) => {
  return (
    <div data-testid={testId} style={style} className={className} {...props}>
      <StyledLabelWrapper $direction={direction}>
        <Label htmlFor={id} direction={direction} size={size}>
          {label}
          {isRequired && <RequiredAsterisk />}
        </Label>
        {typeof children === "function" ? children({ direction, id, size }) : children}
      </StyledLabelWrapper>
      {invalidFieldMessage && (
        <ErrorMessage direction={direction} isVisible={Boolean(invalidFieldMessage)}>
          {invalidFieldMessage}
        </ErrorMessage>
      )}
    </div>
  );
};

export { Field };
export type { Direction, FieldSize };
