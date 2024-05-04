import { ReactNode, useMemo } from "react";
import { Label } from "../Label";
import styled from "styled-components";
import { uid } from 'react-uid';

interface FieldProps {
  children: ReactNode;
  testId?: string;
  label?: string;
  id?: string;
  name: string; // Form field name. This is the key that will be used to identify the field in the form data.
  isDisabled?: boolean;
  isInvalid?: boolean;  // Boolean(state.error),
  isRequired?: boolean; // Boolean(props.isRequired),
}

const StyledField = styled.div`
  background-color: yellow;
`;

const Field = ({ children, testId, label, id, name }: FieldProps) => {
  // If fieldId is not provided, generate a unique id
  const fieldId = useMemo(
    () => (id ? id : `${name}-${uid({ id: name })}`),
    [id, name],
  );

  return (
    <StyledField data-testId={testId}>
      {label && <Label htmlFor={fieldId}>{label}</Label>}
      {children}
    </StyledField>
  );
};

export { Field };
