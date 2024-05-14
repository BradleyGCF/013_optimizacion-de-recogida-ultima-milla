import * as yup from "yup";
import { passwordRules } from ".";

export const LoginScheme = yup.object().shape({
  username: yup
    .string()
    .min(5, "Decription Collection must be at least 5 characters long")
    .max(200, "Decription Collection must contain a maximum of 200 characters")
    .required("Required, Please Enter decription Collection"),
  // .string()
  // .max(255)
  // .required("Email is required")
  // .matches(/^[^@]+@[^@]+\.[^@]+$/, "Email must contain '@' before '.'"),
  password: yup
    .string()
    .required("Required, Please Enter your password")
    .matches(
      passwordRules,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});
