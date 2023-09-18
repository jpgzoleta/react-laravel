import { SignUpForm } from "../components/Forms";
import { useEffect } from "react";

export default function SignUp() {
    useEffect(() => {
        document.title = "Sign Up";
        return () => {};
    }, []);
    return (
        <div className="flex h-full min-h-screen w-full bg-gray-200 p-6">
            <SignUpForm />
        </div>
    );
}
