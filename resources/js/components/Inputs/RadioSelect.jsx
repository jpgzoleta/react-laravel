import { Info } from "@phosphor-icons/react";

export default function RadioSelect({ label, children, infoMessage, error }) {
  return (
    <fieldset className="flex w-fit flex-col gap-2">
      {label && (
        <legend className="mb-2 font-display font-medium">{label}</legend>
      )}
      <div className="flex flex-col gap-3">{children}</div>
      {infoMessage && (
        <p className="text-ship-gray-400 flex gap-1 text-sm">
          <span>
            <Info size={16} />
          </span>
          {infoMessage}
        </p>
      )}
      {error && <p className="text-danger-500 flex gap-1 text-sm">{error}</p>}
    </fieldset>
  );
}
