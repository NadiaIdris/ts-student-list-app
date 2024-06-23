import { ValidationErrorItem } from "joi";

const removeWhiteSpace = (formData: FormData) => {
  return Object.fromEntries(
    [...formData.entries()].map(([key, value]) => [
      key,
      value.toString().trim(),
    ])
  );
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


export { removeWhiteSpace, generateErrorMessagesObject };