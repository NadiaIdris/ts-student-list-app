import { MutableRefObject } from "react";

interface OptionProps {
  // formFields: FormFields;
  // handleOptionClick: HandleOptionClick;
  // handleOptionKeyDown: HandleOptionKeyDown;
  // id: keyof FormFields;
  index: number;
  // key: number; // React needs a key prop for each child.
  // options: TOption[];
  optionsRef: MutableRefObject<HTMLButtonElement[]>;
  selectedRef: MutableRefObject<HTMLInputElement | null>;
  // setFormFields: (formFields: FormFields) => void;
  // setSelectedOption: HandleSetSelectedOption;
  // setSelectIsOpen: (isOpen: boolean) => void;
}

const Option = ({
  // formFields,
  // handleOptionClick,
  // handleOptionKeyDown,
  // id,
  index,
  // options,
  optionsRef,
  selectedRef,
}: // setFormFields,
// setSelectedOption,
// setSelectIsOpen,
OptionProps) => {
  // const option = options[index];
  return (
    <button
      ref={(el: HTMLButtonElement) => {
        optionsRef.current[index] = el;
      }}
      className="option"
      onClick={(event: any) => {
        // handleOptionClick(
        //   event,
        //   formFields,
        //   id,
        //   option,
        //   selectedRef,
        //   setFormFields,
        //   setSelectedOption,
        //   setSelectIsOpen
        // )
      }}
      onKeyDown={(event: any) => {
        //   handleOptionKeyDown(
        //   event,
        //   formFields,
        //   index,
        //   id,
        //   option,
        //   optionsRef,
        //   selectedRef,
        //   setFormFields,
        //   setSelectedOption,
        //   setSelectIsOpen
        // )
      }}
    >
      {/* {option.label} */}
    </button>
  );
};

export { Option };
