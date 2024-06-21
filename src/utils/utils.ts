const removeWhiteSpace = (formData: FormData) => {
  return Object.fromEntries(
    [...formData.entries()].map(([key, value]) => [
      key,
      value.toString().trim(),
    ])
  );
};

export { removeWhiteSpace };