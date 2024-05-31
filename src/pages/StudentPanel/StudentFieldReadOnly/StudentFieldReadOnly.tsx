import { CSSProperties } from "react";
import { FieldSize, FormFieldDirection } from "../../../components/form/Field";
import styled from "styled-components";

interface StudentFieldProps {
  id: string;
  label: string;
  value: string;
  direction?: FormFieldDirection;
  size?: FieldSize;
  testId?: string;
  style?: CSSProperties;
  className?: string;
}

const StyledStudentDataRow = styled.div<{
  $direction: FormFieldDirection;
  $size: FieldSize;
}>`
  display: flex;
  align-items: center;

  @media (max-width: 400px) {
    flex-direction: ${({ $direction }) => $direction};
    align-items: stretch;
  }
`;

const StyledDataKey = styled.div`
  min-width: 120px;
  background-color: red;
`;

const StyledDataValue = styled.div`
  flex: 1;
  background-color: lightblue;
`;

const StudentFieldReadOnly = ({
  id,
  label,
  value,
  direction = "row",
  size = "medium",
}: StudentFieldProps) => {
  return (
    <StyledStudentDataRow id={id} $direction={direction} $size={size}>
      <StyledDataKey>{label}</StyledDataKey>
      <StyledDataValue>{value}</StyledDataValue>
    </StyledStudentDataRow>
  );
};

export { StudentFieldReadOnly };
