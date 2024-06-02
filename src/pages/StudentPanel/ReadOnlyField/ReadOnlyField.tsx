import { CSSProperties } from "react";
import styled from "styled-components";
import { Button } from "../../../components/buttons/Button";
import { MdContentCopy } from "react-icons/md";

interface StudentFieldProps {
  id: string;
  label: string;
  value: string;
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
  font-size: var(--font-size-16);
`;

const StyledValue = styled.div`
  flex: 1 1 auto;
  height: var(--input-height-medium);
  display: flex;
  align-items: center;
  font-size: var(--font-size-16);
  font-weight: 700;
`;

const ReadOnlyField = ({
  id,
  label,
  value,
  testId,
  style,
  className,
}: StudentFieldProps) => {
  return (
    <StyledRow id={id} style={style} className={className} data-testid={testId}>
      <StyledLabel>{label}</StyledLabel>
      <StyledValue>
        {value}
        {/* <Button iconBefore={<MdContentCopy style={{ width: "16px", height: "16px" }}/>} /> */}
      </StyledValue>
    </StyledRow>
  );
};

export { ReadOnlyField };
