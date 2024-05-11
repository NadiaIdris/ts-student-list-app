import { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

type Appearance = "primary" | "secondary" | "warning" | "link";
type Size = "medium" | "large";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  $appearance?: Appearance;
  $size?: Size;
  $fullWidth?: boolean;
  isDisabled?: boolean;
  /**
   * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
   */
  testId?: string;
  /**
   * The `style` prop specifies the style of the button. It will add the style inline. It's great to use it to add margin or padding to the button.
   */
  style?: CSSProperties;
  /**
   * The `className` prop specifies the class of the button. It will add the class to the button. It's great to use it to add margin or padding to the button.
   */
  className?: string;
}

const StyledButton = styled.button<{
  $size: Size;
  $fullWidth: boolean;
  $appearance: Appearance;
}>`
  border-radius: var(--border-radius);
  border: 1px solid transparent;
  font: inherit;
  font-weight: 900;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  height: ${({ $size }) => {
    if ($size === "medium") return "36px";
    else if ($size === "large") return "42px";
  }};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  font-size: ${({ $size }) => {
    if ($size === "medium") return "0.875rem"; // 0.875rem is ~14px
    else if ($size === "large") return "1rem"; // 1rem is ~16px
  }};
  padding: ${({ $size }) => {
    if ($size === "medium") return "0 16px";
    else if ($size === "large") return "0 24px";
  }};
  background: ${({ $appearance }) => {
    if ($appearance === "primary") return "var(--color-button-primary-bg)";
    else if ($appearance === "secondary")
      return "var(--color-button-secondary-bg)";
    else if ($appearance === "warning") return "var(--color-button-warning-bg)";
    else return "var(--color-button-default-bg)";
  }};
  color: ${({ $appearance }) => {
    if ($appearance === "primary") return "var(--color-button-primary-fg)";
    else if ($appearance === "secondary")
      return "var(--color-button-secondary-fg)";
    else if ($appearance === "warning") return "var(--color-button-warning-fg)";
    else return "var(--color-button-default-fg)";
  }};
  &:hover {
    background: ${({ $appearance }) => {
      if ($appearance === "primary")
        return "var(--color-button-primary-bg-hover)";
      else if ($appearance === "secondary")
        return "var(--color-button-secondary-bg-hover)";
      else if ($appearance === "warning")
        return "var(--color-button-warning-bg-hover)";
      else return "var(--color-button-default-bg-hover)";
    }};
    color: ${({ $appearance }) => {
      if ($appearance === "link") return "var(--text-black)";
    }};
  }
`;

const Button = ({
  children,
  type = "button",
  onClick,
  $appearance = "primary",
  $size = "medium",
  $fullWidth = false,
  isDisabled = false,
  testId,
  style,
  className,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      $appearance={$appearance}
      $size={$size}
      $fullWidth={$fullWidth}
      disabled={isDisabled}
      data-testid={testId}
      style={style}
      className={className}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export { Button };
