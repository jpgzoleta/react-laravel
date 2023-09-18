import {
    DropdownSelect,
    InputField,
    RadioSelect,
    RadioSelectItem,
} from "../Inputs";
import { MyButton } from "../Buttons";
import { FormikProvider, Form, useFormik } from "formik";
import { userSchema } from "../../lib/validators/user-validator";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

const sampleGroups = [
    {
        label: "test 1",
        value: "1",
    },
    {
        label: "test 2",
        value: "2",
    },
];

export default function UserForm({
    onAfterSubmit = () => {},
    onCancel = () => {},
    user,
}) {
    const userFormik = useFormik({
        initialValues: {
            name: user?.name || "",
            email: user?.email || "",
            password: user?.password || "",
            contact_no: user?.contact_no || "",
            group_id: user?.group_id || "",
            is_active: user?.is_active || 1,
        },
        validationSchema: userSchema,
        onSubmit: handleSubmit,
    });

    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(user?.group_id);

    // useEffect(() => {
    //     axios
    //         .get("http://10.101.96.224/users/group", {
    //             headers: {
    //                 Authorization:
    //                     "EBd0JOSDB64s8udwNDrSobA1VV1A99dr1wtAbh3oMbk=",
    //             },
    //         })
    //         .then((res) => {
    //             setGroups(
    //                 res?.data?.map((group) => ({
    //                     name: group.group_name,
    //                     value: group.id,
    //                 }))
    //             );
    //         })
    //         .catch((error) => console.log(error));
    // }, []);

    useEffect(() => {
        userFormik.setFieldValue("group_id", selectedGroup);
    }, [selectedGroup]);

    async function handleSubmit(values) {
        console.log(values);
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
            toast.error("Can't save user");
        }
    }

    // console.log(userFormik.errors);

    return (
        <FormikProvider value={userFormik}>
            <Form className="flex w-full flex-col gap-8">
                <div className="flex w-full flex-col gap-6">
                    <InputField label="Full Name" name="name" />
                    <InputField type="email" label="Email" name="email" />
                    <InputField
                        type="password"
                        label="Password"
                        name="password"
                    />
                    <InputField
                        type="text"
                        label="Contact No."
                        name="contact_no"
                    />
                    <DropdownSelect
                        placeholder="Select a group"
                        label={"User Group"}
                        options={sampleGroups}
                        name="group_id"
                    />
                    <RadioSelect label={"Status"}>
                        <RadioSelectItem
                            name="is_active"
                            value={1}
                            checked={userFormik.values.is_active == "1"}
                        >
                            Active
                        </RadioSelectItem>
                        <RadioSelectItem
                            name="is_active"
                            value={0}
                            checked={userFormik.values.is_active == "0"}
                        >
                            Inactive
                        </RadioSelectItem>
                    </RadioSelect>
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
