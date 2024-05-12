import { CSSProperties, ReactNode } from "react";
import { Size } from "../Button";
import styled from "styled-components";

type Appearance = "subtle" | "secondary";

interface IconButtonProps {
  /**
   * The icon to be displayed in the button. IMPORTANT! You must pass in style prop with width and height to
   * the icon. If you want display medium size icon, pass the icon with 14px width and height. If you
   * want display large size icon, pass the icon with 16px width and height. E.g. <MyIcon style={{ width: "16px", height: "16px" }} />
   */
  icon: ReactNode;
  label: string;
  onClick: () => void;
  $appearance?: Appearance;
  $size?: Size;
  isDisabled?: boolean;
  $isLoading?: boolean;
  testId?: string;
  style?: CSSProperties;
  className?: string;
}

const StyledButton = styled.button<{
  $isDisabled: boolean;
  $isLoading: boolean;
  $size: Size;
}>`
border: none;
  background-color: transparent;
  border-radius: 100px;
  background-color: var(--color-black-600);
  width: ${({ $size }) => ($size === "medium" ? "32px" : "40px")};
  ${({ $isDisabled }) =>
    $isDisabled && "pointer-events: none; opacity: 0.5; cursor: disabled;"};
  ${({ $isLoading: $isSubmitting }) => $isSubmitting && "pointer-events: none; cursor: progress;"};
`;

const StyledIconSpan = styled.span<{ $size: Size }>`
  padding: ${({ $size }) => ($size === "medium" ? "4px" : "8px")};
  background-color: transparent;
  border-radius: 100px;
  display: flex;
  color: var(--color-black-700);
  &:hover {
    background-color: var(--color-gray-600);
    color: var(--color-black);
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const IconButton = ({
  icon,
  label,
  onClick,
  $appearance = "subtle",
  $size = "medium",
  isDisabled = false,
  $isLoading= false,
  testId,
  style,
  className,
}: IconButtonProps) => {
  return (
    <StyledButton
      onClick={onClick}
      $isDisabled={isDisabled}
      $isLoading={$isLoading}
      $size={$size}
      aria-label={label}
    >
      {!$isLoading && <StyledIconSpan $size={$size}>{icon}</StyledIconSpan>}
    </StyledButton>
  );
};

export { IconButton };
