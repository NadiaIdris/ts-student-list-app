import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Direction } from "../Field";

interface ErrorMessageProps {
  direction?: Direction;
  /**
   * A boolean to determine if the error message is visible. It will always take space on the page
   * to remove UI jank when error message appears on the screen, but it will be hidden if this prop is false.
   */
  isVisible?: boolean;
  /**
   * The content of the error message
   */
  children: ReactNode | string;
  /**
   * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
   */
  testId?: string;
}

const StyledError = styled.div<{
  $direction: Direction;
  $isVisible: boolean;
  $height: number;
}>`
  color: var(--color-danger);
  font-size: var(--font-size-14);
  ${({ $direction }) => $direction === "row" && "margin-left: 113px;"}
  height: ${({ $isVisible }) => ($isVisible ? `auto` : "0")};
  max-height: ${({ $isVisible, $height }) => ($isVisible ? `${$height}px` : "0")};
  overflow: hidden; /* Hide the content that overflows the height during animation */
  transform: translateY(${({ $isVisible }) => ($isVisible ? "0" : "-20px")});
  transition: transform 0.3s ease-in-out, max-height 0.3s ease-in-out;
`;

const ErrorMessage = ({ direction = "column", isVisible = true, children, testId }: ErrorMessageProps) => {
  const [height, setHeight] = useState(0);
  const errorRef = useRef<HTMLDivElement>(null);

  // Get the height of the error message and set it as the max-height of the error message
  useLayoutEffect(() => {
    if (errorRef.current) {
      const refHeight = errorRef.current?.scrollHeight;
      setHeight(refHeight);
    }
  }, []);

  return (
    <StyledError $direction={direction} data-testid={testId} $isVisible={isVisible} $height={height} ref={errorRef}>
      {children}
    </StyledError>
  );
};

export { ErrorMessage };
