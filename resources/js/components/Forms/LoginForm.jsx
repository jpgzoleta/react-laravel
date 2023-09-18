import { InputField } from "../Inputs";
import { MyButton } from "../Buttons";
import { FormikProvider, Form, useFormik } from "formik";
import { loginSchema } from "../../lib/validators/login-validator";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

export default function LoginForm({ onAfterSubmit = () => {} }) {
    const loginFormik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: handleSubmit,
    });

    const navigate = useNavigate();

    const [noUser, setNoUser] = useState("");

    async function handleSubmit(values) {
        try {
            const response = await axios.post(
                "http://10.101.96.224/users/verify",
                {
                    ...values,
                },
                {
                    headers: {
                        Authorization:
                            "EBd0JOSDB64s8udwNDrSobA1VV1A99dr1wtAbh3oMbk=",
                        "content-type": "application/json",
                    },
                }
            );

            const data = response.data;

            if (!data?.status) {
                setNoUser(data?.message);
            } else {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <FormikProvider value={loginFormik}>
            <Form
                className="m-auto flex h-full w-full max-w-[400px] flex-col items-center gap-8 
    rounded-xl bg-white p-8 shadow-xl"
            >
                <h1 className="font-display text-4xl font-semibold">Login</h1>
                {noUser && (
                    <p className="rounded-sm bg-red-500 px-2 py-1 text-center text-lg text-white">
                        {noUser}
                    </p>
                )}
                <div className="flex w-full flex-col gap-4">
                    <InputField type="email" label="Email" name="email" />
                    <InputField
                        type="password"
                        label="Password"
                        name="password"
                    />
                    <MyButton type="submit">Login</MyButton>
                </div>
                <p className="text-center capitalize">
                    Don't have an account?{" "}
                    <Link
                        to={"/signup"}
                        className="font-semibold text-blue-500"
                    >
                        Sign Up
                    </Link>
                </p>
            </Form>
        </FormikProvider>
    );
}
