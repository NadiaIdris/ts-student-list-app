import { KeyboardEvent, useEffect, useState } from "react";
import {
  Form,
  Params,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { STUDENTS_ENDPOINT } from "../../api/apiConstants";
import { axiosInstance } from "../../api/axiosConfig";
import { Button } from "../../components/Button";
import { DatePicker } from "../../components/form/DatePicker";
import { DropdownMenu } from "../../components/form/DropdownMenu";
import { Direction, Field } from "../../components/form/Field";
import { SidePanel } from "../../components/SidePanel";
import { SidePanelHeader } from "../../components/SidePanel/SidePanelHeader";
import { TextField } from "../../components/TextField";
import { generateErrorMessagesObject, removeWhiteSpace } from "../../utils/utils";
import { validateStudentData } from "../../validation/validate";
import { defaultStudentData, IStudentData, IStudentErrors } from "../AddStudentModal";
import { IStudentFetchData } from "../StudentPanel/StudentPanel";

const GENDERS = ["Female", "Male", "Agender", "Cisgender", "Genderfluid", "Genderqueer", "Non-binary", "Transgender"];

interface IEditStudent {
  errorMsgs: IStudentErrors;
}

async function action({ request, params }: { request: Request; params: Params }) {
  let formData = await request.formData();
  // Trim the white spaces from all the form data
  const trimmedStudentData = removeWhiteSpace(formData) as unknown as IStudentData;
  /* Gender can be null and it has set options to choose from. So we don't need to validate gender. */
  const { gender, ...rest } = trimmedStudentData;
  const studentDataWithoutGender = rest;
  // Validate the student data before sending it to the server.
  const { error } = validateStudentData(studentDataWithoutGender);

  if (error) {
    const errorMsgs = generateErrorMessagesObject(error.details, defaultStudentData);
    // Don't continue with creating a new student process if there are errors.
    return { errorMsgs };
  }

  try {
    const endpoint = STUDENTS_ENDPOINT + `/${params.studentId}`;
    const response = await axiosInstance.put(endpoint, trimmedStudentData);
    if (response.status === 200) {
      // Redirect to the student's page after the student data has been updated.
      return redirect(`/students/${params.studentId}`);
    }
  } catch (error: any) {
    console.error(error.message);
    return { error };
  }
}

type HandleSelectKeyDown = (event: KeyboardEvent<HTMLDivElement>) => void;

type HandleOptionKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => void;

const StyledStudentDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 40px;

  @media (max-width: 500px) {
    padding: 0 20px;
  }
`;

const StyledFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const StudentEditPanel = () => {
  const navigation = useNavigation();
  const { studentId } = useParams();
  const submitting = navigation.state === "submitting";
  const actionData: IEditStudent | undefined = useActionData() as IEditStudent;
  const loaderData: IStudentFetchData | undefined = useLoaderData() as IStudentFetchData;
  const navigate = useNavigate();
  const [fieldDirection, setFieldDirection] = useState<Direction>("row");

  const sanitizeDateFromServer = (date: string) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };
  const dateOfBirth = sanitizeDateFromServer(loaderData?.studentData.dateOfBirth);
  const maxDate = new Date().toISOString().split("T")[0];
  const minDate = new Date(1900, 0, 1).toISOString().split("T")[0];

  useEffect(() => {
    // Set the field direction to column if the window width is less than 400px on component mount.
    if (window.innerWidth < 400) {
      setFieldDirection("column");
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth < 400) {
        setFieldDirection("column");
      } else {
        setFieldDirection("row");
      }
    });
  }, []);

  const renderFirstNameField = () => (
    <Field
      id="first-name"
      label="First name"
      direction={fieldDirection}
      isRequired
      invalidFieldMessage={actionData?.errorMsgs?.first_name}
    >
      {(inputProps) => (
        <TextField
          {...inputProps}
          name="first_name"
          defaultValue={loaderData?.studentData.firstName}
          placeholder="Enter student's first name"
          isInvalid={Boolean(actionData?.errorMsgs?.first_name)}
          isDisabled={submitting}
        />
      )}
    </Field>
  );

  const renderLastNameField = () => (
    <Field
      id="last-name"
      label="Last name"
      direction={fieldDirection}
      isRequired
      invalidFieldMessage={actionData?.errorMsgs?.last_name}
    >
      {(inputProps) => (
        <TextField
          {...inputProps}
          name="last_name"
          defaultValue={loaderData?.studentData.lastName}
          placeholder="Enter student's last name"
          isInvalid={Boolean(actionData?.errorMsgs?.last_name)}
          isDisabled={submitting}
        />
      )}
    </Field>
  );

  const renderEmailField = () => (
    <Field
      id="email"
      label="Email"
      direction={fieldDirection}
      isRequired
      invalidFieldMessage={actionData?.errorMsgs?.email}
    >
      {(inputProps) => (
        <TextField
          {...inputProps}
          type="email"
          name="email"
          defaultValue={loaderData?.studentData.email}
          placeholder="Enter student's email name"
          isInvalid={Boolean(actionData?.errorMsgs?.email)}
          isDisabled={submitting}
        />
      )}
    </Field>
  );

  const renderGenderDropdown = () => (
    <Field id="gender-dropdown" label="Gender" direction={fieldDirection}>
      {(inputProps) => (
        <DropdownMenu
          {...inputProps}
          name="gender"
          isDisabled={submitting}
          // Data
          menuItems={GENDERS}
          defaultSelectedMenuItem={loaderData?.studentData.gender}
        />
      )}
    </Field>
  );

  const renderBirthdayDropdown = () => (
    <Field
      id="date-of-birth"
      label="Birthday"
      direction={fieldDirection}
      isRequired
      invalidFieldMessage={actionData?.errorMsgs?.date_of_birth}
    >
      {(inputProps) => (
        <DatePicker
          {...inputProps}
          name="date_of_birth"
          defaultValue={dateOfBirth}
          isInvalid={Boolean(actionData?.errorMsgs?.date_of_birth)}
          isDisabled={submitting}
          min={minDate}
          max={maxDate}
        />
      )}
    </Field>
  );

  return (
    <SidePanel>
      <SidePanelHeader showCloseButton navigateToURL="/students">
        Edit
      </SidePanelHeader>
      <StyledStudentDataWrapper>
        <Form method="put">
          <StyledFieldsWrapper>
            {renderFirstNameField()}
            {renderLastNameField()}
            {renderEmailField()}
            {renderGenderDropdown()}
            {renderBirthdayDropdown()}
          </StyledFieldsWrapper>
          <StyledButtonsWrapper>
            <Button type="submit" isLoading={submitting}>
              Save
            </Button>
            <Button
              type="button"
              appearance="secondary"
              isLoading={submitting}
              onClick={() => {
                navigate(`/students/${studentId}`);
              }}
            >
              Cancel
            </Button>
          </StyledButtonsWrapper>
        </Form>
      </StyledStudentDataWrapper>
    </SidePanel>
  );
};

export { action, GENDERS, StudentEditPanel };
export type { HandleOptionKeyDown, HandleSelectKeyDown };
