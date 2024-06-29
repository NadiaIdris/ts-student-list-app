import styled from "styled-components";
import { Button } from "../../Button";
import { CgClose } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";

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
  const previousHistoryEntry = useLocation();
  const loginPage = previousHistoryEntry.state?.from === "login";

  const closeModal = () => {
    // If the previous history entry is the login page, navigate to the students
    // Otherwise, navigate back to the previous history entry
    if (loginPage) {
      navigate("/students");
    } else {
      navigate(-1);
    }
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
          tooltip="Close modal"
          ariaLabel="Close modal"
        />
      )}
    </StyledModalHeader>
  );
};

export { ModalHeader };
