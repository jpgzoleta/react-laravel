import { Info, Eye, EyeClosed } from "@phosphor-icons/react";
import { useState } from "react";
import { useField } from "formik";

export default function InputField({
    type = "text",
    label = "",
    infoMessage = "",
    ...props
}) {
    const [showPass, setShowPass] = useState(false);
    const [field, meta] = useField(props);

    console.log({ input: field.name, touched: meta.touched });

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center">
                {label && (
                    <label
                        htmlFor={props.name}
                        className="font-display font-medium"
                    >
                        {label}
                    </label>
                )}
                {type == "password" ? (
                    <button
                        type="button"
                        className="ml-auto"
                        onClick={() => setShowPass((prev) => !prev)}
                    >
                        {!showPass && <Eye size={16} weight="bold" />}
                        {showPass && <EyeClosed size={16} weight="bold" />}
                    </button>
                ) : null}
            </div>
            <input
                {...field}
                {...props}
                type={
                    type == "password" ? (showPass ? "text" : "password") : type
                }
                className={`w-full rounded-[10px] border bg-white 
    p-3 font-body placeholder-gray-300 focus:outline-none focus:ring-1
    ${
        meta.error && meta.touched
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
    } ${props.type == "color" ? "h-[50px] max-w-[50px] p-2" : ""}`}
            />
            {infoMessage && (meta.touched ? !meta.error : !meta.touched) && (
                <p className="flex gap-1 text-xs text-gray-200">
                    <span>
                        <Info size={16} weight="bold" className="-mt-[2px]" />
                    </span>
                    {infoMessage}
                </p>
            )}
            {meta.error && meta.touched && (
                <p className="flex gap-1 text-xs text-red-500">{meta.error}</p>
            )}
        </div>
    );
}
