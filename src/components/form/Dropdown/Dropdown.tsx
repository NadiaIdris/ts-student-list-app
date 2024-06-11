import { forwardRef, MutableRefObject } from "react";
import { Options } from "./Options";
import { Selected } from "./Selected";

type OptionsRef = MutableRefObject<HTMLButtonElement[] | null>;
type SelectedRef = MutableRefObject<HTMLInputElement | null>;

interface RefsContainer {
  // Wrapped for use with forwardRef.
  optionsRef: OptionsRef;
  selectedRef: SelectedRef;
}

interface DropdownProps {
  // formFields: FormFields;
  // id: keyof FormFields;
  isOpen: boolean;
  // /* TODO: gets passed down */
  // handleOptionClick: HandleOptionClick;
  // /* TODO: gets passed down */
  // handleOptionKeyDown: HandleOptionKeyDown;
  // handleSelectClick: HandleSelectClick;
  // handleSelectKeyDown: HandleSelectKeyDown;
  // isDisabled: boolean;
  // options: TOption[];
  placeholder?: string; // Placeholder for the select button.
  // selectedOption: TOption | null;
  // setFormFields: (formFields: FormFields) => void;
  // setIsOpen: (isOpen: boolean) => void;
  // /* TODO: gets passed down */
  // setSelectedOption: HandleSetSelectedOption;
}

const Dropdown = forwardRef<any, DropdownProps>(
  (
    {
      // formFields,
      // id,
      isOpen,
      // handleSelectClick,
      // handleSelectKeyDown,
      // isDisabled,
      // options,
      placeholder,
      // selectedOption,
      // setFormFields,
      // setIsOpen,
      ...rest
    },
    ref
  ) => {
    const { optionsRef, selectedRef } = (ref as MutableRefObject<RefsContainer>)
      ?.current;

    return (
      <div>
        <Selected
          optionsRef={optionsRef}
          selectedRef={selectedRef}
          placeholder={placeholder}
        />
        <Options
          optionsRef={optionsRef}
          selectedRef={selectedRef}
          isOpen={isOpen}
        />
      </div>
    );
  }
);

export { Dropdown };
export type { OptionsRef, RefsContainer, SelectedRef };
