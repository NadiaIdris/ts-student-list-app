import { ForwardedRef, forwardRef, MutableRefObject } from "react";
import styled from "styled-components";
import { FieldSize } from "../Field";
import { MenuItemGroup } from "./MenuItemGroup";
import { SelectedMenuItem } from "./SelectedMenuItem";

type MenuItemsType = string[];

type OptionsRef = MutableRefObject<HTMLButtonElement[]>;
type SelectedRef = MutableRefObject<HTMLInputElement | null>;

interface RefsContainer {
  // Wrapped for use with forwardRef.
  optionsRef: OptionsRef;
  selectedRef: SelectedRef;
}

interface DropdownMenuProps {
  id: string;
  isOpen: boolean;
  isDisabled?: boolean;
  menuItems: MenuItemsType;
  /**
   * Callback function to handle the click event on the selected menu item.
   */
  onSelectedMenuItemClick: () => void;
  onSelectedMenuItemKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  selectedMenuItem: string;
  onDropdownMenuItemClick: (option: string) => void;
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
      id,
      isOpen,
      isDisabled,
      menuItems,
      onSelectedMenuItemClick,
      onSelectedMenuItemKeyDown,
      selectedMenuItem,
      onDropdownMenuItemClick,
      size = "medium",
      setSelectedGender,
      setGenderDropdownIsOpen
    }: DropdownMenuProps,
    ref: ForwardedRef<RefsContainer>
  ) => {
    const { optionsRef, selectedRef } = (ref as MutableRefObject<RefsContainer>)?.current;
    return (
      <StyledDropDownMenu>
        <SelectedMenuItem
          id={id}
          optionsRef={optionsRef}
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
export type { MenuItemsType, OptionsRef, RefsContainer, SelectedRef };
