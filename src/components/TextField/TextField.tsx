import { ChangeEvent } from "react";
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

const TextFieldStyles = styled.input`
  // Add your styles here
  
`;

const TextField = ({
  id,
  type = "text", // Default value for type prop
  size = "medium", // Default value for size prop
  value,
  name,
  onChange,
}: TextFieldProps) => {
  return <TextFieldStyles id={id} name={name}></TextFieldStyles>;
};

export { TextField };
