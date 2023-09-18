import { X } from "@phosphor-icons/react";
import ReactModal from "react-modal";
import { useRef } from "react";
import { SquareButton } from "../Buttons";
import { RemoveScroll } from "react-remove-scroll";

export default function Modal({ onClose, isOpen, label, children }) {
    ReactModal.setAppElement("body");
    const modalRef = useRef();
    return (
        <RemoveScroll enabled={isOpen}>
            <ReactModal
                ref={modalRef}
                // contentLabel="Offer Modal"
                isOpen={isOpen}
                overlayClassName="bg-black/20 backdrop-blur-sm fixed top-0 z-50 flex h-full w-full md:p-8 overflow-y-auto"
                preventScroll={true}
                onRequestClose={onClose}
                closeTimeoutMS={150}
                // bodyOpenClassName="modal-open-body"
                className="relative mt-auto w-full overflow-hidden
     rounded-t-lg bg-white py-6 shadow-xl outline-none md:m-auto md:max-w-[480px] md:rounded-lg"
            >
                <div className="max-h-[70vh] overflow-y-auto px-6 md:max-h-full md:overflow-visible">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-shrink-0 items-center justify-between">
                            <h1 className="font-display text-3xl font-bold">
                                {label}
                            </h1>
                            <SquareButton
                                icon={<X size={20} weight="bold" />}
                                onClick={onClose}
                            />
                        </div>
                        {children}
                    </div>
                </div>
            </ReactModal>
        </RemoveScroll>
    );
}
