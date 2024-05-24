import { CSSProperties, MouseEvent, ReactNode } from "react";
import styled from "styled-components";

export type Appearance =
  | "primary"
  | "secondary"
  | "warning"
  | "link"
  | "link-with-background";
export type Size = "medium" | "large";

export interface ButtonProps {
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  appearance?: Appearance;
  size?: Size;
  fullWidth?: boolean;
  /**
   * Causes the button to be in a loading state.
   */
  isLoading?: boolean;
  ref?: any;
  /**
   * Displays an icon before the button text.
   * IMPORTANT! You must pass in style prop with width and height to the icon.
   * If you want display medium size icon, pass the icon with 14px width and height.
   * If you want display large size icon, pass the icon with 16px width and height.
   * E.g. <MyIcon style={{ width: "16px", height: "16px" }} />
   **/
  iconBefore?: ReactNode;
  /**
   * Displays an icon after the button text.
   * IMPORTANT! You must pass in style prop with width and height to the icon.
   * If you want display medium size icon, pass the icon with 14px width and height.
   * If you want display large size icon, pass the icon with 16px width and height.
   * E.g. <MyIcon style={{ width: "16px", height: "16px" }} />
   **/
  iconAfter?: ReactNode;
  tooltip?: string;
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

const ButtonWrapper = styled.div`
  display: block;
`;

const StyledButton = styled.button<{
  $size: Size;
  $fullWidth: boolean;
  $appearance: Appearance;
  $iconBefore: ReactNode;
  $children: ReactNode;
  $isLoading: boolean;
}>`
  border-radius: ${({ $size, $iconBefore, $children }) => {
    if ($iconBefore && !$children && ($size === "medium" || $size === "large"))
      return "100px";
    else return "var(--border-radius)";
  }};
  position: relative;
  border: 1px solid transparent;
  font: inherit;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ $iconBefore }) => $iconBefore && "8px"};
  height: ${({ $size, $iconBefore, $children }) => {
    if ($iconBefore && !$children && ($size === "medium" || $size === "large"))
      return "auto";
    else if ($size === "medium") return "36px";
    else if ($size === "large") return "42px";
  }};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  font-size: ${({ $size }) => {
    if ($size === "medium") return "0.875rem"; // 0.875rem is ~14px
    else if ($size === "large") return "1rem"; // 1rem is ~16px
  }};
  padding: ${({ $size, $iconBefore, $children }) => {
    if ($iconBefore && !$children && $size === "medium") return "4px";
    else if ($iconBefore && !$children && $size === "large") return "8px";
    else if ($size === "medium") return "0 16px";
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
      else if ($appearance === "link-with-background")
        return "var(--color-gray-600)";
      else return "var(--color-button-default-bg-hover)";
    }};
    color: ${({ $appearance }) => {
      if ($appearance === "link" || $appearance === "link-with-background")
        return "var(--text-black)";
    }};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    &:hover {
      background: ${({ $appearance }) => {
        if ($appearance === "primary") return "var(--color-button-primary-bg)";
        else if ($appearance === "secondary")
          return "var(--color-button-secondary-bg)";
        else if ($appearance === "warning")
          return "var(--color-button-warning-bg-hover)";
        else if ($appearance === "link-with-background")
          return "var(--color-gray-600)";
        else return "var(--color-button-default-bg)";
      }};
    }
  }
`;

const StyledButtonText = styled.span<{ $isLoading: boolean }>`
  ${({ $isLoading }) => $isLoading && "visibility: hidden; opacity: 0;"}
`;

const StyledSpinner = styled.span<{ $isLoading: boolean }>`
  ${({ $isLoading }) =>
    $isLoading &&
    `
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: auto;
    border: 4px solid transparent;
    border-top-color: var(--color-selection);
    animation: spin 1s ease infinite;
    pointer-events: none;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }`}
`;

const Button = ({
  children,
  type = "button",
  onClick,
  appearance = "primary",
  size = "medium",
  fullWidth = false,
  isLoading = false,
  ref,
  iconBefore,
  iconAfter,
  testId,
  tooltip,
  style,
  className,
  ...props
}: ButtonProps) => {
  return (
    <ButtonWrapper style={style} className={className}>
      <StyledButton
        type={type}
        onClick={onClick && !isLoading ? onClick : undefined}
        $appearance={appearance}
        $size={size}
        $fullWidth={fullWidth}
        $iconBefore={iconBefore}
        $children={children}
        $isLoading={isLoading}
        title={tooltip}
        disabled={isLoading}
        ref={ref}
        data-testid={testId}
        {...props}
      >
        <StyledButtonText $isLoading={isLoading}>
          {iconBefore}
          {children}
          {iconAfter}
        </StyledButtonText>
        <StyledSpinner $isLoading={isLoading} />
      </StyledButton>
    </ButtonWrapper>
  );
};

export { Button };
