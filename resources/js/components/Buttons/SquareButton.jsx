import classNames from "classnames";

export default function SquareButton({
  icon = <></>,
  withBorder = false,
  onClick = () => {},
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "flex aspect-square flex-shrink-0 items-center justify-center rounded-md bg-white p-1 leading-none hover:bg-gray-200",
        { "border-4 border-black": withBorder },
      )}
    >
      {icon}
    </button>
  );
}
