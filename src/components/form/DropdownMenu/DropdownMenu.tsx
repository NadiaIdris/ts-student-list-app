import { ForwardedRef, forwardRef, MutableRefObject } from "react";
import styled from "styled-components";
import { HandleOptionKeyDown, HandleSelectKeyDown } from "../../../pages/StudentPanel/StudentEditPanel";
import { FieldSize } from "../Field";
import { MenuItemGroup } from "./MenuItemGroup";
import { SelectedMenuItem } from "./SelectedMenuItem";

type MenuItemsType = string[];

type ItemsRef = MutableRefObject<HTMLButtonElement[]>;
type SelectedRef = MutableRefObject<HTMLInputElement | null>;

interface RefsContainer {
  // Wrapped for use with forwardRef.
  itemsRef: ItemsRef;
  selectedRef: SelectedRef;
}

interface DropdownMenuProps {
  name?: string;
  id: string;
  isOpen: boolean;
  isDisabled?: boolean;
  menuItems: MenuItemsType;
  selectedMenuItem: string;
  /**
   * Callback function to handle the click event on the selected menu item.
   */
  onSelectedMenuItemClick: () => void;
  onDropdownMenuItemClick: (option: string) => void;
  onSelectedMenuItemKeyDown?: HandleSelectKeyDown;
  onDropdownMenuItemKeyDown?: HandleOptionKeyDown;
  size?: FieldSize;
  setSelectedGender?: React.Dispatch<React.SetStateAction<string>>;
  setGenderDropdownIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledDropDownMenu = styled.div`
  width: 100%;
  position: relative;
`;

// More info on various React ref types: https://dev.to/itswillt/demystifying-reacts-types-ref-types-28fj
const DropdownMenu = forwardRef(
  (
    {
      name,
      id,
      size = "large",
      isOpen,
      isDisabled,
      // Data
      menuItems,
      selectedMenuItem,
      // MouseEvent callbacks
      onSelectedMenuItemClick,
      onDropdownMenuItemClick,
      // KeyboardEvent callbacks
      onDropdownMenuItemKeyDown,
      onSelectedMenuItemKeyDown,
      // Function component state setters
      setSelectedGender,
      setGenderDropdownIsOpen,
    }: DropdownMenuProps,
    ref: ForwardedRef<RefsContainer>
  ) => {
    const { itemsRef: optionsRef, selectedRef } = (ref as MutableRefObject<RefsContainer>)?.current;
    return (
      <StyledDropDownMenu>
        <SelectedMenuItem
          name={name}
          id={id}
          selectedRef={selectedRef}
          isDisabled={isDisabled}
          dropdownIsOpen={isOpen}
          onSelectedMenuItemClick={onSelectedMenuItemClick}
          onSelectedMenuItemKeyDown={onSelectedMenuItemKeyDown}
          selectedMenuItem={selectedMenuItem}
          size={size}
          setSelectedGender={setSelectedGender}
          setGenderDropdownIsOpen={setGenderDropdownIsOpen}
        />
        <MenuItemGroup
          itemsRef={optionsRef}
          selectedRef={selectedRef}
          isDisabled={isDisabled}
          dropdownIsOpen={isOpen}
          menuItems={menuItems}
          onDropdownMenuItemClick={onDropdownMenuItemClick}
          onDropdownMenuItemKeyDown={onDropdownMenuItemKeyDown}
          size={size}
        />
      </StyledDropDownMenu>
    );
  }
);

export { DropdownMenu };
export type { ItemsRef, MenuItemsType, RefsContainer, SelectedRef };
