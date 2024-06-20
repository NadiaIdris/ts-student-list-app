import { Form, useNavigation } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { ModalHeader } from "../../components/Modal/ModalHeader";
import { ModalTitle } from "../../components/Modal/ModalHeader/ModalTitle";
import { Button } from "../../components/Button";
import { ModalBody } from "../../components/Modal/ModalBody";
import { Field } from "../../components/form/Field";
import { TextField } from "../../components/TextField";
import styled from "styled-components";
import { useRef, useState } from "react";
import { DropdownMenu } from "../../components/form/DropdownMenu";
import { GENDERS } from "../StudentPanel/StudentEditPanel";
import { ItemsRef, SelectedRef } from "../../components/form/DropdownMenu/DropdownMenu";
import { MouseEvent } from "react";
import { DatePicker } from "../../components/form/DatePicker";

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1 0 200px;
`;

const AddStudentModal = () => {
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";
  const [genderDropdownIsOpen, setGenderDropdownIsOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  // Refs for the selects and options. const genderRef
  const genderSelectedRef: SelectedRef = useRef(null);
  const genderItemsRef: ItemsRef = useRef([] as HTMLButtonElement[]);
  const refContainer = { selectedRef: genderSelectedRef, itemsRef: genderItemsRef };
  const genderRefsObj = useRef(refContainer);

  // TODO: make this a reusable hook for all dropdowns (another copy is in StudentEditPanel.tsx)
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

  // TODO: make this a reusable hook for all dropdowns (another copy is in StudentEditPanel.tsx)
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

  // TODO: make this a reusable hook for all dropdowns + key down events (another copy is in StudentEditPanel.tsx)
  const handleDropdownMenuItemClick = (item: string) => {
    setSelectedGender(item);
    setGenderDropdownIsOpen((prev) => !prev);
    genderSelectedRef.current?.focus();
  };

  const renderFirstNameField = () => (
    <Field
      id="first-name"
      label="First Name"
      isRequired
      // TODO: add the invalidFieldMessage prop for all the fields
      // invalidFieldMessage={actionData?.errorMsgs?.first_name}
    >
      {({ inputProps }) => (
        <TextField
          {...inputProps}
          placeholder="Enter student's first name"
          name="first_name"
          // TODO: add the isInvalid prop for all the fields
          // isInvalid={Boolean(actionData?.errorMsgs?.first_name)}
          isDisabled={submitting}
        />
      )}
    </Field>
  );

  const renderLastNameField = () => (
    <Field id="last-name" label="Last Name" isRequired>
      {({ inputProps }) => (
        <TextField {...inputProps} placeholder="Enter student's last name" name="last_name" isDisabled={submitting} />
      )}
    </Field>
  );

  const renderGenderField = () => (
    <Field id="gender" label="Gender">
      {(genderDropdownProps) => (
        <DropdownMenu
          {...genderDropdownProps}
          name="gender"
          ref={genderRefsObj}
          isOpen={genderDropdownIsOpen}
          isDisabled={submitting}
          // Data
          menuItems={GENDERS}
          selectedMenuItem={selectedGender}
          // MouseEvent callbacks
          onSelectedMenuItemClick={handleSelectedMenuItemClick}
          onDropdownMenuItemClick={handleDropdownMenuItemClick}
          // Function component state setters
          setSelectedGender={setSelectedGender}
          setGenderDropdownIsOpen={setGenderDropdownIsOpen}
        />
      )}
    </Field>
  );

  const renderEmailField = () => (
    <Field
      id="email"
      label="Email"
      isRequired
      invalidFieldMessage="" // TODO: add error message
    >
      {(inputProps) => (
        <TextField
          {...inputProps}
          type="email"
          name="email"
          // defaultValue={loaderData?.studentData.email}
          placeholder="Enter student's email name"
          isDisabled={submitting}
        />
      )}
    </Field>
  );

  const renderBirthdayField = () => (
    <Field
      id="date-of-birth"
      label="Birthday"
      isRequired
      invalidFieldMessage="" // TODO: add error message
    >
      {(inputProps) => (
        <DatePicker
          {...inputProps}
          name="date_of_birth"
          // defaultValue={dateOfBirth}
          isDisabled={submitting}
          // min={minDate}
          // max={maxDate}
        />
      )}
    </Field>
  );

  return (
    <Modal size="large">
      <Form>
        <ModalHeader showCloseButton>
          <ModalTitle>Add a new student</ModalTitle>
        </ModalHeader>
        <ModalBody direction="row">
          <StyledColumn>
            {renderFirstNameField()}
            {renderLastNameField()}
            {renderGenderField()}
          </StyledColumn>
          <StyledColumn>
            {renderEmailField()}
            {renderBirthdayField()}
            <Button type="submit" isLoading={submitting}>
              Add student
            </Button>
          </StyledColumn>
        </ModalBody>
      </Form>
    </Modal>
  );
};

export { AddStudentModal };
