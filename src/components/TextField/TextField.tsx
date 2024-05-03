import styled from "styled-components";

interface TextFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const TextFieldStyles = styled.input`
  // Add your styles here
`;

const TextField = ({ value, onChange }: TextFieldProps) => {
  return <TextFieldStyles></TextFieldStyles>;
};

export { TextField };
