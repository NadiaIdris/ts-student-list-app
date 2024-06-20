import styled from "styled-components";
import { Direction } from "../../form/Field";

interface ModalBodyProps {
  children: React.ReactNode;
  direction?: Direction;
}

const StyledModalBody = styled.div<{ $direction: Direction }>`
  display: flex;
  ${({ $direction }) => ($direction === "column" ? "flex-direction: column;" : "flex-direction: row;")};
  gap: 1rem;
`;

const ModalBody = ({ children, direction = "column" }: ModalBodyProps) => {
  return <StyledModalBody $direction={direction}>{children}</StyledModalBody>;
};

export { ModalBody };
