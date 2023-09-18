import TextareaAutosize from "react-textarea-autosize";
import { Info } from "@phosphor-icons/react";
import { useField } from "formik";

export default function TextArea({ label, infoMessage, size, ...props }) {
    const [field, meta] = useField(props);
    return (
        <div className="flex w-full flex-col gap-2">
            {label && (
                <label
                    htmlFor={props?.name}
                    className="font-display font-medium"
                >
                    {label}
                </label>
            )}
            <TextareaAutosize
                {...field}
                {...props}
                className={`max-h-[150px] w-full resize-none rounded-[10px] border
         bg-white font-body placeholder-gray-500 focus:outline-none focus:ring-1
        ${
            meta.error && meta.touched
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
        } ${size == "small" ? "px-3 py-2" : "p-3"}`}
            />
            {infoMessage && (meta.touched ? !meta.error : !meta.touched) && (
                <p className="flex gap-1 text-xs text-gray-200">
                    <span>
                        <Info size={16} className="-mt-[2px]" />
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
