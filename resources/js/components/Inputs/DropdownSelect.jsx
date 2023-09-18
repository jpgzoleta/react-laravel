// import AsyncSelect from "react-select/async";
import Select from "react-select";
import { CaretDown, CaretUp, Info } from "@phosphor-icons/react";
import { useField } from "formik";
import { useState, useEffect, useCallback } from "react";
import classNames from "classnames";

export default function DropdownSelect({
    options = [],
    placeholder = "",
    label = "",
    infoMessage = "",
    name = "",
}) {
    const [field, meta, helpers] = useField(name);

    // useEffect(() => {
    //     const value = selectedItem?.value ? selectedItem.value : selectedItem;
    //     helpers.setValue(value);
    //     const original =
    //         items.find((item) => item.value == value || item == value)
    //             ?.original || value;

    //     onChangeGetOriginal(original);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [selectedItem]);

    console.log({ error: meta.error, touched: meta.touched, name: field.name });

    return (
        <div className="relative">
            <div className="flex flex-col gap-2">
                {label && (
                    <label htmlFor={name} className="font-display font-medium">
                        {label}
                    </label>
                )}
                <Select
                    // cacheOptions
                    // defaultOptions
                    id={name}
                    name={name}
                    value={options.find((option) => option.value == meta.value)}
                    placeholder={placeholder}
                    options={options}
                    onBlur={field.onBlur(field.name)}
                    onChange={(selected) => helpers.setValue(selected.value)}
                    unstyled
                    classNames={{
                        control: (state) =>
                            classNames(
                                "rounded-[10px] border bg-white border-gray-300 font-body",
                                {
                                    "border-red-500":
                                        meta.error && meta.touched,
                                    "border-gray-300":
                                        !meta.error && !meta.touched,
                                    "outline-none":
                                        state.isFocused &&
                                        meta.error &&
                                        meta.touched,
                                    "ring-1 ring-blue-500 outline-none":
                                        state.isFocused &&
                                        (!meta.error || !meta.touched),
                                }
                            ),
                        indicatorSeparator: (state) =>
                            classNames("bg-gray-300 w-[1px] h-full"),
                        valueContainer: (state) => classNames("p-3"),
                        input: (state) => classNames("placeholder-gray-300"),
                        indicatorsContainer: (state) =>
                            classNames("flex gap-2 my-3 mr-3"),
                        dropdownIndicator: (state) =>
                            classNames({
                                "text-black": state.isFocused,
                                "text-gray-500": !state.isFocused,
                            }),
                        menu: (state) =>
                            classNames(
                                "bg-white py-2 rounded-[10px] flex flex-col border border-gray-300 mt-2"
                            ),
                        menuList: (state) => classNames("flex flex-col"),
                        option: (state) =>
                            classNames("p-3 hover:cursor-pointer", {
                                "font-semibold text-white bg-blue-500 hover:bg-blue-500":
                                    state.isSelected,
                                "hover:bg-gray-200": !state.isSelected,
                            }),
                        placeholder: () => classNames("text-gray-500"),
                    }}
                />
                {infoMessage && (!meta.error || !meta.touched) && (
                    <p className="flex gap-1 text-xs text-gray-300">
                        <span>
                            <Info size={16} className="-mt-[2px]" />
                        </span>
                        {infoMessage}
                    </p>
                )}
                {meta.error && meta.touched && (
                    <p className="flex gap-1 text-xs text-red-500">
                        {meta.error}
                    </p>
                )}
            </div>
            {/* <ul
                {...getMenuProps()}
                className="custom-scrollbar relative z-20 mt-2 max-h-80 w-full overflow-x-auto 
        rounded-[10px] bg-white shadow-[0_0_8px_0_rgba(0,0,0,0.2)]"
            >
                {isOpen &&
                    items.map((item, index) => (
                        <li
                            className={`
                ${highlightedIndex === index && "bg-blue-200"}
                ${
                    (selectedItem === item ||
                        selectedItem?.value == item?.value) &&
                    "bg-blue-200 font-bold"
                }
                flex cursor-pointer flex-col p-4 font-body capitalize shadow-sm
              `}
                            key={index}
                            // onClick={selectItem}
                            {...getItemProps({ item, index })}
                        >
                            <span>{item?.name ? item.name : item}</span>
                        </li>
                    ))}
            </ul> */}
        </div>
    );
}
