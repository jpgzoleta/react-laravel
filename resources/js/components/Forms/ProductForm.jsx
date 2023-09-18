import { InputField, TextArea } from "../Inputs";
import { MyButton } from "../Buttons";
import { FormikProvider, Form, useFormik } from "formik";
import { productSchema } from "../../lib/validators/product-validator";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

export default function ProductForm({
    onAfterSubmit = () => {},
    onCancel = () => {},
    product,
}) {
    const productFormik = useFormik({
        initialValues: {
            name: product?.name || "",
            details: product?.details || "",
            price: product?.price || 0,
        },
        validationSchema: productSchema,
        onSubmit: handleSubmit,
    });

    async function handleSubmit(values) {
        try {
            let response;
            if (user) {
                response = await axios.put(
                    "http://10.101.96.224/users/update",
                    { id: user.id, ...values },
                    {
                        headers: {
                            Authorization:
                                "EBd0JOSDB64s8udwNDrSobA1VV1A99dr1wtAbh3oMbk=",
                        },
                    }
                );
            } else {
                response = await axios.post(
                    "http://10.101.96.224/users/save",
                    values,
                    {
                        headers: {
                            Authorization:
                                "EBd0JOSDB64s8udwNDrSobA1VV1A99dr1wtAbh3oMbk=",
                        },
                    }
                );
            }
            if (response.data?.status == "Success") {
                toast.success(response.data?.message);
            } else {
                toast.error(response.data?.message);
            }

            onAfterSubmit();
        } catch (error) {
            toast.error("Can't save product");
        }
    }

    // console.log(userFormik.errors);

    return (
        <FormikProvider value={productFormik}>
            <Form className="flex w-full flex-col gap-8">
                <div className="flex w-full flex-col gap-6">
                    <InputField label="Name" name="name" />
                    <TextArea label="Details" name="details" />
                    <InputField
                        type="number"
                        label="Price in PHP."
                        name="price"
                        min={1}
                    />
                    <div className="flex justify-end gap-2">
                        <MyButton secondary onClick={onCancel}>
                            Cancel
                        </MyButton>
                        <MyButton type="submit">Save</MyButton>
                    </div>
                </div>
            </Form>
        </FormikProvider>
    );
}
