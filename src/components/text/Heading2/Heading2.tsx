import { ReactNode } from "react";
import styled from "styled-components";

interface Heading2Props {
  children: ReactNode | string;
}

const StyledHeading2 = styled.h2`
  font-size: 1.75em; // 28px
  font-weight: 400;
`;

const Heading2 = ({ children }: Heading2Props) => {
  return <StyledHeading2>{children}</StyledHeading2>;
};

export { Heading2 };
