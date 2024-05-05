import { FormEvent, ReactNode } from "react";
import styled from "styled-components";

interface FormProps {
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  /**
   * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
   */
  testId?: string;
}

const StyledForm = styled.form`
  width: 100%;
`;

const Form = ({ children, onSubmit, testId, ...props }: FormProps) => {
  return (
    <StyledForm onSubmit={onSubmit} data-testid={testId} {...props}>
      {children}
    </StyledForm>
  );
};

export { Form };
