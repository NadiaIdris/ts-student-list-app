import styled from "styled-components";
import { HandleOptionKeyDown } from "../../../../pages/StudentPanel/StudentEditPanel";
import { FieldSize } from "../../Field";
import { MenuItemsType, ItemsRef, SelectedRef } from "../DropdownMenu";
import { MenuItem } from "../MenuItem";
import { useActionData } from "react-router-dom";
import { useEffect } from "react";

interface MenuItemGroupProps {
  itemsRef: ItemsRef;
  selectedRef: SelectedRef;
  isDisabled?: boolean;
  dropdownIsOpen: boolean;
  menuItems: MenuItemsType;
  onDropdownMenuItemClick: (option: string) => void;
  onDropdownMenuItemKeyDown?: HandleOptionKeyDown;
  size?: FieldSize;
}

const StyledMenuItemGroup = styled.div`
  position: absolute;
  z-index: 5;
  width: 100%;
  border-bottom-right-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  border-top: 0;
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  border-left: 2px solid black;
  max-height: 200px;
  overflow: hidden auto;
  background-color: var(--color-white);
`;

const MenuItemGroup = ({
  itemsRef,
  selectedRef,
  isDisabled,
  dropdownIsOpen,
  menuItems,
  size = "medium",
  onDropdownMenuItemClick,
  onDropdownMenuItemKeyDown,
}: MenuItemGroupProps) => {
  return (
    <>
      {dropdownIsOpen && (
        <StyledMenuItemGroup>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              index={index}
              isDisabled={isDisabled}
              onClick={() => onDropdownMenuItemClick(item)}
              onDropdownMenuItemKeyDown={onDropdownMenuItemKeyDown}
              size={size}
              itemsRef={itemsRef}
            >
              {item}
            </MenuItem>
          ))}
        </StyledMenuItemGroup>
      )}
    </>
  );
};

export { MenuItemGroup };
