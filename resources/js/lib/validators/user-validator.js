import * as yup from "yup";
import "yup-phone-lite";

export const userSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email().required("Required"),
  password: yup.string().required("Required"),
  contact_no: yup
    .string()
    .phone("PH", "Please enter a valid phone number for region PH")
    .required("Required"),
  group_id: yup.number().required("Required"),
  is_active: yup
    .number()
    .oneOf([0, 1], "Status should only be active or inactive")
    .required("Required"),
});
