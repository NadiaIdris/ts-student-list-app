import { OptionsRef, SelectedRef } from "../Dropdown";

interface OptionsProps {
  isOpen: boolean;
  optionsRef: OptionsRef;
  selectedRef: SelectedRef;
}

const Options = ({ isOpen, optionsRef, selectedRef }: OptionsProps) => {
  return null;
  //   return (
  //     <>
  //       {isOpen && (
  //         <div
  //           className={`options-container ${
  //             optionsHeight >= 200 ? "show-y-scrolling" : ""
  //           }`}
  //         >
  //           {options.length > 0 &&
  //             options.map((option, index) => (
  //               <Option
  //                 // formFields={formFields}
  //                 // id={id}
  //                 index={index}
  //                 key={option.id}
  //                 options={options}
  //                 optionsRef={optionsRef}
  //                 selectedRef={selectedRef}
  //                 // setFormFields={setFormFields}
  //                 // setSelectIsOpen={setIsOpen}
  //                 // {...rest}
  //               />
  //             ))}
  //           {options.length === 0 && (
  //             <>
  //               <div className="skeleton-option skeleton">Loading ...</div>
  //               <div className="skeleton-option skeleton">Loading ...</div>
  //               <div className="skeleton-option skeleton">Loading ...</div>
  //               <div className="skeleton-option skeleton">Loading ...</div>
  //               <div className="skeleton-option skeleton">Loading ...</div>
  //             </>
  //           )}
  //         </div>
  //       )}
  //     </>
  //   );
};

export { Options };
