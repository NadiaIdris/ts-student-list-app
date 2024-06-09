import { CSSProperties, ReactNode } from "react";
import styled from "styled-components";
import { Button } from "../../../components/Button";

interface ReadOnlyFieldProps {
  id: string;
  label: string;
  value: string;
  /**
   * Icon that will appear on the right side of the value.
   */
  icon?: ReactNode;
  /**
   * Function that will be called when the icon is clicked.
   */
  iconOnClick?: () => void;
  /**
   * Tooltip that will appear when the icon is hovered.
   */
  iconTooltip?: string;
  testId?: string;
  style?: CSSProperties;
  className?: string;
}

const StyledRow = styled.div<{ $icon: ReactNode }>`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0 32px 0 40px;
  &:hover {
    ${({ $icon }) => $icon && "background-color: var(--color-gray-400); "}
  }

  @media (max-width: 500px) {
    padding: 0 12px 0 20px;
  }

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
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-16);
  font-weight: 700;
  word-break: break-word;
`;

const ReadOnlyField = ({
  id,
  label,
  value,
  icon,
  iconOnClick,
  iconTooltip,
  testId,
  style,
  className,
}: ReadOnlyFieldProps) => {
  return (
    <StyledRow
      id={id}
      style={style}
      className={className}
      data-testid={testId}
      $icon={icon}
    >
      <StyledLabel>{label}</StyledLabel>
      <StyledValue>
        {value}
        {icon && (
          <Button
            iconBefore={icon}
            appearance="link-with-background"
            tooltip={iconTooltip}
            onClick={iconOnClick}
          />
        )}
      </StyledValue>
    </StyledRow>
  );
};

export { ReadOnlyField };
