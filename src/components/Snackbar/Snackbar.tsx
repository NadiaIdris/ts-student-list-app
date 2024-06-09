import { forwardRef, RefObject } from "react";
import { CgClose } from "react-icons/cg";
import styled from "styled-components";
import { closeSnackbar } from "../../pages/StudentPanel";
import { Button } from "../Button";

interface SnackbarProps {
  text: string;
}

const StyledSnackbar = styled.div`
  position: fixed;
  bottom: 0;
  background-color: var(--color-selection);
  color: var(--color-button-default-fg);
  z-index: 30;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
  display: flex;
  align-items: center;
  min-width: 250px;
  max-width: 400px;
  border-radius: 12px 12px 0 0;
  justify-content: space-between;
  padding: 4px 4px 4px 12px;

  @keyframes slideup {
    from {
      transform: translateX(-50%) translateY(100%);
    }
    to {
      transform: translateX(-50%) translateY(0%);
    }
  }

  @keyframes slidedown {
    from {
      transform: translateX(-50%) translateY(0%);
    }
    to {
      transform: translateX(-50%) translateY(100%);
    }
  }
`;

const Snackbar = forwardRef(({ text }: SnackbarProps, ref) => {
  const forwardedRef = ref as RefObject<HTMLDivElement>;

  const handleCloseSnackbar = () => {
    closeSnackbar(forwardedRef);
  };

  return (
    <StyledSnackbar ref={forwardedRef}>
      {text}
      <Button
        appearance="link"
        size="medium"
        iconBefore={<CgClose style={{ width: "16px", height: "16px" }} />}
        onClick={handleCloseSnackbar}
      />
    </StyledSnackbar>
  );
});

export { Snackbar };
