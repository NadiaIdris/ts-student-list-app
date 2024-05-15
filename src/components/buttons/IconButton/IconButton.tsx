import React, {
  CSSProperties,
  forwardRef,
  MouseEventHandler,
  ReactNode,
  Ref,
} from "react";
import { Appearance, Button, Size } from "../Button";
import styled from "styled-components";

interface IconButtonProps {
  /**
   * Unique id for the button.
   */
  id?: string;
  /**
   * Adds a label to the button for users of assistive technologies.
   */
  label?: string;
  /**
   * On click handler.
   */
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * The appearance of the button.
   */
  appearance?: Appearance;
  /**
   * The size of the button.
   */
  size?: Size;
  /**
   * The icon to be displayed in the button. IMPORTANT! You must pass in style prop with width and height to
   * the icon. If you want display medium size icon, pass the icon with 14px width and height. If you
   * want display large size icon, pass the icon with 16px width and height. E.g. <MyIcon style={{ width: "16px", height: "16px" }} />
   */
  iconBefore: ReactNode;
  /**
   * Causes the button to be in a loading state.
   */
  isLoading?: boolean;
  /**
   * A `testId` prop is provided for specified elements,
   * which is a unique string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests.
   */
  testId?: string;
  /**
   * Text that will be displayed in the tooltip when hovered or focused on the button.
   * TODO: make the tooltip non optional
   */
  tooltip: string;
  /**
   * Called when the mouse is initially clicked on the element.
   */
  onMouseDown?: MouseEventHandler<HTMLElement>;

  /**
   * Called when the mouse enters the element container.
   */
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  /**
   * Called when the mouse leaves the element container.
   */
  onMouseLeave?: MouseEventHandler<HTMLElement>;
  /**
   * Handler for the mouse up event.
   */
  onMouseUp?: React.MouseEventHandler<HTMLElement>;
  /**
   * Handler called when the button gains focus.
   */
  onFocus?: React.FocusEventHandler<HTMLElement>;
  /**
   * Handler called when the button loses focus.
   */
  onBlur?: React.FocusEventHandler<HTMLElement>;
  style?: CSSProperties;
  className?: string;
}

const StyledButton = styled.button<{
  $isLoading: boolean;
  $size: Size;
  $iconBefore: ReactNode;
  $appearance: Appearance;
}>`
  border: none;
  background-color: transparent;
  border-radius: 100px;
  background-color: var(--color-black-600);
  padding: 0;
  ${({ $isLoading }) =>
    $isLoading && "pointer-events: none; cursor: progress;"};
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

// const IconButton = forwardRef<HTMLElement, IconButtonProps>(
//   (ref: Ref<HTMLElement>, props: IconButtonProps ) => {
//     const {
//       icon,
//       label,
//       testId,
//       tooltip,
//       $appearance = "link",
//       ...buttonProps
//     } = props;

//     const button = (
//       <Button $appearance={$appearance} ref={ref} {...buttonProps} />
//     );

//   }
// );

const IconButton = ({
  id,
  label,
  onClick,
  appearance = "link",
  size = "medium",
  iconBefore,
  isLoading = false,
  testId,
  tooltip,
  onMouseDown,
  onMouseEnter,
  onMouseLeave,
  onMouseUp,
  onFocus,
  onBlur,
  style,
  className,
}: IconButtonProps) => {
  return (
    <StyledButton
      id={id}
      aria-label={label}
      onClick={onClick}
      $appearance={appearance}
      $size={size}
      $isLoading={isLoading}
      $iconBefore={iconBefore}
      data-testid={testId}
      title={tooltip}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onFocus={onFocus}
      onBlur={onBlur}
      style={style}
      className={className}
    >
      <StyledIconSpan $size={size}>{iconBefore}</StyledIconSpan>
    </StyledButton>
  );
};

export { IconButton };
