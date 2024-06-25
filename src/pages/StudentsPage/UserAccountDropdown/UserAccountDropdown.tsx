import { GoTriangleDown } from "react-icons/go";
import styled from "styled-components";
import { Button } from "../../../components/Button";
import { IUser } from "../../../context/AuthContext";
import { MouseEvent } from "react";

interface UserAccountDropdownProps {
  userDropdownIsOpen: boolean;
  openDropdown: () => void;
  handleDeleteAccount: (event: MouseEvent<HTMLButtonElement>) => void;
  user: IUser | null;
}

const StyledDropdownWrapper = styled.div`
  position: absolute;
  top: 55px;
  background-color: white;
  z-index: 200;
  border-radius: var(--border-radius);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
  padding: 8px 0;
`;

const StyledDropdown = styled.div`
  position: relative;
`;

const StyledUserInfoWrapper = styled.div`
  padding: 20px 25px 8px 25px;
  :first-child {
    margin-bottom: 4px;
  }
`;

const StyledIconContainer = styled.div<{ $dropdownIsOpen: boolean }>`
  ${({ $dropdownIsOpen }) => {
    if ($dropdownIsOpen) {
      return `rotate: -180deg; transition: rotate var(--animation--speed1) ease 0s;`;
    }
    return `rotate: 0deg; transition: rotate var(--animation--speed1) ease 0s;`;
  }}
`;

const UserAccountDropdown = ({ userDropdownIsOpen, openDropdown, handleDeleteAccount, user }: UserAccountDropdownProps) => {
  return (
    <StyledDropdown>
      <Button
        active={userDropdownIsOpen}
        appearance="link"
        onClick={openDropdown}
        iconAfter={
          <StyledIconContainer $dropdownIsOpen={userDropdownIsOpen}>
            <GoTriangleDown style={{ width: "16px", height: "16px" }} />
          </StyledIconContainer>
        }
      >
        Hi, {user?.firstName}
      </Button>

      {userDropdownIsOpen && (
        <StyledDropdownWrapper>
          <StyledUserInfoWrapper>
            <div>
              {user?.firstName} {user?.lastName}
            </div>
            <div>{user?.email}</div>
          </StyledUserInfoWrapper>
          <Button onClick={handleDeleteAccount} appearance="link">
            Delete account
          </Button>
        </StyledDropdownWrapper>
      )}
    </StyledDropdown>
  );
};

export { UserAccountDropdown };
