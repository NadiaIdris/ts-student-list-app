import { CSSProperties, MouseEvent, ReactNode } from "react";
import styled from "styled-components";

export type Appearance =
  | "primary"
  | "secondary"
  | "warning"
  | "link"
  | "link-with-background";
export type Size = "small" | "medium";

export interface ButtonProps {
  /**
   * aria-label attribute for accessibility. 
   */
  ariaLabel?: string;
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
  /**
   * Disables the button.
   * If the button is disabled, users cannot interact with the button: the button cannot be clicked, focused, or hovered.
   **/
  isDisabled?: boolean;
  ref?: any;
  /**
   * Displays an icon before the button text.
   * IMPORTANT! You must pass in style prop with width and height to the icon.
   * If you want display small size icon, pass the icon with 14px width and height.
   * If you want display medium size icon, pass the icon with 16px width and height.
   * E.g. <MyIcon style={{ width: "16px", height: "16px" }} />
   **/
  iconBefore?: ReactNode;
  /**
   * Displays an icon after the button text.
   * IMPORTANT! You must pass in style prop with width and height to the icon.
   * If you want display small size icon, pass the icon with 14px width and height.
   * If you want display medium size icon, pass the icon with 16px width and height.
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
  display: contents;
`;

const StyledButton = styled.button<{
  $size: Size;
  $fullWidth: boolean;
  $appearance: Appearance;
  $iconBefore: ReactNode;
  $iconAfter: ReactNode;
  $children: ReactNode;
  $isLoading: boolean;
}>`
  border-radius: ${({ $size, $iconBefore, $iconAfter, $children }) => {
    if (
      ($iconBefore || $iconAfter) &&
      !$children &&
      ($size === "small" || $size === "medium")
    )
      return "100px";
    else return "var(--border-radius)";
  }};
  position: relative;
  border: 1px solid transparent;
  font: inherit;
  font-weight: 900;
  cursor: pointer;
  height: ${({ $size, $iconBefore, $iconAfter, $children }) => {
    if (
      ($iconBefore || $iconAfter) &&
      !$children &&
      ($size === "small" || $size === "medium")
    )
      return "auto";
    else if ($size === "small") return "36px";
    else if ($size === "medium") return "42px";
  }};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  ${({ $size }) => {
    if ($size === "small")
      return "font-size: var(--font-size-14)"; // ~14px is 0.875rem
    else if ($size === "medium") return "font-size: var(--font-size-16)"; // ~16px is 1rem
  }};
  padding: ${({ $size, $iconBefore, $iconAfter, $children }) => {
    if (($iconBefore || $iconAfter) && !$children && $size === "small")
      return "4px";
    else if (($iconBefore || $iconAfter) && !$children && $size === "medium")
      return "8px";
    else if ($size === "small") return "0 16px";
    else if ($size === "medium") return "0 24px";
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
  ${({ $isLoading }) => $isLoading && "opacity: 0.6; pointer-events: none;"}

  &:hover {
    background: ${({ $appearance }) => {
      if ($appearance === "primary")
        return "var(--color-button-primary-bg-hover)";
      else if ($appearance === "secondary")
        return "var(--color-button-secondary-bg-hover)";
      else if ($appearance === "warning")
        return "var(--color-button-warning-bg-hover)";
      else if ($appearance === "link-with-background")
        return "var(--color-button-secondary-bg)";
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
          return "var(--color-button-secondary-bg)";
        else return "var(--color-button-default-bg)";
      }};
      color: ${({ $appearance }) => {
        if ($appearance === "link" || $appearance === "link-with-background")
          return "var(--color-black-700)";
      }};
    }
  }
`;

const StyledButtonText = styled.span<{
  $iconBefore: ReactNode;
  $iconAfter: ReactNode;
  $isLoading: boolean;
}>`
  ${({ $isLoading }) => $isLoading && "visibility: hidden; opacity: 0;"}
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ $iconBefore, $iconAfter }) =>
    $iconBefore || $iconAfter ? "8px" : "0"};
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
  ariaLabel,
  children,
  type = "button",
  onClick,
  appearance = "primary",
  size = "medium",
  fullWidth = false,
  isLoading = false,
  isDisabled = false,
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
        aria-label={ariaLabel}
        type={type}
        onClick={onClick && !isLoading ? onClick : undefined}
        $appearance={appearance}
        $size={size}
        $fullWidth={fullWidth}
        $iconBefore={iconBefore}
        $iconAfter={iconAfter}
        $children={children}
        $isLoading={isLoading}
        title={tooltip}
        disabled={isDisabled}
        ref={ref}
        data-testid={testId}
        {...props}
      >
        <StyledButtonText
          $iconBefore={iconBefore}
          $iconAfter={iconAfter}
          $isLoading={isLoading}
        >
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
