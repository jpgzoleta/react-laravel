import { InputField } from "../Inputs";
import { MyButton } from "../Buttons";
import { FormikProvider, Form, useFormik } from "formik";
import { signupSchema } from "../../lib/validators/signup-validator";
import { Link } from "react-router-dom";

export default function SignUpForm({ onAfterSubmit = () => {} }) {
    const loginFormik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: signupSchema,
        onSubmit: handleSubmit,
    });

    async function handleSubmit(values) {
        console.log(values);
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
                    },
                }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
            toast.error("Problem signing in!");
        }
    }

    return (
        <FormikProvider value={loginFormik}>
            <Form
                className="m-auto flex h-full w-full max-w-[420px] flex-col items-center gap-8 
    rounded-xl bg-white p-8 shadow-xl"
            >
                <h1 className="font-display text-4xl font-semibold">Sign Up</h1>
                <div className="flex w-full flex-col gap-8">
                    <InputField label="First Name" name="firstName" />
                    <InputField label="Last Name" name="lastName" />
                    <InputField type="email" label="Email" name="email" />
                    <InputField
                        type="password"
                        label="Password"
                        name="password"
                    />
                    <InputField
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword"
                    />
                    <MyButton>Sign Up</MyButton>
                </div>
                <p className="text-center capitalize">
                    Already have an account?{" "}
                    <Link to={"/login"} className="font-semibold text-blue-500">
                        Login
                    </Link>
                </p>
            </Form>
        </FormikProvider>
    );
}
