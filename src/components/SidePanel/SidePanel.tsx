import styled from "styled-components";

type SidePanelSize = "small" | "medium" | "large" | "xlarge";

interface SidePanelProps {
  children: React.ReactNode;
  size?: SidePanelSize;
}

const StyledStudentPageCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
  background-color: var(--color-black-300);
`;

const StyledStudentOverlay = styled.div<{ $size: SidePanelSize }>`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 20;

  /* size dictates what is the maximum width of the side panel. */
  ${({ $size }) => {
    switch ($size) {
      case "small":
        return "max-width: 500px;";
      case "medium":
        return "max-width: 600px;";
      case "large":
        return "max-width: 800px;";
      case "xlarge":
        return "max-width: 1000px;";
    }
  }}
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  overflow: auto;
`;

const SidePanel = ({ children, size = "small" }: SidePanelProps) => {
  return (
    <StyledStudentPageCover>
      <StyledStudentOverlay $size={size}>{children}</StyledStudentOverlay>
    </StyledStudentPageCover>
  );
};

export { SidePanel };
