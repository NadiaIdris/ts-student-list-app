import styled from "styled-components";

type ModalSize = "small" | "medium" | "large" | "xlarge";

interface ModalProps {
  size?: ModalSize;
  children: React.ReactNode;
}

const StyledModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
  background-color: var(--color-black-300);
`;

const StyledModal = styled.div<{ $size: ModalSize }>`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  background-color: var(--color-white);
  border-radius: var(--border-radius-large);
  border: var(--border);
  overflow: hidden auto;
  max-height: calc(100vh - 40px);

  /* The width of the Modal component changes based on the viewport size. max-width defined below is 
   * what is applied when we change the "size" prop of the Modal component. */
  @media (min-width: 0px) {
    width: calc(100vw - 40px);
  }

  @media (min-width: 400px) {
    width: calc(100vw - 60px);
  }

  @media (min-width: 600px) {
    width: calc(100vw - 80px);
  }

  @media (min-width: 800px) {
    width: calc(100vw - 100px);
  }

  /* size dictates what is the maximum width of the modal. */
  ${({ $size }) => {
    switch ($size) {
      case "small":
        return "max-width: 400px;";
      case "medium":
        return "max-width: 600px;";
      case "large":
        return "max-width: 800px;";
      case "xlarge":
        return "max-width: 970px;";
    }
  }}
`;

const Modal = ({ size = "medium", children }: ModalProps) => {
  return (
    <StyledModalBackdrop>
      <StyledModal $size={size}>{children}</StyledModal>
    </StyledModalBackdrop>
  );
};

export { Modal };
