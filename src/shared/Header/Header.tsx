import { Login } from "./components/Login/Login"
import { SignUp } from "./components/SignUp/SignUp"
export const Header = () => {
    return (
        <header>
            <nav className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                    <img src="Logo.png" alt="Logo" className="h-8" />
                    <span className="font-bold text-gray-800">Real Estate Tracker</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800">Navigations</span>
                </div>
                <div className="flex items-center gap-4">
                    <Login />
                    <SignUp />
                </div>
            </nav>
        </header>
    )
}

