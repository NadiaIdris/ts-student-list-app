import { ReactNode } from "react";

interface HelperMessageProps {
  /*
   * The content of the helper message
   */
  children: ReactNode | string;
  /**
   * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
   */
  testId?: string;
}

const HelperMessage = ({ children, testId }: HelperMessageProps) => {
  return <div data-testid={testId}>{children}</div>;
};

export { HelperMessage };
