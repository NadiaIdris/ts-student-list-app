import { MouseEvent, MutableRefObject, useRef, useState } from "react";
import styled from "styled-components";
import { HandleOptionKeyDown, HandleSelectKeyDown } from "../../../pages/StudentEditPanel";
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
  isDisabled?: boolean;
  menuItems: MenuItemsType;
  defaultSelectedMenuItem?: string;
  size?: FieldSize;
}

const StyledDropDownMenu = styled.div`
  width: 100%;
  position: relative;
`;

// More info on various React ref types: https://dev.to/itswillt/demystifying-reacts-types-ref-types-28fj
const DropdownMenu = ({
  name,
  id,
  size = "large",
  isDisabled,
  menuItems,
  defaultSelectedMenuItem = "",
}: DropdownMenuProps) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(defaultSelectedMenuItem);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  // Refs for the selects and options.
  const genderItemsRef: ItemsRef = useRef([] as HTMLButtonElement[]);
  const genderSelectedRef: SelectedRef = useRef(null);
  let container: RefsContainer = {
    itemsRef: genderItemsRef,
    selectedRef: genderSelectedRef,
  };
  const genderRefsObj = useRef(container);

  const scrollToSelectedMenuItem = () => {
    /* Find index is assuming that there is only one instance of a string in an array. If more
      than one instance of the same string, the findIndex method returns the index of the first match.  */
    const selectedOptionIndex = menuItems.findIndex((menuItem) => menuItem === selectedMenuItem);
    // Add a timeout to make sure async setGenderDropdownIsOpen is called first and then our setTimeout is called next from the JS event loop.
    setTimeout(() => {
      if (genderItemsRef.current[selectedOptionIndex]) {
        genderItemsRef.current[selectedOptionIndex].focus();
        genderItemsRef.current[selectedOptionIndex].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }, 0);
  };

  const handleSelectedMenuItemClick = (event: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    event.preventDefault();
    // Prevent propagating of the click event to outer elements in the container.
    event.stopPropagation();

    setDropdownIsOpen((prev) => {
      if (!prev) scrollToSelectedMenuItem();
      genderSelectedRef.current?.focus();
      return !prev;
    });
  };

  const handleDropdownMenuItemClick = (item: string) => {
    setSelectedMenuItem(item);
    setDropdownIsOpen((prev) => !prev);
    genderSelectedRef.current?.focus();
  };

  const handleSelectedMenuItemKeyDown: HandleSelectKeyDown = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.key === "Enter") {
      setDropdownIsOpen((prev) => {
        if (!prev) scrollToSelectedMenuItem();
        return !prev;
      });
    }

    if (dropdownIsOpen) {
      if (event.key === "ArrowDown") {
        let button = genderItemsRef.current[0];
        button?.focus();
      }

      if (event.key === "Escape") {
        setDropdownIsOpen(false);
      }
    }
  };

  const handleDropdownMenuItemKeyDown: HandleOptionKeyDown = (event, index) => {
    event.preventDefault();
    // event.stopPropagation();
    const optionsLength = genderItemsRef.current.length;

    if (event.key === "Enter") {
      const item = genderItemsRef.current[index].textContent;
      if (item) setSelectedMenuItem(item);
      setDropdownIsOpen(false);
      genderSelectedRef.current?.focus();
    }

    if (event.key === "ArrowDown") {
      const lastMenuItemIdx = optionsLength - 1;
      if (index < lastMenuItemIdx) {
        genderItemsRef.current[index + 1].focus();
      }
    }

    if (event.key === "ArrowUp") {
      if (index > 0) genderItemsRef.current[index - 1].focus();
      if (index === 0) genderSelectedRef.current?.focus();
    }

    if (event.key === "Escape") {
      setDropdownIsOpen(false);
      if (genderSelectedRef.current) genderSelectedRef.current?.focus();
    }

    // TODO: implement custom Tab behavior following the behavior of ArrowDown and ArrowUp.
  };

  return (
    <StyledDropDownMenu>
      <SelectedMenuItem
        name={name}
        id={id}
        ref={genderRefsObj}
        isDisabled={isDisabled}
        dropdownIsOpen={dropdownIsOpen}
        onSelectedMenuItemClick={handleSelectedMenuItemClick}
        onSelectedMenuItemKeyDown={handleSelectedMenuItemKeyDown}
        selectedMenuItem={selectedMenuItem}
        size={size}
        setSelectedMenuItem={setSelectedMenuItem}
      />
      <MenuItemGroup
        ref={genderRefsObj}
        isDisabled={isDisabled}
        dropdownIsOpen={dropdownIsOpen}
        menuItems={menuItems}
        onDropdownMenuItemClick={handleDropdownMenuItemClick}
        onDropdownMenuItemKeyDown={handleDropdownMenuItemKeyDown}
        size={size}
      />
    </StyledDropDownMenu>
  );
};

export { DropdownMenu };
export type { ItemsRef, MenuItemsType, RefsContainer, SelectedRef };
