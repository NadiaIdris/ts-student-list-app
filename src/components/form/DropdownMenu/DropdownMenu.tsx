import { forwardRef } from "react";
import { MenuItemGroup } from "./MenuItemGroup";
import { SelectedMenuItem } from "./SelectedMenuItem";
import styled from "styled-components";

type MenuItemsType = string[];

interface DropdownMenuProps {
  id: string;
  isOpen: boolean;
  menuItems: MenuItemsType;
  /**
   * Callback function to handle the click event on the selected menu item.
   */
  onSelectedMenuItemClick: () => void;
  selectedMenuItem: string;
}

const StyledDropDownMenu = styled.div`
  width: 100%;
`;

const DropdownMenu = forwardRef(
  (
    {
      id,
      isOpen,
      menuItems,
      onSelectedMenuItemClick,
      selectedMenuItem,
    }: DropdownMenuProps,
    ref: any
  ) => {
    const { optionsRef, selectedRef } = ref?.current;
    return (
      <StyledDropDownMenu>
        <SelectedMenuItem
          id={id}
          optionsRef={optionsRef}
          selectedRef={selectedRef}
          dropdownIsOpen={isOpen}
          onClick={onSelectedMenuItemClick}
          selectedMenuItem={selectedMenuItem}
        />
        <MenuItemGroup
          optionsRef={optionsRef}
          selectedRef={selectedRef}
          dropdownIsOpen={isOpen}
          menuItems={menuItems}
        />
      </StyledDropDownMenu>
    );
  }
);

export { DropdownMenu };
export type { MenuItemsType };
