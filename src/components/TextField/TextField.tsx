import { CSSProperties, useLayoutEffect } from "react";
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
  /**
   * The `placeholder` prop specifies a short hint that describes the expected value of the input field.
   */
  placeholder?: string;
  /**
   * The `autoComplete` prop specifies whether the browser should automatically complete the input value based on the user's previous inputs.
   */
  autoComplete?: "password" | "on" | "off" | "username" | "new-password" | "current-password" | "email" | "tel" | "url";
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
  renderIcon?: (id: string, isDisabled: boolean, size: FieldSize) => JSX.Element;
  /**
   * The `passwordIsVisible` prop specifies whether the password is visible or not. This prop is only used when the type is "password".
   */
  passwordIsVisible?: boolean;
  /**
   * The `style` prop specifies the style of the text field. It will add the style inline. It's great to use it to add margin or padding to the text field.
   */
  style?: CSSProperties;
  className?: string;
  testId?: string;
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
  border: 2px;
  background-color: var(--color-gray-800);
  padding: ${({ $size }) => ($size === "large" ? " 0 12px" : "0 8px")};
  width: 100%;
  font-family: inherit;

  ${({ $size }) => {
    if ($size === "small")
      return "height: var(--input-height-small); font-size: var(--font-size-14);"; // ~14px is 0.875rem
    else if ($size === "medium")
      return "height: var(--input-height-medium); font-size: var(--font-size-16);"; // ~16px is 1rem
    else return "height: var(--input-height-large); font-size: var(--font-size-16);"; // ~16px is 1rem
  }}
  ${({ $isInvalid }) => $isInvalid && `border: 2px solid var(--color-danger);`}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/**
 *
 * The `TextField` component is used to render an input field. It accepts the following prop:
 * @param TextFieldProps
 * @returns ReactElement
 */
const TextField = ({
  id,
  type,
  name,
  placeholder = "",
  autoComplete = "on",
  size = "large",
  isInvalid = false,
  isDisabled = false,
  renderIcon,
  passwordIsVisible = false,
  style,
  className,
  testId,
  ...props
}: TextFieldProps) => {
  useLayoutEffect(() => {
    // Measure the renderIcon container width and set the padding-right of the input field
    const inputField = document.getElementById(id);
    const icon = document.getElementById(`${id}-icon`);
    if (inputField && icon) {
      inputField.style.paddingRight = `${icon.offsetWidth + 6}px`;
    }
  });

  return (
    <StyledTextFieldWrapper style={style} className={className}>
      <StyledTextField
        id={id}
        type={type === "password" ? (passwordIsVisible ? "text" : "password") : type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        $size={size}
        $isInvalid={isInvalid}
        disabled={isDisabled}
        data-testid={testId}
        {...props}
      />
      {renderIcon && renderIcon(id, isDisabled, size)}
    </StyledTextFieldWrapper>
  );
};

export { TextField };
