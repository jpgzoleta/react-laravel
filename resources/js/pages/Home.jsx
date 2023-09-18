import { UserTable } from "../components/Tables";
import { MyButton } from "../components/Buttons";
import { UserForm } from "../components/Forms";
import { Modal } from "../components/Modals";
import { useState } from "react";
import { useEffect } from "react";
import { Plus } from "@phosphor-icons/react";

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        document.title = "Users | React CRUD";
        return () => {};
    }, []);

    return (
        <>
            <Modal
                label={"New User"}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                }}
            >
                <UserForm
                    onAfterSubmit={() => setIsModalOpen(false)}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
            <div className="flex min-h-screen w-full flex-col gap-8 p-8">
                <div className="flex items-center justify-between border-b border-gray-300 pb-8">
                    <h1 className="font-display text-4xl font-bold">Users</h1>
                    <MyButton onClick={() => setIsModalOpen(true)}>
                        <Plus size={16} weight="bold" />
                        <p>New User</p>
                    </MyButton>
                </div>
                <UserTable />
            </div>
        </>
    );
}

export default App;
