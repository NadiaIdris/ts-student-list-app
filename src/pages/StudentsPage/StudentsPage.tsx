import { useEffect, useState } from "react";
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

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledTableWrapper = styled.div`
  max-width: 900px;
  overflow-x: auto;
  margin: 0 36px;
`;

const StyledTableRow = styled.div`
  // Use this div to highlight the background of a newly added student row.
  // &:hover {
  //   background-color: red;
  //   border-radius: 8px;
  // }
`;

const StyledBorderBottom = styled.div`
  border-bottom: 1px solid var(--color-gray-900);
  display: grid;
  grid-template-columns: 30px minmax(100px, 1fr) minmax(100px, 1fr) minmax(
      200px,
      1fr
    ) 80px;
  gap: 8px;
  align-items: center;
  padding: 0 8px;
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
  const handleEditStudent = (studentId: string) => {
    console.log("Edit student with id: ", studentId);
    navigate(`/students/${studentId}  `);
  };

  // TODO: Implement handleDeleteStudent function
  const handleDeleteStudent = (studentId: string) => {
    console.log("Delete student with id: ", studentId);
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
    <div>
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
            <StyledTableRow key={student.student_uid}>
              <StyledBorderBottom>
                <div>{index + 1}</div>
                <div>{student.first_name}</div>
                <div>{student.last_name}</div>
                <div>{student.email}</div>
                <div>
                  <div>
                    <IconButton
                      icon={
                        <LuPencil style={{ width: "16px", height: "16px" }} />
                      }
                      onClick={() => handleEditStudent(student.student_uid)}
                      size="large"
                      tooltip="Edit student"
                      label="Edit student"
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
                    />
                  </div>
                </div>
              </StyledBorderBottom>
            </StyledTableRow>
          ))}
      </StyledTableWrapper>
      {isLoading && <p>Loading...</p>}
      {students.length === 0 && !isLoading && <p>No students found</p>}
      <Button appearance="primary" onClick={() => navigate("/students/add")}>
        Add new student
      </Button>
    </div>
  );
};

export { StudentsPage };
