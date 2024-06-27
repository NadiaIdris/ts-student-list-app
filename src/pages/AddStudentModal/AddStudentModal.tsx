import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import styled from "styled-components";
import { ADD_STUDENT_ENDPOINT } from "../../api/apiConstants";
import { axiosInstance } from "../../api/axiosConfig";
import { Button } from "../../components/Button";
import { DatePicker } from "../../components/form/DatePicker";
import { DropdownMenu } from "../../components/form/DropdownMenu";
import { Field } from "../../components/form/Field";
import { RequiredAsterisk } from "../../components/form/RequiredAsterisk";
import { Modal } from "../../components/Modal";
import { ModalHeader } from "../../components/Modal/ModalHeader";
import { ModalTitle } from "../../components/Modal/ModalHeader/ModalTitle";
import { TextField } from "../../components/TextField";
import { generateErrorMessagesObject, removeWhiteSpace } from "../../utils/utils";
import { validateStudentData } from "../../validation/validate";
import { GENDERS } from "../StudentEditPanel";

interface IStudentErrors {
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
}

interface IAddStudent {
  errorMsgs: IStudentErrors;
}

interface IStudentData {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  date_of_birth: string;
}

const defaultStudentData: IStudentData = {
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
  date_of_birth: "",
};

async function action({ request }: { request: Request }) {
  // Get the values from the form.
  const formData = await request.formData();
  // Trim the white spaces from all the form data
  const trimmedNewStudentData = removeWhiteSpace(formData) as unknown as IStudentData;
  // Because gender can be null and it has certain defained options, we don't need to validate it.
  const { gender, ...rest } = trimmedNewStudentData;
  const studentDataWithoutGender = rest;
  // Validate the student data before sending it to the server.
  const { error } = validateStudentData(studentDataWithoutGender);

  if (error) {
    const errorMsgs = generateErrorMessagesObject(error.details, defaultStudentData);
    // Don't continue with creating a new student process if there are errors.
    return { errorMsgs };
  }

  // Send the values to the server.
  try {
    const response = await axiosInstance.post(ADD_STUDENT_ENDPOINT, trimmedNewStudentData);

    if (response.status === 201) {
      // Student was successfully added. Redirect to the students page.
      return redirect("/students");
    }
  } catch (error: any) {
    // Catch the 409 conflict error if the student with the same email already exists.
    if (error.response.status === 409) {
      return { errorMsgs: { email: "Student with the same email already exists" } };
    }
    console.error(`[ACTION ERROR]: ${error}`);
    return null;
  }
}

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1 0 200px;
  @media (max-width: 600px) {
    gap: 20px;
  }
`;

const StyledCustomModalBody = styled.div`
  display: flex;
  gap: 10%;
  margin: 10px 30px 40px 30px;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const StyledRequiredFields = styled.div`
  margin-top: 20px;
  font-size: var(--font-size-11);
  color: var(--color-gray-text-light);
`;

const AddStudentModal = () => {
  const navigation = useNavigation();
  const actionData: IAddStudent | undefined = useActionData() as IAddStudent;
  const submitting = navigation.state === "submitting";

  const maxDate = new Date().toISOString().split("T")[0];
  const minDate = new Date(1900, 0, 1).toISOString().split("T")[0];

  const renderFirstNameField = () => (
    <Field id="first-name" label="First Name" isRequired invalidFieldMessage={actionData?.errorMsgs?.first_name}>
      {({ inputProps }) => (
        <TextField
          {...inputProps}
          placeholder="Enter student's first name"
          name="first_name"
          isInvalid={Boolean(actionData?.errorMsgs?.first_name)}
          isDisabled={submitting}
        />
      )}
    </Field>
  );

  const renderLastNameField = () => (
    <Field id="last-name" label="Last Name" isRequired invalidFieldMessage={actionData?.errorMsgs?.last_name}>
      {({ inputProps }) => (
        <TextField
          {...inputProps}
          placeholder="Enter student's last name"
          name="last_name"
          isInvalid={Boolean(actionData?.errorMsgs?.last_name)}
          isDisabled={submitting}
        />
      )}
    </Field>
  );

  const renderGenderField = () => (
    <Field id="gender" label="Gender">
      {(genderDropdownProps) => (
        <DropdownMenu
          {...genderDropdownProps}
          name="gender"
          isDisabled={submitting}
          // Data
          menuItems={GENDERS}
        />
      )}
    </Field>
  );

  const renderEmailField = () => (
    <Field id="email" label="Email" isRequired invalidFieldMessage={actionData?.errorMsgs?.email}>
      {(inputProps) => (
        <TextField
          {...inputProps}
          type="email"
          name="email"
          placeholder="Enter student's email name"
          isInvalid={Boolean(actionData?.errorMsgs?.email)}
          isDisabled={submitting}
        />
      )}
    </Field>
  );

  const renderBirthdayField = () => (
    <Field id="date-of-birth" label="Birthday" isRequired invalidFieldMessage={actionData?.errorMsgs?.date_of_birth}>
      {(inputProps) => (
        <DatePicker
          {...inputProps}
          name="date_of_birth"
          isDisabled={submitting}
          min={minDate}
          max={maxDate}
          isInvalid={Boolean(actionData?.errorMsgs?.date_of_birth)}
        />
      )}
    </Field>
  );

  return (
    <Modal size="large">
      <Form method="post">
        <ModalHeader showCloseButton>
          <ModalTitle>Add a new student</ModalTitle>
        </ModalHeader>
        <StyledCustomModalBody>
          <StyledColumn>
            {renderFirstNameField()}
            {renderLastNameField()}
            {renderGenderField()}
          </StyledColumn>
          <StyledColumn>
            {renderEmailField()}
            {renderBirthdayField()}
            <Button
              type="submit"
              isLoading={submitting}
              style={{ top: "22px", position: "relative", display: "flex" }}
              fullWidth
            >
              Add new student
            </Button>
            <StyledRequiredFields>
              <RequiredAsterisk /> Required fields
            </StyledRequiredFields>
          </StyledColumn>
        </StyledCustomModalBody>
      </Form>
    </Modal>
  );
};

export { action, AddStudentModal, defaultStudentData };
export type { IStudentData, IStudentErrors };

