import { RefObject, useEffect, useRef, MouseEvent, useCallback } from "react";
import { CgClose } from "react-icons/cg";
import styled from "styled-components";
import { Button } from "../Button";

type SnackbarAppearance = "primary" | "warning";

interface SnackbarProps {
  text: string;
  appearance?: SnackbarAppearance;
  timeoutInMs?: number;
  setShowSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledSnackbar = styled.div<{ $appearance: SnackbarAppearance }>`
  position: fixed;
  bottom: 0;
  ${({ $appearance }) => {
    if ($appearance === "primary") return "background-color: var(--color-black);";
    else return "background-color: var(--color-danger);";
  }}
  color: var(--color-white);
  height: var(--input-height-large);
  z-index: 1000;
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

const Snackbar = ({ text, appearance = "primary", timeoutInMs = 100000, setShowSnackbar }: SnackbarProps) => {
  const snackbarRef: RefObject<HTMLDivElement> = useRef(null);

  const closeSnackbar = useCallback(() => {
    if (snackbarRef.current) {
      const ref = snackbarRef.current as HTMLDivElement;
      ref.style.animation = "slidedown .3s ease-in-out";
      setTimeout(() => {
        setShowSnackbar(false);
      }, 300); // 300ms is the same time as the animation duration 0.3s.
    }
  }, [setShowSnackbar]);

  const showSnackbarFn = (refArg: RefObject<HTMLDivElement>) => {
    if (refArg.current) {
      const ref = refArg.current as HTMLDivElement;
      ref.style.animation = "slideup .3s ease-in-out forwards";
    }
  };

  useEffect(() => {
    showSnackbarFn(snackbarRef);
    setTimeout(() => {
      closeSnackbar();
    }, timeoutInMs); // Hide the snackbar after 10 seconds
  }, [timeoutInMs, closeSnackbar]);

  return (
    <StyledSnackbar ref={snackbarRef} $appearance={appearance}>
      {text}
      <Button
        appearance="link"
        size="large"
        iconBefore={<CgClose style={{ width: "16px", height: "16px", color: "white" }} />}
        onClick={(event: MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          event.stopPropagation();
          closeSnackbar();
        }}
      />
    </StyledSnackbar>
  );
};

export { Snackbar };
