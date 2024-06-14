import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { Form, useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../../components/Button";
import { DropdownMenu } from "../../../components/form/DropdownMenu";
import { OptionsRef, RefsContainer, SelectedRef } from "../../../components/form/DropdownMenu/DropdownMenu";
import { Field, FormFieldDirection } from "../../../components/form/Field";
import { Heading1 } from "../../../components/text/Heading1";
import { TextField } from "../../../components/TextField";
import { useStudentUid } from "../../StudentsPage/StudentsPage";
import { IStudentFetchData } from "../StudentPanel";

// TODO: ensure that automatic data revalidation happens when the user edits the student data.
export async function action({ request }: { request: Request }) {
  let formData = await request.formData();
  console.log("formData: ", formData);
}

export type ToggleSelectIsOpen = (
  genderDropdownIsOpen: boolean,
  genders: string[],
  genderOptionsRef: OptionsRef,
  placeholder: string,
  selectedOption: string | null,
  setGenderDropdownIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => void;

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

  @media (max-width: 500px) {
    padding: 0 20px;
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

const StudentEditPanel = () => {
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";
  const loaderData: IStudentFetchData | undefined = useLoaderData() as IStudentFetchData;
  const { setStudentUid } = useStudentUid();
  const navigate = useNavigate();
  const [fieldDirection, setFieldDirection] = useState<FormFieldDirection>("row");
  const genders = ["Female", "Male", "Agender", "Cisgender", "Genderfluid", "Genderqueer", "Non-binary", "Transgender"];
  const [selectedGender, setSelectedGender] = useState(loaderData?.studentData.gender || "");
  const [genderDropdownIsOpen, setGenderDropdownIsOpen] = useState(false);

  // Refs for the selects and options.
  const genderOptionsRef: OptionsRef = useRef([] as HTMLButtonElement[]);
  const genderSelectedRef: SelectedRef = useRef(null);
  let container: RefsContainer = {
    optionsRef: genderOptionsRef,
    selectedRef: genderSelectedRef,
  };
  const genderRefsObj = useRef(container);

  const handleCloseStudentPanel = () => {
    // Reset the studentUid to remove css property pointer-events: none from the students page.
    setStudentUid("");
    navigate("/students");
  };

  const toggleSelectIsOpen: ToggleSelectIsOpen = (
    genderDropdownIsOpen,
    genders,
    genderOptionsRef,
    placeholder,
    selectedGender,
    setGenderDropdownIsOpen
  ) => {
    if (genderDropdownIsOpen) {
      setGenderDropdownIsOpen(false);
      return;
    }
    setGenderDropdownIsOpen(true);
    console.log("selectedGender: ", selectedGender);
    // TODO: selectedGender will never equal placeholder
    // Run this code only when something is selected.
    if (selectedGender !== "") {
      console.log("selectedGender !== '': ", selectedGender !== "");
      /* Find index is assuming that there is only one instance of a string in an array. If more
      than one instance of the same string, the findIndex method returns the index of the first match.  */
      const selectedOptionIndex = genders.findIndex((gender) => gender === selectedGender);
      // Add a timeout to make sure async setIsOpen is called first and then our setTimeout is called next from the JS event loop.
      setTimeout(() => {
        if (genderOptionsRef.current[selectedOptionIndex]) {
          console.log(
            "Inside toggleSelectIsOpen genderOptionsRef.current[selectedOptionIndex]: ",
            genderOptionsRef.current[selectedOptionIndex]
          );
          // TODO: the component doesn't get focused for some reason, but the console.log above gets
          // logged.
          genderOptionsRef.current[selectedOptionIndex].focus();
          genderOptionsRef.current[selectedOptionIndex].scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }, 0);
    }
  };

  const handleSelectedMenuItemClick = (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Prevent propagating of the click event to outer elements in the container.
    event.stopPropagation();
    setGenderDropdownIsOpen((prev) => !prev);
    // toggleSelectIsOpen(
    //   genderDropdownIsOpen,
    //   genders,
    //   genderOptionsRef,
    //   "Choose one",
    //   selectedGender,
    //   setGenderDropdownIsOpen
    // );
    genderSelectedRef.current?.focus();
  };

  const handleSelectedMenuItemKeyDown: HandleSelectKeyDown = (
    event
    // genderDropdownIsOpen,
    // genders,
    // genderOptionsRef,
    // placeholder,
    // selectedGender,
    // setGenderDropdownIsOpen
  ) => {
    console.dir(event);

    event.preventDefault();

    if (event.key === "Enter") {
      // event.preventDefault();
      toggleSelectIsOpen(
        genderDropdownIsOpen,
        genders,
        genderOptionsRef,
        "Choose one",
        selectedGender,
        setGenderDropdownIsOpen
      );
    }

    if (genderDropdownIsOpen) {
      if (event.key === "ArrowDown") {
        let button = genderOptionsRef.current[0];
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

  const handleDropdownMenuItemKeyDown: HandleOptionKeyDown = (
    event,
    // formFields,
    index
    // key,
    // item,
    // optionsRef,
    // selectRef,
    // setFormFields,
    // setSelectedOption,
    // setSelectIsOpen
  ) => {
    const optionsLength = genderOptionsRef.current.length;

    if (event.key === "Enter") {
      event.preventDefault();
      const item = genderOptionsRef.current[index].textContent;
      item && setSelectedGender(item);
      setGenderDropdownIsOpen(false);
      genderSelectedRef.current?.focus();
    }

    if (event.key === "ArrowDown") {
      if (index < optionsLength - 1) {
        // TODO: Find the next non disabled option and focus on it.
        if (genderOptionsRef.current[index + 1].disabled) {
          // findNextNonDisabledOption(index + 1).focus();
        } else {
          // Focus the next option.
          if (genderSelectedRef.current !== null) {
            genderOptionsRef.current[index + 1].focus();
          }
        }
      }
      event.preventDefault();
    }

    if (event.key === "ArrowUp") {
      // TODO: Implement findPreviousNonDisabledOption function.
      if (index > 0) {
        genderOptionsRef.current[index - 1].focus();
      }
      if (index === 0) {
        genderSelectedRef.current?.focus();
      }
      event.preventDefault();
    }

    if (event.key === "Escape") {
      setGenderDropdownIsOpen(false);
      if (genderSelectedRef.current !== null) {
        genderSelectedRef.current?.focus();
      }
    }
  };

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
      {/* TODO: make this a component. It's used twice */}
      <StyledCloseIcon>
        <Button
          appearance="link-with-background"
          size="medium"
          iconBefore={<CgClose style={{ width: "16px", height: "16px" }} />}
          onClick={handleCloseStudentPanel}
        />
      </StyledCloseIcon>
      <StyledStudentOverlay>
        <StyledHeading1>Edit</StyledHeading1>
        <StyledStudentDataWrapper>
          <Form method="post">
            <StyledFieldsWrapper>
              <Field
                id="first-name"
                label="First name"
                direction={fieldDirection}
                invalidFieldMessage="" // TODO: add error message
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    type="text"
                    name="first_name"
                    defaultValue={loaderData?.studentData.firstName}
                    placeholder="Enter student's first name"
                    isDisabled={submitting}
                  />
                )}
              </Field>
              <Field
                id="last-name"
                label="Last name"
                direction={fieldDirection}
                invalidFieldMessage="" // TODO: add error message
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    type="text"
                    name="last_name"
                    defaultValue={loaderData?.studentData.lastName}
                    placeholder="Enter student's last name"
                    isDisabled={submitting}
                  />
                )}
              </Field>
              <Field
                id="email"
                label="Email"
                direction={fieldDirection}
                invalidFieldMessage="" // TODO: add error message
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    type="email"
                    name="email"
                    defaultValue={loaderData?.studentData.email}
                    placeholder="Enter student's email name"
                    isDisabled={submitting}
                  />
                )}
              </Field>
              <Field id="gender-dropdown" label="Gender" direction={fieldDirection} invalidFieldMessage="">
                {(inputProps) => (
                  <DropdownMenu
                    {...inputProps}
                    ref={genderRefsObj}
                    isOpen={genderDropdownIsOpen}
                    isDisabled={submitting}
                    // Function component state setters
                    setSelectedGender={setSelectedGender}
                    setGenderDropdownIsOpen={setGenderDropdownIsOpen}
                    // Data
                    menuItems={genders}
                    selectedMenuItem={selectedGender}
                    // MouseEvent callbacks
                    onSelectedMenuItemClick={handleSelectedMenuItemClick}
                    onDropdownMenuItemClick={handleDropdownMenuItemClick}
                    // TODO: implement these
                    // KeyboardEvent callbacks
                    onSelectedMenuItemKeyDown={handleSelectedMenuItemKeyDown}
                    onDropdownMenuItemKeyDown={handleDropdownMenuItemKeyDown}
                  />
                )}
              </Field>
              {/* <Field
                id="gender-dropdown"
                label="Gender"
                direction={fieldDirection}
                invalidFieldMessage=""
              >
                {(inputProps) => (
                  <Dropdown
                    {...inputProps}
                    ref={genderRefsObj}
                    // formFields={formFields}
                    // id={name}
                    // isOpen={nameSelectIsOpen}
                    // handleOptionClick={handleOptionClick}
                    // handleSelectKeyDown={handleSelectKeyDown}
                    // handleSelectClick={handleSelectClick}
                    // handleOptionKeyDown={handleOptionKeyDown}
                    // isDisabled={isSubmitting}
                    // options={names}
                    // selectedOption={formFields.name}
                    // setFormFields={setFormFields}
                    // setIsOpen={setNameSelectIsOpen}
                    // setSelectedOption={handleSetSelectedOption}
                  />
                )}
              </Field> */}
              <Field
                id="date-of-birth"
                label="Birthday"
                direction={fieldDirection}
                invalidFieldMessage="" // TODO: add error message
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="date"
                    name="date_of_birth"
                    defaultValue={loaderData?.studentData.dateOfBirth}
                    placeholder="Enter student's gender"
                    disabled={submitting}
                  />
                )}
              </Field>
            </StyledFieldsWrapper>
            <div>
              <Button type="submit" isLoading={submitting}>
                Save
              </Button>
              <Button type="button" appearance="secondary" isLoading={submitting}>
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

export { StudentEditPanel };
export type { HandleOptionKeyDown, HandleSelectKeyDown };
