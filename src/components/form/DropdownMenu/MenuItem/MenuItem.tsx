import { MouseEvent } from "react";
import styled from "styled-components";
import { FieldSize } from "../../Field";

interface MenuItemProps {
  children: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  size?: FieldSize;
}

const StyledMenuItem = styled.button<{ $size: FieldSize }>`
  padding: 0 8px;
  background-color: var(--color-white);
  border: 2px solid transparent;
  color: var(--color-button-default-fg);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: start;

  ${({ $size }) =>
    $size === "small"
      ? "font-size: var(--font-size-14); height: var(--input-height-small);"
      : "font-size: var(--font-size-16); height: var(--input-height-medium);"};
  &:hover {
    background-color: var(--color-button-secondary-bg-hover);
    color: var(--text-black);
  }
  // Last button in the group should have border-radius
  &:last-child {
    border-bottom-right-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
  }
`;

const MenuItem = ({
  children,
  onClick,
  isDisabled,
  size = "medium",
}: MenuItemProps) => {
  return (
    <StyledMenuItem onClick={onClick} disabled={isDisabled} $size={size}>
      {children}
    </StyledMenuItem>
  );
};

export { MenuItem };
