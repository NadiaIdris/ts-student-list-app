import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { LuPencil } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, Outlet, useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { STUDENTS_ENDPOINT } from "../../api/apiConstants";
import { axiosInstance } from "../../api/axiosConfig";
import { Button } from "../../components/Button";
import { Heading1 } from "../../components/text/Heading1";
import { useAuthContext } from "../../hooks/useAuthContext";
import { StudentsSkeleton } from "./StudentsSkeleton";
import { UserAccountDropdown } from "./UserAccountDropdown";

interface IStudents {
  students: Student[] | null;
  error: any;
}

export async function loader() {
  try {
    const response = await axiosInstance.get(STUDENTS_ENDPOINT);
    return { students: response.data };
  } catch (error: any) {
    if (error.code === "ERR_NETWORK") {
      return { error: error.message };
    }
    if (error.response?.status === 500) {
      return { error: "Internal server error" };
    }
    // Return null if any other error is encountered.
    return null;
  }
}

const TableBodyWrapper = styled.div`
  padding: 0 48px;
  overflow-y: auto;
  overflow-x: auto;
  height: calc(100vh - 64px - 52px);
  background-color: var(--color-white);

  @media (max-width: 770px) {
    padding: 0 20px;
    height: calc(100vh - 64px - 86px); // 58px is the height of the bottom bar with 'Add new student' button.
  }

  @media (max-width: 500px) {
    padding: 0 8px;
    height: calc(100vh - 64px - 64px);
  }

  @media (max-width: 420px) {
    padding: 0 8px;
    height: calc(100vh - 64px - 128px);
  }
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: var(--color-white);
  padding: 0 56px;
  @media (max-width: 770px) {
    h1 {
      font-size: 2rem;
    }
    padding: 0 20px;
  }
  @media (max-width: 500px) {
    h1 {
      font-size: 1.5rem; // 32px
      margin-bottom: 1rem; // 16px
    }
  }

  @media (max-width: 420px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 16px;
  }
`;

const StyledNavButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledTableWrapper = styled.div`
  max-width: 900px;
  @media (max-width: 500px) {
    margin: 0 -8px;
  }
`;

const StyledTableHeader = styled.div`
  display: grid;
  grid-template-columns:
    30px minmax(100px, 200px) minmax(100px, 200px) minmax(200px, 1fr)
    80px;
  grid-template-rows: auto;
  gap: 8px;
  align-items: center;
  padding: 0 8px;
  height: 42px;
  font-weight: 600;
  font-size: var(--font-size-14);
`;

const StyledTableRow = styled(Link)`
  background-color: transparent;
  transition: background-color 0.1s ease-in-out;
  text-decoration: none;
  color: inherit;
`;

const StyledRowGrid = styled.div`
  display: grid;
  grid-template-columns:
    30px minmax(100px, 200px) minmax(100px, 200px) minmax(200px, 1fr)
    80px;
  grid-template-rows: auto;
  gap: 8px;
  align-items: center;
  padding: 0 8px;
  height: 60px;
  &:hover {
    background-color: var(--color-gray-400);
    border-radius: 8px;
    cursor: pointer;
  }

  @media (max-width: 650px) {
    width: fit-content;
  }
`;

const StyledTableCell = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledIconsWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledButtonWrapper = styled.div`
  margin: 12px 0 0 0;
  position: sticky;
  bottom: 0;
  background-color: var(--color-white);
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3);
  padding: 8px 56px;
  @media (max-width: 770px) {
    padding: 8px 20px;
  }
`;

const EmptyState = styled.p`
  text-align: center;
  margin-top: 60px;
  color: var(--color-black-700);
`;

type Student = {
  student_uid: string;
  first_name: string;
  last_name: string;
  gender: string | null;
  email: string;
  date_of_birth: string;
};

type ContextType = {
  studentUid: string;
  setStudentUid: Dispatch<SetStateAction<string>>;
};

