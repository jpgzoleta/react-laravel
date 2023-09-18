import { MyButton } from "../Buttons";
import Modal from "./Modal";

export default function Confirmation({
  onConfirm = () => {},
  onCancel = () => {},
  isOpen = false,
  label = "",
  message = "",
  confirmButtonText = "",
  cancelButtonText = "",
}) {
  return (
    <Modal isOpen={isOpen} label={label} onClose={onCancel}>
      <div className="flex flex-col gap-6">
        <p>{message}</p>
        <div className="flex justify-between gap-4">
          <MyButton onClick={onCancel} secondary>
            {cancelButtonText || "Cancel"}
          </MyButton>
          <MyButton onClick={onConfirm}>
            {confirmButtonText || "Confirm"}
          </MyButton>
        </div>
      </div>
    </Modal>
  );
}
