import { Circle, RadioButton } from "@phosphor-icons/react";
import { useField } from "formik";
import classNames from "classnames";

export default function RadioSelectItem({ children, long, checked, ...props }) {
    const [field, meta] = useField(props);
    return (
        <label
            className={`flex gap-3 ${
                long ? "items-start" : "items-center"
            } cursor-pointer`}
        >
            <input
                type="radio"
                className="hidden"
                {...field}
                {...props}
                checked={checked}
            />
            <div className={`relative ${long ? "mt-1" : ""}`}>
                <span
                    className={classNames(
                        "text-ship-gray-300 transition-opacity",
                        {
                            "opacity-0": checked,
                        }
                    )}
                >
                    <Circle size={20} className="text-gray-500" />
                </span>
                <span
                    className={classNames(
                        "absolute left-0 top-0 text-blue-500 transition-opacity",
                        {
                            "opacity-0": !checked,
                        }
                    )}
                >
                    <RadioButton size={20} weight="fill" />
                </span>
            </div>
            {children}
        </label>
    );
}
