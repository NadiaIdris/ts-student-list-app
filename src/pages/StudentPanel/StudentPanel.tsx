import { Form, useLoaderData, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Heading1 } from "../../components/text/Heading1";
import { useEffect, MouseEvent, FormEvent } from "react";
import { axiosInstance } from "../../api/axiosConfig";
import { STUDENTS_ENDPOINT } from "../../api/apiConstants";
import { CgClose } from "react-icons/cg";
import { useStudentUid } from "../StudentsPage/StudentsPage";
import { Button } from "../../components/buttons/Button";
import { ReadOnlyField } from "./ReadOnlyField";

interface IStudent {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: string;
}

export interface IStudentFetchData {
  studentData: IStudent;
  error: any;
}

// TODO: fix data fetching
export async function loader({ params }: { params: any }) {
  try {
    const response = await axiosInstance.get(
      STUDENTS_ENDPOINT + `/${params.studentId}`
    );
    if (response.status === 200) {
      // Rename the keys that have underscores to match the student data object
      const studentData = response.data;
      studentData.firstName = studentData.first_name;
      studentData.lastName = studentData.last_name;
      studentData.dateOfBirth = studentData.date_of_birth;
      delete studentData.first_name;
      delete studentData.last_name;
      delete studentData.date_of_birth;
      return { studentData };
    }
  } catch (error: any) {
    console.error(error.message);
    return { error };
  }
}

const StyledCloseIcon = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 101;
  cursor: pointer;
`;

const StyledStudentPageCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: var(--color-black-300);
  pointer-events: none;
`;

const StyledStudentOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  max-width: 500px;
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
`;

const StyledHeading1 = styled(Heading1)`
  padding: 0 40px;

  @media (max-width: 500px) {
    padding: 0 20px;
  }
`;

const StyledStudentDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 40px;

  @media (max-width: 500px) {
    padding: 0 20px;
  }
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const StudentPanel = () => {
  // TODO: Scroll to the student with the id from the URL
  const { studentId } = useParams();
  const loaderData: IStudentFetchData | undefined =
    useLoaderData() as IStudentFetchData;
  const { setStudentUid } = useStudentUid();
  const navigate = useNavigate();

  useEffect(() => {
    setStudentUid(studentId!);
  }, [studentId, setStudentUid]);

  const handleCloseStudentPanel = () => {
    // Reset the studentUid to remove css property pointer-events: none from the students page.
    setStudentUid("");
    navigate("/students");
  };

  return (
    <>
      <StyledCloseIcon>
        <Button
          appearance="link-with-background"
          size="large"
          iconBefore={<CgClose style={{ width: "16px", height: "16px" }} />}
          onClick={handleCloseStudentPanel}
        />
      </StyledCloseIcon>
      <StyledStudentOverlay>
        <StyledHeading1>Student info</StyledHeading1>
        <StyledStudentDataWrapper>
          <ReadOnlyField
            id="first-name"
            label="First name"
            value={loaderData?.studentData?.firstName}
          />
          <ReadOnlyField
            id="last-name"
            label="Last name"
            value={loaderData?.studentData?.lastName}
          />
          <ReadOnlyField
            id="email"
            label="Email"
            value={loaderData?.studentData?.email}
          />
          <ReadOnlyField
            id="gender"
            label="Gender"
            value={loaderData?.studentData?.gender ?? "Not specified"}
          />
          <ReadOnlyField
            id="birthday"
            label="Birthday"
            value={loaderData?.studentData?.dateOfBirth}
          />
          <StyledButtonsWrapper>
            {/* <Form action="edit"> */}
            <Button
              type="button"
              onClick={(event: MouseEvent<HTMLElement>) => {
                navigate(`/students/${studentId}/edit`);
              }}
            >
              Edit
            </Button>
            {/* </Form> */}
            <Form
              method="post"
              action="delete"
              onSubmit={(event: FormEvent<HTMLFormElement>) => {
                // eslint-disable-next-line no-restricted-globals
                if (!confirm("Please confirm you want to delete this record")) {
                  event.preventDefault();
                }
              }}
            >
              <Button type="submit" appearance="warning">
                Delete
              </Button>
            </Form>
          </StyledButtonsWrapper>
        </StyledStudentDataWrapper>
      </StyledStudentOverlay>
      <StyledStudentPageCover />
    </>
  );
};

export { StudentPanel };
