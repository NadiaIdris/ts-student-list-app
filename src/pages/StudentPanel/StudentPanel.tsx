import { FormEvent, RefObject, useCallback, useEffect, useRef } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { Form, useLoaderData, useNavigate, useParams, Params } from "react-router-dom";
import styled from "styled-components";
import { STUDENTS_ENDPOINT } from "../../api/apiConstants";
import { axiosInstance } from "../../api/axiosConfig";
import { Button } from "../../components/Button";
import { Snackbar } from "../../components/Snackbar";
import { useStudentUid } from "../StudentsPage/StudentsPage";
import { ReadOnlyField } from "./ReadOnlyField";
import { SidePanel } from "../../components/SidePanel";
import { SidePanelHeader } from "../../components/SidePanel/SidePanelHeader";

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

export async function loader({ params }: { params: Params }) {
  try {
    const response = await axiosInstance.get(STUDENTS_ENDPOINT + `/${params.studentId}`);
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
    console.error("Error fetching student data: ", error.message);
    console.error("error: ", error);
    if (error.code === "ERR_NETWORK") {
      return { error: "Network error" };
    }

    if (error.response?.status === 500) {
      return { error: "Internal server error" };
    }
  }
}

const StyledStudentDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding: 0 32px 0 40px;

  @media (max-width: 500px) {
    padding: 0 12px 0 20px;
  }
`;

const closeSnackbar = (refArg: RefObject<HTMLDivElement>) => {
  if (refArg.current) {
    const ref = refArg.current as HTMLDivElement;
    ref.style.animation = "slidedown .3s ease-in-out";
  }
};

const showSnackbar = (refArg: RefObject<HTMLDivElement>) => {
  if (refArg.current) {
    const ref = refArg.current as HTMLDivElement;
    ref.style.animation = "slideup .3s ease-in-out forwards";
  }
};

const StudentPanel = () => {
  // TODO: Scroll to the student with the id from the URL
  const { studentId } = useParams();
  const loaderData: IStudentFetchData | undefined = useLoaderData() as IStudentFetchData;
  const { setStudentUid } = useStudentUid();
  const navigate = useNavigate();
  const snackbarRef = useRef(null);

  const handleCloseStudentPanel = useCallback(() => {
    // Reset the studentUid to remove css property pointer-events: none from the students page.
    setStudentUid("");
    navigate("/students");
  }, [navigate, setStudentUid]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(loaderData?.studentData?.email);
      showSnackbar(snackbarRef);
      setTimeout(() => {
        if (snackbarRef.current) {
          closeSnackbar(snackbarRef);
        }
      }, 10000); // Hide the snackbar after 10 seconds
    } catch (error: any) {
      console.error("Failed to copy text:", error.message);
    }
  };

  const formatBirthday = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    // When use clicks on back button in browser, close the student panel
    window.onpopstate = handleCloseStudentPanel;
  }, [handleCloseStudentPanel]);

  useEffect(() => {
    if (loaderData?.error) {
      // Navigate to the students page if student does not exist
      navigate("/students", { replace: true, state: { error: loaderData.error } });
    }
  }, [loaderData?.error, navigate]);

  return (
    <SidePanel>
      <SidePanelHeader showCloseButton navigateToURL="/students">
        Student info
      </SidePanelHeader>
      <StyledStudentDataWrapper>
        <ReadOnlyField id="first-name" label="First name" value={loaderData?.studentData?.firstName} />
        <ReadOnlyField id="last-name" label="Last name" value={loaderData?.studentData?.lastName} />
        <ReadOnlyField
          id="email"
          label="Email"
          value={loaderData?.studentData?.email}
          icon={<MdOutlineContentCopy style={{ width: "16px", height: "16px" }} />}
          iconOnClick={handleCopyEmail}
          iconTooltip="Copy email to clipboard"
        />
        <ReadOnlyField id="gender" label="Gender" value={loaderData?.studentData?.gender ?? "Not specified"} />
        <ReadOnlyField id="birthday" label="Birthday" value={formatBirthday(loaderData?.studentData?.dateOfBirth)} />
      </StyledStudentDataWrapper>
      <StyledButtonsWrapper>
        <Button
          type="button"
          onClick={() => {
            navigate(`/students/${studentId}/edit`);
          }}
        >
          Edit
        </Button>
        <Form
          method="post"
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            navigate(`/students/${studentId}/delete`);
          }}
        >
          <Button type="submit" appearance="warning">
            Delete
          </Button>
        </Form>
      </StyledButtonsWrapper>
      <Snackbar text="Copied to clipboard" ref={snackbarRef} />
    </SidePanel>
  );
};

export { closeSnackbar, StudentPanel };
