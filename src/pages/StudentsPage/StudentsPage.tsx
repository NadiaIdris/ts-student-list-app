import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { STUDENTS_ENDPOINT } from "../../api/apiConstants";
import { axiosInstance } from "../../api/axiosConfig";
import { Button } from "../../components/buttons/Button";
import { Heading1 } from "../../components/text/Heading1";
import { useAuthContext } from "../../hooks/useAuthContext";
import {
  IconButton,
} from "../../components/buttons/IconButton";
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
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 &&
            students.map((student, index) => (
              <tr key={student.student_uid}>
                <td>{index}</td>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
                <td>{student.email}</td>
                <td>
                  <div>
                    <IconButton
                      icon={
                        <LuPencil style={{ width: "14px", height: "14px" }} />
                      }
                      onClick={() => handleEditStudent(student.student_uid)}
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
                      tooltip="Delete student"
                      label="Delete student"
                    />
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex" }}>
                    {/* <IconButton
                      icon={
                        <LuPencil style={{ width: "16px", height: "16px" }} />
                      }
                      $size="large"
                      onClick={() =>
                        navigate(`/students/${student.student_uid}`)
                      }
                    />
                    <IconButton
                      icon={
                        <RiDeleteBinLine
                          style={{ width: "16px", height: "16px" }}
                        />
                      }
                      $size="large"
                      $isSubmitting={true}
                      onClick={() =>
                        navigate(`/students/${student.student_uid}`)
                      }
                      $appearance="secondary"
                    />
                    <IconButton
                      icon={
                        <RiDeleteBinLine
                          style={{ width: "16px", height: "16px" }}
                        />
                      }
                      $size="large"
                      isDisabled={true}
                      onClick={() =>
                        navigate(`/students/${student.student_uid}`)
                      }
                      $appearance="secondary"
                    /> */}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isLoading && <p>Loading...</p>}
      {students.length === 0 && !isLoading && <p>No students found</p>}
      <Button appearance="primary" onClick={() => navigate("/students/add")}>
        Add new student
      </Button>
    </div>
  );
};

export { StudentsPage };
