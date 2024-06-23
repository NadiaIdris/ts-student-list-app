import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
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
import { STUDENTS_ENDPOINT } from "../../../api/apiConstants";
import { axiosInstance } from "../../../api/axiosConfig";
import { Button } from "../../../components/Button";
import { DatePicker } from "../../../components/form/DatePicker";
import { DropdownMenu } from "../../../components/form/DropdownMenu";
import { ItemsRef, RefsContainer, SelectedRef } from "../../../components/form/DropdownMenu/DropdownMenu";
import { Direction, Field } from "../../../components/form/Field";
import { Heading1 } from "../../../components/text/Heading1";
import { TextField } from "../../../components/TextField";
import { useStudentUid } from "../../StudentsPage/StudentsPage";
import { IStudentFetchData } from "../StudentPanel";
import { generateErrorMessagesObject, removeWhiteSpace } from "../../../utils/utils";
import { defaultStudentData, IStudentData, IStudentErrors } from "../../AddStudentModal";
import { validateStudentData } from "../../../validation/validate";

const GENDERS = ["Female", "Male", "Agender", "Cisgender", "Genderfluid", "Genderqueer", "Non-binary", "Transgender"];

interface IEditStudent {
  errorMsgs: IStudentErrors;
}

async function action({ request, params }: { request: Request; params: Params }) {
  let formData = await request.formData();
  // Trim the white spaces from all the form data
  const trimmedStudentData = removeWhiteSpace(formData) as unknown as IStudentData;
  // Validate the student data before sending it to the server.
  const { error } = validateStudentData(trimmedStudentData);

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
  margin: 40px 0 20px 0;

  @media (max-width: 500px) {
    padding: 0 20px;
    margin: 20px 0 10px 0;
  }
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
  const { setStudentUid } = useStudentUid();
  const navigate = useNavigate();
  const [fieldDirection, setFieldDirection] = useState<Direction>("row");
  const [selectedGender, setSelectedGender] = useState(loaderData?.studentData.gender || "");
  const [genderDropdownIsOpen, setGenderDropdownIsOpen] = useState(false);

  // Refs for the selects and options.
  const genderItemsRef: ItemsRef = useRef([] as HTMLButtonElement[]);
  const genderSelectedRef: SelectedRef = useRef(null);
  let container: RefsContainer = {
    itemsRef: genderItemsRef,
    selectedRef: genderSelectedRef,
  };
  const genderRefsObj = useRef(container);

  const handleCloseStudentPanel = () => {
    // Reset the studentUid to remove css property pointer-events: none from the students page.
    setStudentUid("");
    navigate("/students");
  };

  const scrollToSelectedMenuItem = () => {
    /* Find index is assuming that there is only one instance of a string in an array. If more
      than one instance of the same string, the findIndex method returns the index of the first match.  */
    const selectedOptionIndex = GENDERS.findIndex((gender) => gender === selectedGender);
    // Add a timeout to make sure async setGenderDropdownIsOpen is called first and then our setTimeout is called next from the JS event loop.
    setTimeout(() => {
      if (genderItemsRef.current[selectedOptionIndex]) {
        genderItemsRef.current[selectedOptionIndex].focus();
        genderItemsRef.current[selectedOptionIndex].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }, 0);
  };

  const handleSelectedMenuItemClick = (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Prevent propagating of the click event to outer elements in the container.
    event.stopPropagation();
    setGenderDropdownIsOpen((prev) => {
      if (!prev) {
        scrollToSelectedMenuItem();
      }
      genderSelectedRef.current?.focus();
      return !prev;
    });
  };

  const handleSelectedMenuItemKeyDown: HandleSelectKeyDown = (event) => {
    event.preventDefault();

    if (event.key === "Enter") {
      setGenderDropdownIsOpen((prev) => {
        const isOpen = !prev;
        if (isOpen) scrollToSelectedMenuItem();
        return !prev;
      });
    }

    if (genderDropdownIsOpen) {
      if (event.key === "ArrowDown") {
        let button = genderItemsRef.current[0];
        button?.focus();
      }

      if (event.key === "Escape") {
        setGenderDropdownIsOpen(false);
      }
    }
  };

  const handleDropdownMenuItemClick = (item: string) => {
    setSelectedGender(item);
    setGenderDropdownIsOpen((prev) => !prev);
    genderSelectedRef.current?.focus();
  };

  const handleDropdownMenuItemKeyDown: HandleOptionKeyDown = (event, index) => {
    event.preventDefault();
    const optionsLength = genderItemsRef.current.length;

    if (event.key === "Enter") {
      const item = genderItemsRef.current[index].textContent;
      if (item) setSelectedGender(item);
      setGenderDropdownIsOpen(false);
      genderSelectedRef.current?.focus();
    }

    if (event.key === "ArrowDown") {
      const lastMenuItemIdx = optionsLength - 1;
      if (index < lastMenuItemIdx) {
        genderItemsRef.current[index + 1].focus();
      }
    }

    if (event.key === "ArrowUp") {
      if (index > 0) genderItemsRef.current[index - 1].focus();
      if (index === 0) genderSelectedRef.current?.focus();
    }

    if (event.key === "Escape") {
      setGenderDropdownIsOpen(false);
      if (genderSelectedRef.current) genderSelectedRef.current?.focus();
    }

    // TODO: implement custom Tab behavior following the behavior of ArrowDown and ArrowUp.
  };

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

  return (
    <>
      <StyledCloseIcon>
        <Button
          appearance="link-with-background"
          size="medium"
          iconBefore={<CgClose style={{ width: "24px", height: "24px" }} />}
          onClick={handleCloseStudentPanel}
          ariaLabel="Close student panel"
          tooltip="Close student panel  "
        />
      </StyledCloseIcon>
      <StyledStudentOverlay>
        <StyledHeading1>Edit</StyledHeading1>
        <StyledStudentDataWrapper>
          <Form method="put">
            <StyledFieldsWrapper>
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
              <Field id="gender-dropdown" label="Gender" direction={fieldDirection}>
                {(inputProps) => (
                  <DropdownMenu
                    {...inputProps}
                    name="gender"
                    ref={genderRefsObj}
                    isOpen={genderDropdownIsOpen}
                    isDisabled={submitting}
                    // Function component state setters
                    setSelectedGender={setSelectedGender}
                    setGenderDropdownIsOpen={setGenderDropdownIsOpen}
                    // Data
                    menuItems={GENDERS}
                    selectedMenuItem={selectedGender}
                    // MouseEvent callbacks
                    onSelectedMenuItemClick={handleSelectedMenuItemClick}
                    onDropdownMenuItemClick={handleDropdownMenuItemClick}
                    // KeyboardEvent callbacks
                    onSelectedMenuItemKeyDown={handleSelectedMenuItemKeyDown}
                    onDropdownMenuItemKeyDown={handleDropdownMenuItemKeyDown}
                  />
                )}
              </Field>
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
      </StyledStudentOverlay>
      <StyledStudentPageCover />
    </>
  );
};

export { GENDERS, StudentEditPanel, action };
export type { HandleOptionKeyDown, HandleSelectKeyDown };
