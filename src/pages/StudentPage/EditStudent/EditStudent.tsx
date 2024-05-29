import {
  Form,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { Field } from "../../../components/form/Field";
import { TextField } from "../../../components/TextField";
import styled from "styled-components";
import { Button } from "../../../components/buttons/Button";
import { useStudentUid } from "../../StudentsPage/StudentsPage";
import { CgClose } from "react-icons/cg";
import { Heading1 } from "../../../components/text/Heading1";
import { IStudentFetchData } from "../StudentPage";

interface EditStudentProps {}

const StyledCloseIcon = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 101;
  cursor: pointer;
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
}}
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

const StyledStudentDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 40px;

  @media (max-width: 500px) {
    padding: 0 20px;
  }
`;

const EditStudent = () => {
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";
  const loaderData: IStudentFetchData | undefined =
    useLoaderData() as IStudentFetchData;
  const { setStudentUid } = useStudentUid();
  const navigate = useNavigate();

  const handleCloseStudentPanel = () => {
    // Reset the studentUid to remove css property pointer-events: none from the students page.
    setStudentUid("");
    navigate("/students");
  };

  return (
    <>
      {/* TODO: make this a component. It's used twice */}
      <StyledCloseIcon>
        <Button
          appearance="link-with-background"
          size="large"
          iconBefore={<CgClose style={{ width: "16px", height: "16px" }} />}
          onClick={handleCloseStudentPanel}
        />
      </StyledCloseIcon>
      <StyledStudentOverlay>
        <StyledHeading1>
          {loaderData?.studentData.firstName} {loaderData?.studentData.lastName}
        </StyledHeading1>
        <StyledStudentDataWrapper>
          <Form method="post">
            <Field
              id="first-name"
              label="First name"
              direction="row"
              invalidFieldMessage="" // TODO: add error message
            >
              {(inputProps) => (
                <TextField
                  type="text"
                  name="first_name"
                  defaultValue={loaderData?.studentData.firstName}
                  placeholder="Enter student's first name"
                  isDisabled={submitting}
                  {...inputProps}
                />
              )}
            </Field>
            <Field
              id="last-name"
              label="Last name"
              direction="row"
              invalidFieldMessage="" // TODO: add error message
            >
              {(inputProps) => (
                <TextField
                  type="text"
                  name="last_name"
                  defaultValue={loaderData?.studentData.lastName}
                  placeholder="Enter student's last name"
                  isDisabled={submitting}
                  {...inputProps}
                />
              )}
            </Field>
            <Field
              id="email"
              label="Email"
              direction="row"
              invalidFieldMessage="" // TODO: add error message
            >
              {(inputProps) => (
                <TextField
                  type="email"
                  name="email"
                  defaultValue={loaderData?.studentData.email}
                  placeholder="Enter student's email name"
                  isDisabled={submitting}
                  {...inputProps}
                />
              )}
            </Field>
            <Field
              id="gender"
              label="Gender"
              direction="row"
              invalidFieldMessage="" // TODO: add error message
            >
              {(inputProps) => (
                <TextField
                  type="text"
                  name="gender"
                  defaultValue={loaderData?.studentData.gender}
                  placeholder="Enter student's gender"
                  isDisabled={submitting}
                  {...inputProps}
                />
              )}
            </Field>
            <Field
              id="date-of-birth"
              label="Birthday"
              direction="row"
              invalidFieldMessage="" // TODO: add error message
            >
              {(inputProps) => (
                <input
                  type="date"
                  name="date_of_birth"
                  defaultValue={loaderData?.studentData.dateOfBirth}
                  placeholder="Enter student's gender"
                  isDisabled={submitting}
                  {...inputProps}
                />
              )}
            </Field>
            <div>
              <Button type="submit" isLoading={submitting}>
                Save
              </Button>
              <Button
                type="button"
                appearance="secondary"
                isLoading={submitting}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </StyledStudentDataWrapper>
      </StyledStudentOverlay>
      <StyledStudentPageCover />
    </>
  );
};

export { EditStudent };
