import styled from "styled-components";
import { Button } from "../../Button";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

interface ModalHeaderProps {
  children: React.ReactNode;
  showCloseButton?: boolean;
}

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 30px;
  height: 100px;
`;

const ModalHeader = ({ children, showCloseButton = false }: ModalHeaderProps) => {
  const navigate = useNavigate();

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <StyledModalHeader>
      {children}
      {showCloseButton && (
        <Button
          type="button"
          onClick={closeModal}
          appearance="link-with-background"
          iconBefore={<CgClose style={{ width: "24px", height: "24px" }} />}
        />
      )}
    </StyledModalHeader>
  );
};

export { ModalHeader };
