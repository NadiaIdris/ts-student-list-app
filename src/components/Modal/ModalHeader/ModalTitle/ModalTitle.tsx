import styled from "styled-components";
import { Heading1 } from "../../../text/Heading1";

interface ModalTitleProps {
  children: React.ReactNode;
}

const StyledHeading1 = styled(Heading1)`
  margin-bottom: 0;
  margin-top: 0;
  padding-right: 10px;
`;

const ModalTitle = ({ children }: ModalTitleProps) => {
  return <StyledHeading1>{children}</StyledHeading1>;
};

export { ModalTitle };
