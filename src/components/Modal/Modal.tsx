import styled from "styled-components";

interface ModalProps {
  children: React.ReactNode;
}

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
  background-color: var(--color-black-300);
  /* pointer-events: none; */
`;

const Modal = ({ children }: ModalProps) => { 
  return <StyledModal>{children}</StyledModal>;
};

export { Modal };