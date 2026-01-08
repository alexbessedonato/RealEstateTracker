import { useState } from "react"
import { LoginModal } from "./LoginModal/LoginModal"

export const Login = () => {
    const [IsModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <button onClick={() => setIsModalOpen(true)} className="bg-white/10 text-gray-800 px-4 py-2 shadow-lg rounded-2xl font-bold ring-1 ring-black/7">Login</button>
            <LoginModal
                isOpen={IsModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}
