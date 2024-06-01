import { CSSProperties } from "react";
import { FieldSize } from "../../../components/form/Field";
import styled from "styled-components";

interface StudentFieldProps {
  id: string;
  label: string;
  value: string;
  size?: FieldSize;
  testId?: string;
  style?: CSSProperties;
  className?: string;
}

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const StyledLabel = styled.div`
  min-width: 113px;
  background-color: red;
`;

const StyledValue = styled.div`
  flex: 1 1 auto;
  background-color: lightblue;
  height: var(--input-height-medium);
  display: flex;
  align-items: center;
`;

const StudentFieldReadOnly = ({
  id,
  label,
  value,
  size = "medium",
}: StudentFieldProps) => {
  return (
    <StyledRow id={id}>
      <StyledLabel>{label}</StyledLabel>
      <StyledValue>{value}</StyledValue>
    </StyledRow>
  );
};

export { StudentFieldReadOnly };
