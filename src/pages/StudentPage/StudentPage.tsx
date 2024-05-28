import { useLoaderData, useParams } from "react-router-dom";
import styled from "styled-components";
import { Heading1 } from "../../components/text/Heading1";
import { ChangeEvent, useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosConfig";
import { STUDENTS_ENDPOINT } from "../../api/apiConstants";
import { RiCloseLargeLine } from "react-icons/ri";
import { useStudentUid } from "../StudentsPage/StudentsPage";

interface IStudent {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: string;
}

interface IStudentFetchData {
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
  width: 500px;
  height: 100%;
  background-color: var(--color-white);
`;

const StyledStudentDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px;
`;

const StyledStudentDataRow = styled.div`
  display: flex;
  align-items: center;
`;

const StyledDataKey = styled.div`
  width: 120px;
  background-color: red;
`;

const StyledDataValue = styled.input`
  flex: 1;
  background-color: lightblue;
`;

const defaultStudentData = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  dateOfBirth: "",
};

const StudentPage = () => {
  const [studentData, setStudentData] = useState(defaultStudentData);
  // TODO: Scroll to the student with the id from the URL
  const { studentId } = useParams();
  const loaderData: IStudentFetchData | undefined =
    useLoaderData() as IStudentFetchData;
  const { studentUid, setStudentUid } = useStudentUid();

  useEffect(() => {
    console.log("studentId from student page: ", studentId);
    setStudentUid(studentId!);
  }, [studentId, setStudentUid]);

  const handleCloseStudentPanel = () => {
    console.log("Close student panel");
  };

  const handleStudentDataUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("Update student data");
  };

  // Fetch student data
  // useEffect(() => {
  //   const fetchStudent = async () => {
  //     try {
  //       const response = await axiosInstance.get(
  //         STUDENTS_ENDPOINT + `/${studentId}`
  //       );
  //       if (response.status === 200) {
  //         // Rename the keys that have underscores to match the student data object
  //         const studentData = response.data;
  //         studentData.firstName = studentData.first_name;
  //         studentData.lastName = studentData.last_name;
  //         studentData.dateOfBirth = studentData.date_of_birth;
  //         setStudentData(studentData);
  //       }
  //     } catch (error: any) {
  //       console.error(error.message);
  //     }
  //   };
  //   fetchStudent();
  // }, [studentId]);

  return (
    <div>
      <StyledCloseIcon onClick={handleCloseStudentPanel}>
        <RiCloseLargeLine />
      </StyledCloseIcon>
      <StyledStudentOverlay>
        <Heading1 style={{ padding: "0 40px" }}>
          {loaderData?.studentData.firstName} {loaderData?.studentData.lastName}
        </Heading1>
        <StyledStudentDataWrapper>
          <StyledStudentDataRow>
            <StyledDataKey>First name: </StyledDataKey>
            <StyledDataValue
              value={loaderData?.studentData.firstName}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleStudentDataUpdate(event)
              }
            />
          </StyledStudentDataRow>
          <StyledStudentDataRow>
            <StyledDataKey>Last name: </StyledDataKey>
            <StyledDataValue value={loaderData?.studentData.lastName} ></StyledDataValue>
          </StyledStudentDataRow>
          <StyledStudentDataRow>
            <StyledDataKey>Email: </StyledDataKey>
            {/* <StyledDataValue>{loaderData?.studentData.email}</StyledDataValue> */}
          </StyledStudentDataRow>
          <StyledStudentDataRow>
            <StyledDataKey>Gender: </StyledDataKey>
            {/* <StyledDataValue>{loaderData?.studentData.gender}</StyledDataValue> */}
          </StyledStudentDataRow>
          <StyledStudentDataRow>
            <StyledDataKey>Birthday: </StyledDataKey>
            {/* <StyledDataValue>{loaderData?.studentData.dateOfBirth}</StyledDataValue> */}
          </StyledStudentDataRow>
        </StyledStudentDataWrapper>
      </StyledStudentOverlay>
      <StyledStudentPageCover />
    </div>
  );
};

export { StudentPage };
