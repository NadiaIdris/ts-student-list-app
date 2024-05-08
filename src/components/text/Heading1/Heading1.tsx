import { ReactNode } from "react";
import styled from "styled-components";

interface Heading1Props {
  children: ReactNode | string;
}

const StyledHeading1 = styled.h1`
  font-size: 2.5rem; // 40px
`;

const Heading1 = ({ children }: Heading1Props) => {
  return <StyledHeading1>{children}</StyledHeading1>;
};

export { Heading1 };
