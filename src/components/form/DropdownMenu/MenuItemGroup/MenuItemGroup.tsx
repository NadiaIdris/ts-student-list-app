import styled from "styled-components";
import { FieldSize } from "../../Field";
import { MenuItem } from "../MenuItem";
import { MenuItemsType, OptionsRef, SelectedRef } from "../DropdownMenu";

interface MenuItemGroupProps {
  optionsRef: OptionsRef
  selectedRef: SelectedRef
  isDisabled?: boolean;
  dropdownIsOpen: boolean;
  menuItems: MenuItemsType;
  onDropdownMenuItemClick: (option: string) => void;
  size?: FieldSize;
}

const StyledMenuItemGroup = styled.div`
  /* display: flex;
  flex-direction: column; */
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
`;

const MenuItemGroup = ({
  optionsRef,
  selectedRef,
  isDisabled,
  dropdownIsOpen,
  menuItems,
  size = "medium",
  onDropdownMenuItemClick,
}: MenuItemGroupProps) => {
  return (
    <>
      {dropdownIsOpen && (
        <StyledMenuItemGroup>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              isDisabled={isDisabled}
              onClick={() => onDropdownMenuItemClick(item)}
              size={size}
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
