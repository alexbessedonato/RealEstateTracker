import { useState } from "react"
import { SignUpModal } from "./SignUpModal/SignUpModal";

export const SignUp = () => {
    const [IsModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsModalOpen(true)} className="bg-white/10 text-gray-800 px-4 py-2 shadow-lg rounded-2xl font-bold ring-1 ring-black/7">Sign Up</button>
            <SignUpModal
                isOpen={IsModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}
