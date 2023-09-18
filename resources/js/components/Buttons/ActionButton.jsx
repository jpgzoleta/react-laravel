import { Tooltip } from "react-tooltip";

export default function ActionButton({
  icon = <></>,
  buttonColor = "",
  tooltipColor = "",
  onClick = () => {},
  toolTipId = "",
  toolTipContent = "",
}) {
  return (
    <>
      <button
        data-tooltip-id={toolTipId}
        data-tooltip-content={toolTipContent}
        onClick={onClick}
        style={{ backgroundColor: buttonColor }}
        className="group relative flex aspect-square h-fit min-h-[24px] min-w-[24px] items-center justify-center rounded-md p-1"
      >
        {icon}
      </button>
      {toolTipId && toolTipContent ? (
        <Tooltip
          style={{
            padding: "0.5rem 0.75rem",
            borderRadius: "0.5rem",
            backgroundColor: tooltipColor || "#3c3744",
            zIndex: 40,
          }}
          id={toolTipId}
          place="bottom"
          delayShow={500}
        />
      ) : null}
    </>
  );
}
