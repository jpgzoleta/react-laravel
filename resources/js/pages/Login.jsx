import { LoginForm } from "../components/Forms";
import { useEffect } from "react";

export default function Login() {
    useEffect(() => {
        document.title = "Login";
        return () => {};
    }, []);
    return (
        <div className="flex h-full min-h-screen w-full bg-gray-200 p-6">
            <LoginForm />
        </div>
    );
}
