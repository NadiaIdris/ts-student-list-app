import styled from "styled-components";
import { FieldSize } from "../Field";

interface DatePickerProps {
  name: string;
  defaultValue: string;
  submitting?: boolean;
  min?: string;
  max?: string;
  /**
   * The `size` prop specifies the size of the input field. The default value is "medium".
   */
  size?: FieldSize;
}

const StyledDatePicker = styled.input<{ $size: FieldSize }>`
  width: 100%;
  border-radius: var(--border-radius);
  /* height: var(--input-height-medium); */
  border: 2px solid var(--text-black);
  /* font-size: var(--font-size-16); */
  padding: 0 8px;
  font-family: inherit;

  ${({ $size }) => {
    if ($size === "small")
      return "height: var(--input-height-small); font-size: var(--font-size-14);"; // ~14px is 0.875rem
    else if ($size === "medium") return "height: var(--input-height-medium); font-size: var(--font-size-16);"; // ~16px is 1rem
  }}

  &::-webkit-calendar-picker-indicator {
    border-radius: 50%;
    width: 14px;
    height: 14px;
    padding: 6px;
    margin-right: -4px;
    cursor: pointer;
    &:hover {
      background-color: var(--color-button-secondary-bg);
      color: var(--text-white);
    }
  }
`;

const DatePicker = ({ name, defaultValue, submitting, min, max, size = "medium", ...rest }: DatePickerProps) => {
  return (
    <StyledDatePicker
      {...rest}
      type="date"
      name={name}
      defaultValue={defaultValue}
      disabled={submitting}
      min={min}
      max={max}
      $size={size}
    />
  );
};

export { DatePicker };
