import { CSSProperties, ReactNode } from "react";
import { Size } from "../Button";
import styled from "styled-components";

type Appearance = "secondary" | "link";

interface IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  $appearance?: Appearance;
  $size?: Size;
  isDisabled?: boolean;
  $isSubmitting?: boolean;
  testId?: string;
  style?: CSSProperties;
  className?: string;
}

// TODO: check all the styling
const StyledIconButton = styled.button<{
  $appearance: Appearance;
  $size: Size;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ $size }) => {
    if ($size === "medium") return "0.25rem";
    else if ($size === "large") return "0.5rem";
    else return "0.75rem";
  }};
  border: none;
  background: ${({ $appearance }) => { 
    if ($appearance === "secondary") return "var(--color-button-secondary-bg)";
    else return "transparent";
  }};
  color: ${({ $appearance }) => {
    if ($appearance === "secondary") return "var(--color-button-secondary-fg)";
    else  return "var(--color-button-default-fg)";
  }};
  cursor: pointer;
  &:hover {
    color: ${({ $appearance }) => {
      if ($appearance === "link") return "var(--color-text-black)";
    }};
  }
`;

const IconButton = ({
  icon,
  onClick,
  $appearance = "link",
  $size = "medium",
  isDisabled = false,
  $isSubmitting = false,
  testId,
  style,
  className,
}: IconButtonProps) => {
  return (
    <StyledIconButton
      onClick={onClick}
      $appearance={$appearance}
      $size={$size}
      disabled={isDisabled}
      data-testid={testId}
      style={style}
      className={className}
    >
      {icon}
    </StyledIconButton>
  );
};

export { IconButton };
