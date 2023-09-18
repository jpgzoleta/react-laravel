import * as yup from "yup";

export const productSchema = yup.object().shape({
    name: yup.string().required("Required"),
    details: yup.string().required("Required"),
    price: yup.number().required("Required"),
});
