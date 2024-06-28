import { ValidationErrorItem } from "joi";

const trimWhiteSpace = (formData: FormData) => {
  const trimmedData: { [key: string]: string } = {};
  for (const [formKey, formValue] of formData.entries()) {
    trimmedData[formKey] = formValue.toString().trim();
  }
  return trimmedData;
};

const generateErrorMessagesObject = (errorMsgsArr: ValidationErrorItem[], defaultData: any) => {
  const errorMsgs = errorMsgsArr.reduce((acc, detail) => {
    /* detail object is of type Joi.ValidationErrorItem. It has properties like context, message, path and type. Inside the context are
    properties key, label and value. */
    if (detail.context?.key) {
      return { ...acc, [detail.context.key]: detail.message };
    }
    return acc;
  }, defaultData);
  return errorMsgs;
};

export { trimWhiteSpace, generateErrorMessagesObject };
