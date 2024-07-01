import { MouseEvent } from "react";
import styled from "styled-components";
import { HandleOptionKeyDown } from "../../../../pages/StudentEditPanel";
import { FieldSize } from "../../Field";
import { ItemsRef } from "../DropdownMenu";

interface MenuItemProps {
  itemsRef: ItemsRef;
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
  font-family: inherit;

  ${({ $size }) => { 
    if ($size === "small") return "height: var(--input-height-small); font-size: var(--font-size-14);";
    else return "height: var(--input-height-large); font-size: var(--font-size-16);";
  
}}
  
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
    box-shadow: none;
    border: 2px solid transparent;
    outline: 2px solid black;
    outline-offset: -4px; // replaces the border, when is focused.
    border-radius: var(--border-radius);
    background-color: transparent;
  }
`;

const MenuItem = ({
  itemsRef,
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
          itemsRef.current[index] = node;
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
