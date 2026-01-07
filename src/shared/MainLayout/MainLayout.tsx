import { Outlet } from '@tanstack/react-router';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export const MainLayout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
