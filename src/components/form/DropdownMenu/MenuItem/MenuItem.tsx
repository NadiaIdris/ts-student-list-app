import { MouseEvent, KeyboardEvent } from "react";
import styled from "styled-components";
import { FieldSize } from "../../Field";
import { OptionsRef } from "../DropdownMenu";
import { HandleOptionKeyDown } from "../../../../pages/StudentPanel/StudentEditPanel";

interface MenuItemProps {
  optionsRef: OptionsRef;
  children: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onDropdownMenuItemKeyDown?: HandleOptionKeyDown;
  isDisabled?: boolean;
  size?: FieldSize;
  index: number;
}

const StyledMenuItem = styled.button<{ $size: FieldSize }>`
  padding: 0 8px;
  background-color: var(--color-white);
  border: 2px solid transparent;
  color: var(--color-button-default-fg);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: start;

  ${({ $size }) =>
    $size === "small"
      ? "font-size: var(--font-size-14); height: var(--input-height-small);"
      : "font-size: var(--font-size-16); height: var(--input-height-medium);"};
  &:hover {
    background-color: var(--color-button-secondary-bg-hover);
    color: var(--text-black);
  }
  // Last button in the group should have border-radius
  &:last-child {
    border-bottom-right-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
  }
  &:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: -4px; // replaces the border, when is focused.
    border: 2px solid transparent;
    border-radius: var(--border-radius);
  }
`;

const MenuItem = ({
  optionsRef,
  children,
  onClick,
  onDropdownMenuItemKeyDown,
  isDisabled,
  size = "medium",
  index,
}: MenuItemProps) => {

  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (event) => { 
    if (onDropdownMenuItemKeyDown) {
      onDropdownMenuItemKeyDown(event, index);
    }
  };
  return (
    <StyledMenuItem
      ref={(node) => {
        // Add this button node to optionsRef array.
        if (node) {
          optionsRef.current[index] = node;
        }
      }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      disabled={isDisabled}
      $size={size}
    >
      {children}
    </StyledMenuItem>
  );
};

export { MenuItem };