import { ChangeEvent, CSSProperties, useLayoutEffect } from "react";
import styled from "styled-components";
import { FieldSize } from "../form/Field";

interface TextFieldProps {
  /**
   * The `id` prop specifies a unique id for the input field. If you are using <Label> component, the `htmlFor` prop should match the `id` prop of the input field.
   */
  id: string;
  /**
   * The `type` prop specifies the type of input field. The default value is "text".
   */
  type: "text" | "password" | "number" | "email" | "url" | "tel";
  /**
   * The `name` prop specifies the name of the input field. Important: name is used as key to identify the input field when submitting the form.
   */
  name: string;
  /*
   * The `value` prop specifies the value of the input field.
   */
  value: string;
  /**
   * The `onChange` prop is a callback function that is called when the value of the input field changes.
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * The `placeholder` prop specifies a short hint that describes the expected value of the input field.
   */
  placeholder?: string;
  /**
   * The `autoComplete` prop specifies whether the browser should automatically complete the input value based on the user's previous inputs.
   */
  autoComplete?: "on" | "off";
  /**
   * The `size` prop specifies the size of the input field. The default value is "medium".
   */
  size?: FieldSize;
  /**
   * Sets whether the field is invalid. An invalid field is marked with a --color-danger color border and the error message is displayed below the field.
   */
  isInvalid?: boolean;
  /**
   * The `isDisabled` prop specifies whether the input field is disabled. Users cannot edit or focus on the fields. If the parent form component is disabled, then the field will always be disabled.
   */
  isDisabled?: boolean;
  /**
   * The `renderIcon` prop specifies a custom icon to render beside the input field.
   */
  renderIcon?: (isDisabled: boolean, $size: FieldSize) => JSX.Element;
  /**
   * The `showPassword` prop specifies whether the password is visible or not. This prop is only used when the type is "password".
   */
  showPassword?: boolean;
  /**
   * The `style` prop specifies the style of the text field. It will add the style inline. It's great to use it to add margin or padding to the text field.
   */
  style?: CSSProperties;
  className?: string;
}

const StyledTextFieldWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledTextField = styled.input<{
  $size?: FieldSize;
  $isInvalid?: boolean;
}>`
  border-radius: var(--border-radius);
  border: 2px solid var(--color-black);
  padding-left: 8px;
  width: 100%;
  &:disabled {
    background-color: var(--color-gray-1000);
  }
  ${({ $size }) => {
    if ($size === "small")
      return "height: 30px; font: 0.875rem Poppins, sans-serif;"; // 0.875rem is ~14px
    else if ($size === "medium")
      return "height: 36px; font: 1rem Poppins, sans-serif;"; // 1rem is ~16px
  }}
  ${({ $isInvalid }) => $isInvalid && `border-color: var(--color-danger);`}
`;

/**
 *
 * The `TextField` component is used to render an input field. It accepts the following prop:
 * @param TextFieldProps
 * @returns ReactElement
 */
const TextField = ({
  id,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  autoComplete = "on",
  size = "medium",
  isInvalid = false,
  isDisabled = false,
  renderIcon,
  showPassword = false,
  style,
  className,
  ...props
}: TextFieldProps) => {
  let passwordType = showPassword ? "text" : "password";

  useLayoutEffect(() => {
    // Measure the renderIcon container width and set the padding-right of the input field
    if (!id) return;
    const inputField = document.getElementById(id);
    const icon = document.getElementById(`${id}-icon`);
    if (inputField && icon) {
      inputField.style.paddingRight = `${icon.offsetWidth + 2}px`;
    }
  });

  return (
    <StyledTextFieldWrapper style={style} className={className}>
      <StyledTextField
        id={id}
        type={type === "password" ? passwordType : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        $size={size}
        $isInvalid={isInvalid}
        disabled={isDisabled}
        {...props}
      />
      {type === "password" && renderIcon && renderIcon(isDisabled, size)}
      {type !== "password" && renderIcon && renderIcon(isDisabled, size)}
    </StyledTextFieldWrapper>
  );
};

export { TextField };
