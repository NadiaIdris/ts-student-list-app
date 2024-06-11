import { ForwardedRef, forwardRef, MutableRefObject } from "react";
import styled from "styled-components";
import { RefsContainer } from "../Dropdown/Dropdown";
import { FieldSize } from "../Field";
import { MenuItemGroup } from "./MenuItemGroup";
import { SelectedMenuItem } from "./SelectedMenuItem";

type MenuItemsType = string[];

interface DropdownMenuProps {
  id: string;
  isOpen: boolean;
  isDisabled?: boolean;
  menuItems: MenuItemsType;
  /**
   * Callback function to handle the click event on the selected menu item.
   */
  onSelectedMenuItemClick: () => void;
  selectedMenuItem: string;
  onDropdownMenuItemClick: (option: string) => void;
  size?: FieldSize;
}

const StyledDropDownMenu = styled.div`
  width: 100%;
  position: relative;
`;

// More info on various React ref types: https://dev.to/itswillt/demystifying-reacts-types-ref-types-28fj
const DropdownMenu = forwardRef(
  (
    {
      id,
      isOpen,
      isDisabled,
      menuItems,
      onSelectedMenuItemClick,
      selectedMenuItem,
      onDropdownMenuItemClick,
      size = "medium",
    }: DropdownMenuProps,
    ref: ForwardedRef<RefsContainer>
  ) => {
    const { optionsRef, selectedRef } = (ref as MutableRefObject<RefsContainer>)
      ?.current;
    return (
      <StyledDropDownMenu>
        <SelectedMenuItem
          id={id}
          optionsRef={optionsRef}
          selectedRef={selectedRef}
          isDisabled={isDisabled}
          dropdownIsOpen={isOpen}
          onClick={onSelectedMenuItemClick}
          selectedMenuItem={selectedMenuItem}
          size={size}
        />
        <MenuItemGroup
          optionsRef={optionsRef}
          selectedRef={selectedRef}
          isDisabled={isDisabled}
          dropdownIsOpen={isOpen}
          menuItems={menuItems}
          onDropdownMenuItemClick={onDropdownMenuItemClick}
          size={size}
        />
      </StyledDropDownMenu>
    );
  }
);

export { DropdownMenu };
export type { MenuItemsType };
