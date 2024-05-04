import { ReactNode } from "react";

interface HelperMessageProps {
  children: ReactNode | string;
  testId?: string;
}

const HelperMessage = ({ children, testId }: HelperMessageProps) => {
  return <div data-testid={testId}>{children}</div>;
};

export { HelperMessage };