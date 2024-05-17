import { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

interface Heading1Props {
  children: ReactNode | string;
  style?: CSSProperties;
  className?: string;
}

const StyledHeading1 = styled.h1`
  font-size: 2.5rem; // 40px
  font-weight: 600;
  @media (max-width: 500px) {
    font-size: 1.5rem; // 32px
    margin-bottom: 1rem; // 16px
  }
`;

const Heading1 = ({ children, style, className, ...props }: Heading1Props) => {
  return (
    <StyledHeading1 style={style} className={className} {...props}>
      {children}
    </StyledHeading1>
  );
};

export { Heading1 };
