
import { Login } from "./components/Login/Login"
import { SignUp } from "./components/SignUp/SignUp"
import { Logout } from "./components/Logout/Logout";
import { useStore } from "@nanostores/react";
import { $auth } from "../../store/AuthContext";

export const Header = () => {

    const { user, loading } = useStore($auth);

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

                {loading ? (null)
                    : user ?
                        (<div className="flex items-center gap-4 font-bold">Welcome, {user.user_metadata?.display_name ?? user.email}
                            <Logout />
                        </div>)
                        :
                        (<div className="flex items-center gap-4">
                            <Login />
                            <SignUp />
                        </div>)}
            </nav>
        </header>
    )
}

