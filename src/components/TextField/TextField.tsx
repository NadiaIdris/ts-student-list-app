import { ChangeEvent, useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import styled from "styled-components";

interface TextFieldProps {
  /* TODO: how many of these props are a must and how many are optional.
   * If they are optional, add a question mark after the prop name and pass a default value to the prop in the component.
   */
  id?: string;
  type?: string;
  value: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  size?: "compact" | "small" | "medium" | "large";
  isDisabled?: boolean;
}

const StyledTextFieldWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const TextFieldStyles = styled.input`
  // If type is password, add padding-right to the input field to accommodate the eye icon.
  padding-right: ${({ type }) => (type === "password" ? "30px" : "1rem")};
`;

const StyledIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 6px;
  transform: translateY(-50%);
  cursor: pointer;
  padding: 4px;
`;

const TextField = ({
  id,
  type = "text", // Default value for type prop
  size = "large", // Default value for size prop
  autoComplete = "off", // Default value for autoComplete prop
  value,
  name,
  onChange,
  placeholder,
  ...props
}: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  let inputType;
  if (type === "password") {
    inputType = showPassword ? "text" : "password";
  }

  return (
    <StyledTextFieldWrapper>
      <TextFieldStyles
        id={id}
        name={name}
        autoComplete={autoComplete}
        type={type === "password" ? inputType : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      {type === "password" && (
        <StyledIcon onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </StyledIcon>
      )}
    </StyledTextFieldWrapper>
  );
};

export { TextField };
