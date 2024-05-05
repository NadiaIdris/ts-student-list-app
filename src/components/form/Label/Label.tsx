import { ReactNode } from "react";
import styled from "styled-components";

interface LabelProps {
  id?: string;
  htmlFor: string;
  children: ReactNode;
  testId?: string;
}

const LabelStyles = styled.label`
  // Add your styles here
`;

const Label = ({ htmlFor, children, ...props }: LabelProps) => {
  return (
    <LabelStyles htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyles>
  );
};

export { Label };
