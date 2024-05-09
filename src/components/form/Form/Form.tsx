import { CSSProperties, FormEvent, ReactNode } from "react";
import styled from "styled-components";

interface FormProps {
  /*
   * The content of the form
   */
  children: ReactNode;
  /*
   * The function to call when the form is submitted
   */
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  /**
   * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
   */
  testId?: string;
    /**
   * The `style` prop specifies the style of the button. It will add the style inline. It's great to use it to add margin or padding to the button.
   */
  style?: CSSProperties;
  className?: string;
}

const StyledForm = styled.form`
  width: 100%;
`;

const Form = ({
  children,
  onSubmit,
  testId,
  style,
  className,
  ...props
}: FormProps) => {
  return (
    <StyledForm
      onSubmit={onSubmit}
      data-testid={testId}
      style={style}
      className={className}
      {...props}
    >
      {children}
    </StyledForm>
  );
};

export { Form };
