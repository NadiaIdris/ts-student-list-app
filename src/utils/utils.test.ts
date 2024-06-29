import { trimWhiteSpace } from "./utils";

describe("trimWhiteSpace", () => { 
  it("should remove white spaces from the start and end of fields", () => {
    // Populate the form data
    const formData = new FormData();
    formData.append("email", "      test@example.com     ");
    formData.append("password", "      password123     ");
    // Trim the white spaces from the email and password
    const trimmedData = trimWhiteSpace(formData);
    // Check if the white spaces have been removed
    expect(trimmedData.email).toEqual("test@example.com");
    expect(trimmedData.password).toEqual("password123");
  });

  it("should remove white spaces from the start of fields", () => {
    // Populate the form data
    const formData = new FormData();
    formData.append("email", "      test@example.com");
    formData.append("password", "      password123");
    // Trim the white spaces from the email and password
    const trimmedData = trimWhiteSpace(formData);
    // Check if the white spaces have been removed
    expect(trimmedData.email).toEqual("test@example.com");
    expect(trimmedData.password).toEqual("password123");
  });

  it("should remove white spaces from the end of fields", () => {
    // Populate the form data
    const formData = new FormData();
    formData.append("email", "test@example.com      ");
    formData.append("password", "password123      ");
    // Trim the white spaces from the email and password
    const trimmedData = trimWhiteSpace(formData);
    // Check if the white spaces have been removed
    expect(trimmedData.email).toEqual("test@example.com");
    expect(trimmedData.password).toEqual("password123");
  });
});