const StudentsPage = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuthContext();
  const loaderData: IStudents | undefined = useLoaderData() as IStudents;
  const [isLoading, setIsLoading] = useState(true);
  const [studentUid, setStudentUid] = useState<string>("");
  const [userDropdownIsOpen, setUserDropdownIsOpen] = useState(false);

  const handleLogOut = () => {
    logOut();
    navigate("/login", { replace: true });
  };

  const handleDeleteAccount = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`${user?.userId}/delete-user`);
  };

  const toggleDropdown = () => {
    setUserDropdownIsOpen((prev) => !prev);
  };

  const handleEditStudent = (event: MouseEvent<HTMLButtonElement>, studentId: string) => {
    // Prevent the default behavior of the button: submitting data to the server
    event.preventDefault();
    // Don't bubble up the mouse event to the parent element
    event.stopPropagation();
    navigate(`/students/${studentId}/edit`);
  };

  const handleDeleteStudent = (event: MouseEvent<HTMLButtonElement>, studentId: string) => {
    // Prevent the default behavior of the button: submitting data to the server
    event.preventDefault();
    // Don't bubble up the mouse event to the parent element
    event.stopPropagation();
    navigate(`/students/${studentId}/delete`);
  };

  useEffect(() => {
    (loaderData?.students || loaderData?.error) && setIsLoading(false);
  }, [loaderData.students, loaderData.error]);

  useEffect(() => {
    // if url endoint is '/' redirect to '/students'
    if (window.location.pathname === "/") {
      navigate("/students", { replace: true });
    }
  }, [navigate]);

  // Add overflow: hidden; to the body when logged in, so that we can scroll only the students table.
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (loaderData?.error) {
    /* TODO: design a more helpful network error page*/
    return <div>{loaderData?.error}</div>;
  }

  return (
    <>
      <div>
        <StyledHeader>
          <Heading1>All students</Heading1>
          <StyledNavButtonsWrapper>
            <UserAccountDropdown
              user={user}
              openDropdown={toggleDropdown}
              handleDeleteAccount={handleDeleteAccount}
              userDropdownIsOpen={userDropdownIsOpen}
            />
            <Button appearance="secondary" onClick={handleLogOut}>
              Log out
            </Button>
          </StyledNavButtonsWrapper>
        </StyledHeader>
        <TableBodyWrapper>
          <StyledTableWrapper>
            <StyledTableHeader>
              <div></div>
              <div>First name</div>
              <div>Last name</div>
              <div>Email</div>
              <div></div>
            </StyledTableHeader>
            {isLoading && <StudentsSkeleton />}
            {!isLoading &&
              loaderData?.students?.map((student, index) => (
                <StyledTableRow key={student.student_uid} to={`${student.student_uid}`}>
                  <StyledRowGrid>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{student.first_name}</StyledTableCell>
                    <StyledTableCell>{student.last_name}</StyledTableCell>
                    <StyledTableCell>{student.email}</StyledTableCell>
                    <StyledTableCell>
                      <StyledIconsWrapper>
                        <Button
                          iconBefore={<LuPencil style={{ width: "16px", height: "16px" }} />}
                          onClick={(event: MouseEvent<HTMLButtonElement>) =>
                            handleEditStudent(event, student.student_uid)
                          }
                          tooltip="Edit student"
                          ariaLabel="Edit student"
                          appearance="link"
                        />
                        <Button
                          iconBefore={<RiDeleteBinLine style={{ width: "16px", height: "16px" }} />}
                          onClick={(event: MouseEvent<HTMLButtonElement>) =>
                            handleDeleteStudent(event, student.student_uid)
                          }
                          tooltip="Delete student"
                          ariaLabel="Delete student"
                          appearance="link"
                        />
                      </StyledIconsWrapper>
                    </StyledTableCell>
                  </StyledRowGrid>
                </StyledTableRow>
              ))}
          </StyledTableWrapper>
          {loaderData?.students?.length === 0 && (
            <EmptyState>
              No students found.
              <br />
              Add a student below.
            </EmptyState>
          )}
          {loaderData?.error && !isLoading && (
            <EmptyState>
              {loaderData?.error?.message || loaderData?.error?.code}: Error fetching students. Please try again later.
            </EmptyState>
          )}
        </TableBodyWrapper>
        <StyledButtonWrapper>
          <Button appearance="primary" onClick={() => navigate("/students/add")}>
            Add new student
          </Button>
        </StyledButtonWrapper>
      </div>
      <Outlet context={{ studentUid, setStudentUid } satisfies ContextType} />
    </>
  );
};

/**
 * This hook uses useOutletContext and allows us to set studentUid to truthy value from StudentPage.
 * We want to set studentUid to truthy, because when student page is open, we set the background
 * pointer-events to none.
 */
export function useStudentUid() {
  return useOutletContext<ContextType>();
}

export { StudentsPage };
