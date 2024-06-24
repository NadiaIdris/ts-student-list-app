import styled from "styled-components";

interface ModalFooterProps { 
  children: React.ReactNode;
};

const StyledModalFooter = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 30px;
  gap: 12px;
`;

const ModalFooter = ({ children }: ModalFooterProps) => {
  return <StyledModalFooter>{children}</StyledModalFooter>;
};

export { ModalFooter };