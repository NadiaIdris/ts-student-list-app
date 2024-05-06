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
    | "family-name"
    | AutoCompleteOptions;
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

// const StyledTextField = styled.input<{ type: string; $showPassword?: boolean }>`
//   // If type is password, add padding-right to the input field to accommodate the eye icon.
//   padding-right: ${({ type, $showPassword }) =>
//     type === "password" ? "30px" : $showPassword ? "30px" : "0px"};
// `;

const StyledTextField = styled.input<{ $showPassword?: boolean }>``;

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
  // const [showPassword, setShowPassword] = useState(false);

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
        /* showPassword is a transient prop that is not passed to the input field. More info: https://styled-components.com/docs/api#transient-props */
        $showPassword={showPassword}
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

type AutoCompleteOptions =
  | "new-password"
  | "current-password"
  | "url"
  | "one-time-code"
  | "honorific-prefix"
  | "additional-name"
  | "honorific-suffix"
  | "nickname"
  | "organization-title"
  | "organization"
  | "street-address"
  | "address-line1"
  | "address-line2"
  | "address-line3"
  | "address-level4"
  | "address-level3"
  | "address-level2"
  | "address-level1"
  | "country"
  | "country-name"
  | "postal-code"
  | "cc-name"
  | "cc-given-name"
  | "cc-additional-name"
  | "cc-family-name"
  | "cc-number"
  | "cc-exp"
  | "cc-exp-month"
  | "cc-exp-year"
  | "cc-csc"
  | "cc-type"
  | "transaction-currency"
  | "transaction-amount"
  | "language"
  | "bday"
  | "bday-day"
  | "bday-month"
  | "bday-year";

export { TextField };
