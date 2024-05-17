import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { STUDENTS_ENDPOINT } from "../../api/apiConstants";
import { axiosInstance } from "../../api/axiosConfig";
import { Button } from "../../components/buttons/Button";
import { Heading1 } from "../../components/text/Heading1";
import { useAuthContext } from "../../hooks/useAuthContext";
import { IconButton } from "../../components/buttons/IconButton";
import { LuPencil } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";
import { GoTriangleDown } from "react-icons/go";

const PageWrapper = styled.div`
  padding: 20px 48px;
  overflow-y: auto;
  overflow-x: auto;
  height: calc(100vh - 107px - 52px);

  @media (max-width: 770px) {
    padding: 20px;
  }

  @media (max-width: 500px) {
    padding: 8px;
  }
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: var(--color-white);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0 56px;
  @media (max-width: 390px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 16px;
  }
`;

const NavButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledTableWrapper = styled.div`
  max-width: 900px;
  overflow-x: auto;
  @media (max-width: 500px) {
    margin: 0 -8px;
  }
`;

const StyledTableRow = styled.div`
  // Use this div to highlight the background of a newly added student row.
  background-color: transparent;
  transition: background-color 0.1s ease-in-out;
  &:first-child {
    font-size: 0.875em;
    font-weight: 600;
    height: 42px;
  }
  height: 60px;
  &:hover {
    &:first-child {
      background-color: transparent;
      cursor: default;
    }
    background-color: var(--color-gray-400);
    border-radius: 8px;
    cursor: pointer;
  }
`;

const StyledBorderBottom = styled.div`
  display: grid;
  grid-template-columns:
    30px minmax(100px, 200px) minmax(100px, 200px) minmax(200px, 1fr)
    80px;
  grid-template-rows: auto;
  gap: 8px;
  align-items: center;
  padding: 0 8px;
  height: 60px;
`;

const StyledIconsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

type Student = {
  student_uid: string;
  first_name: string;
  last_name: string;
  age: number;
  gender: string | null;
  email: string;
  date_of_birth: string;
};

const StudentsPage = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuthContext();
  const [addStudent, setAddStudent] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogOut = () => {
    logOut();
    navigate("/login", { replace: true });
  };

  // TODO: Implement openDropdown function
  const openDropdown = () => {
    console.log("Open dropdown");
  };

  // TODO: Implement handleEditStudent function

  const handleEditStudent = (
    event: MouseEvent<HTMLButtonElement>,
    studentId: string
  ) => {
    // Don't bubble up the event to the parent element
    event.stopPropagation();
    console.log("Edit student with id: ", studentId);
    navigate(`/students/${studentId}`);
  };

  // TODO: Implement handleDeleteStudent function
  const handleDeleteStudent = (studentId: string) => {
    console.log("Delete student with id: ", studentId);
  };

  // TODO: Implement handleRowClick function
  const handleRowClick = () => {
    console.log("Row clicked");
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(STUDENTS_ENDPOINT);
        if (response.status !== 200) throw new Error(response.statusText); // Throw an error when the response is not OK so that it proceeds directly to the catch block.
        setStudents(response.data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudents();
  }, []);

  return (
    <>
      <StyledHeader>
        <Heading1>All students</Heading1>
        <NavButtonsWrapper>
          <Button
            appearance="link"
            onClick={openDropdown}
            iconAfter={
              <GoTriangleDown style={{ width: "16px", height: "16px" }} />
            }
          >
            {user?.firstName}
          </Button>
          <Button appearance="secondary" onClick={handleLogOut}>
            Log out
          </Button>
        </NavButtonsWrapper>
      </StyledHeader>
      <PageWrapper>
        <StyledTableWrapper>
          <StyledTableRow>
            <StyledBorderBottom>
              <div></div>
              <div>First name</div>
              <div>Last name</div>
              <div>Email</div>
              <div></div>
            </StyledBorderBottom>
          </StyledTableRow>
          {students.length > 0 &&
            students.map((student, index) => (
              <StyledTableRow
                key={student.student_uid}
                onClick={handleRowClick}
              >
                <StyledBorderBottom>
                  <div>{index + 1}</div>
                  <div>{student.first_name}</div>
                  <div>{student.last_name}</div>
                  <div>{student.email}</div>
                  <div>
                    <StyledIconsWrapper>
                      <IconButton
                        icon={
                          <LuPencil style={{ width: "16px", height: "16px" }} />
                        }
                        onClick={(event: MouseEvent<HTMLButtonElement>) =>
                          handleEditStudent(event, student.student_uid)
                        }
                        size="large"
                        tooltip="Edit student"
                        label="Edit student"
                        appearance="link"
                      />
                      <IconButton
                        icon={
                          <RiDeleteBinLine
                            style={{ width: "16px", height: "16px" }}
                          />
                        }
                        onClick={() => handleDeleteStudent(student.student_uid)}
                        size="large"
                        tooltip="Delete student"
                        label="Delete student"
                        appearance="link"
                      />
                    </StyledIconsWrapper>
                  </div>
                </StyledBorderBottom>
              </StyledTableRow>
            ))}
        </StyledTableWrapper>
        {isLoading && <p>Loading...</p>}
        {students.length === 0 && !isLoading && <p>No students found</p>}
      </PageWrapper>
      <Button
        appearance="primary"
        onClick={() => navigate("/students/add")}
        style={{
          margin: "12px 0 0 0",
          position: "sticky",
          bottom: "0",
          backgroundColor: "var(--color-white)",
          boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.1)",
          padding: "8px 56px",
        }}
      >
        Add new student
      </Button>
    </>
  );
};

export { StudentsPage };
