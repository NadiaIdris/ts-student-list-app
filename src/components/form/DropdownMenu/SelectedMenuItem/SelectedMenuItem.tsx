import { ForwardedRef, forwardRef, MouseEvent, MutableRefObject } from "react";
import { CgClose } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";
import styled from "styled-components";
import { HandleSelectKeyDown } from "../../../../pages/StudentEditPanel";
import { Button } from "../../../Button";
import { FieldSize } from "../../Field";
import { RefsContainer } from "../DropdownMenu";

interface SelectedMenuItemProps {
  name?: string;
  id: string;
  isDisabled?: boolean;
  placeholder?: string;
  dropdownIsOpen: boolean;
  onSelectedMenuItemClick: (event: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  onSelectedMenuItemKeyDown: HandleSelectKeyDown;
  /**
   * The `size` prop specifies the size of the input field. The default value is "medium".
   */
  size?: FieldSize;
  selectedMenuItem: string;
  setSelectedMenuItem: React.Dispatch<React.SetStateAction<string>>;
}

const StyledInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{ $size: FieldSize; $dropdownIsOpen: boolean }>`
  font-family: "Poppins", sans-serif;
  ${({ $size }) => {
    if ($size === "small")
      return "height: var(--input-height-small); font-size: var(--font-size-14);"; // ~14px is 0.875rem
    else if ($size === "medium")
      return "height: var(--input-height-medium); font: var(--font-size-16);"; // ~16px is 1rem
    else return "height: var(--input-height-large); font: var(--font-size-16);"; // ~16px is 1rem
  }}
  cursor: pointer;
  border-top-right-radius: var(--border-radius);
  border-top-left-radius: var(--border-radius);
  ${({ $dropdownIsOpen }) =>
    $dropdownIsOpen
      ? "border-bottom-left-radius: 0; border-bottom-right-radius: 0;"
      : "border-bottom-left-radius: var(--border-radius); border-bottom-right-radius: var(--border-radius);"}

  width: 100%;
  border: var(--border);
  background-color: var(--color-gray-800);
  padding: 0 32px 0 8px;
  padding-left: ${({ $size }) => ($size === "large" ? "12px" : "8px")};
  outline: none;

  ${({ $dropdownIsOpen }) => ($dropdownIsOpen ? "border: 2px solid black;" : "")}

  &:focus {
    border: 2px solid black;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledClearIconContainer = styled.div`
  position: absolute;
  right: 34px;
  cursor: pointer;
`;

const StyledIconContainer = styled.div<{ $dropdownIsOpen: boolean; $size: FieldSize }>`
  position: absolute;
  right: ${({ $size }) => ($size === "large" ? "11px" : "6px")};
  ${({ $dropdownIsOpen }) => {
    if ($dropdownIsOpen) {
      return `rotate: -180deg; transition: rotate var(--animation--speed1) ease 0s;`;
    }
    return `rotate: 0deg; transition: rotate var(--animation--speed1) ease 0s;`;
  }}
`;

const SelectedMenuItem = forwardRef(
  (
    {
      name,
      id,
      isDisabled,
      placeholder = "Choose one",
      dropdownIsOpen,
      onSelectedMenuItemClick,
      onSelectedMenuItemKeyDown,
      size = "large",
      selectedMenuItem,
      setSelectedMenuItem,
    }: SelectedMenuItemProps,
    ref: ForwardedRef<RefsContainer>
  ) => {
    const { selectedRef } = (ref as MutableRefObject<RefsContainer>)?.current;
    const showClearSelectionButton = selectedMenuItem !== "" && selectedMenuItem !== null ? true : false;

    const handleClearingSelection = (event: MouseEvent<HTMLButtonElement>) => {
      if (setSelectedMenuItem) {
        event.stopPropagation();
        setSelectedMenuItem("");
        selectedRef.current?.focus();
      }
    };

    return (
      <StyledInputWrapper
        onClick={onSelectedMenuItemClick}
        onKeyDown={onSelectedMenuItemKeyDown}
      >
        <StyledInput
          name={name}
          id={id}
          ref={selectedRef}
          disabled={isDisabled}
          readOnly
          placeholder={placeholder}
          value={selectedMenuItem}
          onMouseDown={(event) => {
            // Prevent text selection on mouse down.
            event.preventDefault();
          }}
          $size={size}
          $dropdownIsOpen={dropdownIsOpen}
        />
        {showClearSelectionButton && (
          <StyledClearIconContainer>
            <Button
              isDisabled={isDisabled}
              appearance="link-with-background"
              size="large"
              iconBefore={<CgClose style={{ width: "16px", height: "16px" }} />}
              onClick={handleClearingSelection}
              ariaLabel="Clear selection"
              tooltip="Clear selection"
            />
          </StyledClearIconContainer>
        )}
        <StyledIconContainer $dropdownIsOpen={dropdownIsOpen} $size={size}>
          <Button
            isDisabled={isDisabled}
            appearance="link"
            size="small"
            iconBefore={<FaCaretDown style={{ width: "16px", height: "16px", color: "black" }} />}
            onClick={onSelectedMenuItemClick}
            ariaLabel="Toggle dropdown"
            tooltip="Toggle dropdown"
          />
        </StyledIconContainer>
      </StyledInputWrapper>
    );
  }
);

export { SelectedMenuItem };
