import yup from "yup";

export const loginCredentialSchema = yup.object({
  email: yup.string().email().required().trim().lowercase(),
  password: yup.string().required().trim(),
});

export const registerCredentialSchema = yup.object({
  email: yup.string().email().required().trim().lowercase().max(255),
  password: yup.string().required().trim().min(8).max(30),
  firstName: yup.string().required().trim().max(30),
  lastName: yup.string().required().trim().max(30),
});
