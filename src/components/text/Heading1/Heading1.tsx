import { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

interface Heading1Props {
  children: ReactNode | string;
  style?: CSSProperties;
  className?: string;
}

const StyledHeading1 = styled.h1`
  /* font-size: var(--font-size-40); // 40px is ~2.5rem. */
  font-weight: 600;

  @media (min-width: 0px) {
    font-size: 25px;
  }

  @media (min-width: 500px) {
    font-size: 30px;
  }

  @media (min-width: 700px) {
    font-size: 40px;
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
