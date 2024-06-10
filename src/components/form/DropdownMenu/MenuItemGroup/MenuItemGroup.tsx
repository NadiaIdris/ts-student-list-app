import styled from "styled-components";
import { MenuItemsType } from "../DropdownMenu";

interface MenuItemGroupProps {
  optionsRef: HTMLButtonElement[];
  selectedRef: HTMLInputElement | null;
  dropdownIsOpen: boolean;
  menuItems: MenuItemsType;
}

const StyledMenuItemGroup = styled.div` 
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  z-index: 5;
`;

const MenuItemGroup = ({
  optionsRef,
  selectedRef,
  dropdownIsOpen,
}: MenuItemGroupProps) => {
  return (
    <>
      {dropdownIsOpen && (
        <StyledMenuItemGroup>
          <button>Item 1</button>
          <button>Item 2</button>
          <button>Item 3</button>
        </StyledMenuItemGroup>
      )}
    </>
  );
};

export { MenuItemGroup };
