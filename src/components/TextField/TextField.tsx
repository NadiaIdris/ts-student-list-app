import { ChangeEvent, useLayoutEffect } from "react";
import styled from "styled-components";

interface TextFieldProps {
  /**
   * The `id` prop specifies a unique id for the input field. If you are using <Label> component, the `htmlFor` prop should match the `id` prop of the input field.
   */
  id?: string;
  /**
   * The `type` prop specifies the type of input field. The default value is "text".
   */
  type: "text" | "password" | "number" | "email" | "url" | "tel" | "search";
  /*
   * The `value` prop specifies the value of the input field.
   */
  value: string;
  /**
   * The `name` prop specifies the name of the input field. Important: name is used as key to identify the input field when submitting the form.
   */
  name: string;
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
  autoComplete?:
    | "on"
    | "off"
    | "username"
    | "email"
    | "tel"
    | "name"
    | "given-name"
    | "family-name";
  /**
   * The `size` prop specifies the size of the input field. The default value is "large".
   */
  size?: "compact" | "small" | "medium" | "large";
  /**
   * The `isDisabled` prop specifies whether the input field is disabled. Users cannot edit or focus on the fields. If the parent form component is disabled, then the field will always be disabled.
   */
  isDisabled?: boolean;
  /**
   * The `renderIcon` prop specifies a custom icon to render beside the input field.
   */
  renderIcon?: () => JSX.Element;
  /**
   * The `showPassword` prop specifies whether the password is visible or not. This prop is only used when the type is "password".
   */
  showPassword?: boolean;
}

const StyledTextFieldWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledTextField = styled.input`
  height: 36px;
  border-radius: 12px;
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
  size = "large",
  autoComplete = "off",
  value,
  name,
  onChange,
  placeholder,
  isDisabled,
  renderIcon,
  showPassword,
  ...props
}: TextFieldProps) => {
  let passwordType = showPassword ? "text" : "password";

  useLayoutEffect(() => {
    // Measure the renderIcon width and set the padding-right of the input field
    if (!id) return;
    const inputField = document.getElementById(id);
    const icon = document.getElementById(`${id}-icon`);
    if (inputField && icon) {
      inputField.style.paddingRight = `${icon.offsetWidth + 10}px`;
    }
  });

  return (
    <StyledTextFieldWrapper>
      <StyledTextField
        id={id}
        name={name}
        autoComplete={autoComplete}
        type={type === "password" ? passwordType : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={isDisabled}
        {...props}
      />
      {type === "password" && renderIcon && renderIcon()}
      {type !== "password" && renderIcon && renderIcon()}
    </StyledTextFieldWrapper>
  );
};

export { TextField };
