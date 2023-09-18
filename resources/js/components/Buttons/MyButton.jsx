import classNames from "classnames";

export default function MyButton({
  secondary = false,
  children,
  onClick = () => {},
  disabled = false,
  fullWidth = false,
  type = "",
  small = false,
}) {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        `flex items-center justify-center gap-2 overflow-hidden text-ellipsis 
        whitespace-nowrap rounded-lg text-center font-display font-medium transition-colors 
        disabled:cursor-not-allowed disabled:opacity-60`,
        { "w-full": fullWidth },
        {
          "border border-green-500 bg-white text-green-500 hover:bg-green-100":
            secondary,
          "bg-green-500 text-white hover:bg-green-600 active:bg-green-700":
            !secondary,
        },
        { "px-3 py-2": small, "px-4 py-3": !small },
      )}
    >
      {children}
    </button>
  );
}
