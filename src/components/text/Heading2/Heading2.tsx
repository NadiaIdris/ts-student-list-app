import { ReactNode } from "react";
import styled from "styled-components";

interface Heading2Props {
  children: ReactNode | string;
  style?: object;
}

const StyledHeading2 = styled.h2`
  font-size: 1.75em; // 28px
  font-weight: 400;
`;

const Heading2 = ({ children, style }: Heading2Props) => {
  return <StyledHeading2 style={style}>{children}</StyledHeading2>;
};

export { Heading2 };
