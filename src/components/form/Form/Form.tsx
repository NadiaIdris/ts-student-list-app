import { FormEvent, ReactNode } from "react";
import styled from "styled-components";

interface FormProps {
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  testId?: string;
}

const StyledForm = styled.form`
  width: 100%;
`;

const Form = ({ children, onSubmit, testId, ...props }: FormProps) => {
  return (
    <StyledForm
      onSubmit={onSubmit}
      data-testId={testId}
      {...props}
    >
      {children}
    </StyledForm>
  );
};

export { Form };
