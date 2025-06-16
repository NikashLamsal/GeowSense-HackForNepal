import * as yup from "yup";

export const registerUserSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is a required.")
    .trim()
    .lowercase()
    .max(100, "Email must not exceed 100 characters."),

  password: yup
    .string()
    .required("Password is a required.")
    .trim()
    .min(8, "Password must be at least 8 characters.")
    .max(30, "Password must not exceed 30 characters."),

  firstName: yup
    .string()
    .required("First name is required.")
    .trim()
    .max(100, "First name must not exceed 100 characters."),

  lastName: yup
    .string()
    .required("Last name is required.")
    .trim()
    .max(100, "Last name must not exceed 100 characters."),
});
