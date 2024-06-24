import styled from "styled-components";
import { Heading1 } from "../../text/Heading1";
import { Button } from "../../Button";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

interface SidePanelHeaderProps {
  showCloseButton?: boolean;
  navigateToURL: string;
  children: React.ReactNode;
}

const StyledCloseIcon = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 101;
  cursor: pointer;
`;

const StyledSidePanelHeader = styled(Heading1)`
  padding: 0 40px;
  margin: 40px 0 20px 0;

  @media (max-width: 500px) {
    padding: 0 20px;
    margin: 20px 0 10px 0;
  }
`;

const SidePanelHeader = ({ showCloseButton = true, navigateToURL,  children }: SidePanelHeaderProps) => {
  const navigate = useNavigate();

  const handleCloseStudentPanel = () => {
    navigate(navigateToURL);
  };
  
  return (
    <StyledSidePanelHeader>
      {children}
      {showCloseButton && (
        <StyledCloseIcon>
          <Button
            appearance="link-with-background"
            size="medium"
            iconBefore={<CgClose style={{ width: "24px", height: "24px" }} />}
            onClick={handleCloseStudentPanel}
            ariaLabel="Close student panel"
            tooltip="Close student panel"
          />
        </StyledCloseIcon>
      )}
    </StyledSidePanelHeader>
  );
};

export { SidePanelHeader };
