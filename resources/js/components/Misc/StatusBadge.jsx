import classNames from "classnames";

export default function StatusBadge({ status = "active" }) {
  return (
    <span
      className={classNames(
        "rounded-full px-2 py-1 text-xs font-semibold uppercase",
        {
          "bg-green-200": status == "active",
          "bg-red-200": status == "inactive",
          "bg-yellow-200": status == "pending",
        },
      )}
    >
      {status}
    </span>
  );
}
