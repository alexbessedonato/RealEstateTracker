
export const Header = () => {
    return (
        <header>
            <nav className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Logo" className="h-8" />
                    <span className="font-bold">Real Estate Tracker</span>
                </div>
                <div className="flex items-center gap-2">

                    <span className="font-bold">Navigations</span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="bg-gray-600 text-white px-4 py-2 rounded-2xl font-bold">Login</button>
                    <button className="bg-gray-600 text-white px-4 py-2 rounded-2xl font-bold">Sign Up</button>
                </div>
            </nav>
        </header>
    )
}

