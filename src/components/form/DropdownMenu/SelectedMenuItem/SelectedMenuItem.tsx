import { MutableRefObject } from "react";
import { FaCaretDown } from "react-icons/fa";
import styled from "styled-components";
import { FieldSize } from "../../Field";
import { OptionsRef, SelectedRef } from "../../Dropdown/Dropdown";

interface SelectedMenuItemProps {
  id: string;
  optionsRef: OptionsRef
  selectedRef: SelectedRef
  isDisabled?: boolean;
  placeholder?: string;
  dropdownIsOpen: boolean;
  onClick: () => void;
  /**
   * The `size` prop specifies the size of the input field. The default value is "medium".
   */
  size?: FieldSize;
  selectedMenuItem: string;
}

const StyledInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{
  $size: FieldSize;
  $dropdownIsOpen: boolean;
}>`
  cursor: default;
  ${({ $size }) => {
    if ($size === "small")
      return "height: var(--input-height-small); font: var(--font-size-14) Poppins, sans-serif;"; // ~14px is 0.875rem
    else if ($size === "medium")
      return "height: var(--input-height-medium); font: var(--font-size-16) Poppins, sans-serif;"; // ~16px is 1rem
  }}
  border-top-right-radius: var(--border-radius);
  border-top-left-radius: var(--border-radius);
  ${({ $dropdownIsOpen }) =>
    $dropdownIsOpen
      ? "border-bottom-left-radius: 0; border-bottom-right-radius: 0;"
      : "border-bottom-left-radius: var(--border-radius); border-bottom-right-radius: var(--border-radius);"}
  width: 100%;
  border: 2px solid var(--text-black);
  padding: 0 8px;
  outline: none;

  &:hover {
    background-color: var(--color-button-secondary-bg);
  }
`;

const StyledIconContainer = styled.div<{ $dropdownIsOpen: boolean }>`
  position: absolute;
  right: 10px;
  ${({ $dropdownIsOpen }) => {
    if ($dropdownIsOpen) {
      return `rotate: -180deg; transition: rotate var(--animation--speed1) ease 0s;`;
    }
    return `rotate: 0deg; transition: rotate var(--animation--speed1) ease 0s;`;
  }}
`;

const SelectedMenuItem = ({
  id,
  optionsRef,
  selectedRef,
  isDisabled,
  placeholder = "Choose one",
  dropdownIsOpen,
  onClick,
  size = "medium",
  selectedMenuItem,
}: SelectedMenuItemProps) => {
  return (
    <StyledInputWrapper onClick={onClick}>
      <StyledInput
        id={id}
        ref={selectedRef}
        disabled={isDisabled}
        readOnly
        onClick={() => console.log("dropdown open")}
        placeholder={placeholder}
        value={selectedMenuItem}
        onMouseDown={(event) => {
          // Prevent text selection on mouse down.
          event.preventDefault();
        }}
        $size={size}
        $dropdownIsOpen={dropdownIsOpen}
      />
      <StyledIconContainer $dropdownIsOpen={dropdownIsOpen}>
        <FaCaretDown style={{ width: "16px", height: "16px" }} />
      </StyledIconContainer>
    </StyledInputWrapper>
  );
};

export { SelectedMenuItem };
