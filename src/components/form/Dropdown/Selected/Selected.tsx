import { MutableRefObject } from "react";
import { FaCaretDown } from "react-icons/fa";
import { OptionsRef, SelectedRef } from "../Dropdown";

interface SelectProps {
  // isDisabled: boolean;
  // isOpen: boolean;
  // handleSelectClick: HandleSelectClick;
  // handleSelectKeyDown: HandleSelectKeyDown;
  // options: TOption[];
  optionsRef: OptionsRef
  selectedRef: SelectedRef
  placeholder?: string;
  // selectedOption: TOption | null;
  // setIsOpen: (isOpen: boolean) => void;
}

const Selected = ({
  // isDisabled,
  // isOpen,
  // handleSelectClick,
  // handleSelectKeyDown,
  // options,
  // optionsRef,
  // selectedOption,
  // selectedRef,
  // setIsOpen,
  // placeholder = "Choose one",
}: SelectProps) => {
  return null;
//   return (
    // <input
    //   read-only="true"
    //   aria-label="Select"
      // className={
      //   isOpen ? "select-header select-header-options-open" : "select-header"
      // }
      // ref={selectedRef}
      // onClick={(event) =>
      //   handleSelectClick(
      //     event,
      //     isOpen,
      //     options,
      //     optionsRef,
      //     placeholder,
      //     selectedOption,
      //     setIsOpen
      //   )
      // }
      // onKeyDown={(event: any) =>
      //   handleSelectKeyDown(
      //     event,
      //     isOpen,
      //     options,
      //     optionsRef,
      //     placeholder,
      //     selectedOption,
      //     setIsOpen
      //   )
      // }
      // disabled={isDisabled}
    //   defaultValue={
    //     selectedOption === null ? placeholder : selectedOption.label
    //   }
    // >
    //   <div>{selectedOption === null ? placeholder : selectedOption.label}</div>
    //   <div className={`arrow ${isOpen ? "arrow-up" : ""}`}>
    //     <FaCaretDown style={{ width: "16px", height: "16px" }} />
    //   </div>
    // </input>
  // );
};

export { Selected };
