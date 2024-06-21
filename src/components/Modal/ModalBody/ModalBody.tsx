import styled from "styled-components";

interface ModalBodyProps {
  children: React.ReactNode;
}

const StyledModalBody = styled.div`
  margin: 0 30px;
`;

const ModalBody = ({ children }: ModalBodyProps) => {
  return <StyledModalBody>{children}</StyledModalBody>;
};

export { ModalBody };
