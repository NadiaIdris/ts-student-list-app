import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { STUDENTS_ENDPOINT } from "../../api/apiConstants";
import { axiosInstance } from "../../api/axiosConfig";
import { Button } from "../../components/buttons/Button";
import { Heading1 } from "../../components/text/Heading1";
import { useAuthContext } from "../../hooks/useAuthContext";
import { IconButton } from "../../components/buttons/IconButton";
import { MdEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  const openDropdown = () => {};

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
        <div>
          <Button $appearance="link" onClick={openDropdown}>
            {user?.firstName}
          </Button>
          <Button $appearance="secondary" onClick={handleLogOut}>
            Log out
          </Button>
        </div>
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
                  <IconButton
                    icon={<MdEdit />}
                    onClick={() => navigate(`/students/${student.student_uid}`)}
                  />
                  <IconButton
                    icon={<RiDeleteBinLine />}
                    onClick={() => navigate(`/students/${student.student_uid}`)}
                    $appearance="secondary"
                    // TODO: test all of these buttons:
                    // $size='large'
                    // isDisabled={true}
                    // $isSubmitting={true}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isLoading && <p>Loading...</p>}
      {students.length === 0 && !isLoading && <p>No students found</p>}
      <Button $appearance="primary" onClick={() => navigate("/students/add")}>
        Add student
      </Button>
    </div>
  );
};

export { StudentsPage };
