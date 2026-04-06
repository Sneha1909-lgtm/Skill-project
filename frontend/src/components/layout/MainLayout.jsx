import React, { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';

const MainLayout = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    // Check if the current route is a public node (Home, Login, Register)
    const isPublicNode = ['/', '/login', '/register'].includes(location.pathname);

    if (isPublicNode) {
        return (
            <div className="flex flex-col min-h-screen bg-secondary-dark selection:bg-primary/30">
                <main className="flex-1 w-full bg-secondary-dark">
                    <Outlet />
                </main>
            </div>
        );
    }

    // Protected Node Layout
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-secondary-dark selection:bg-primary/30">
            {user && <Sidebar />}
            
            <div className="flex-1 flex flex-col min-h-screen relative overflow-x-hidden">
                <Navbar />
                
                <main className="flex-1 p-4 lg:p-10 relative z-10 custom-scrollbar overflow-y-auto max-h-[calc(100vh-80px)]">
                    <div className="max-w-[1600px] mx-auto animate-in fade-in duration-1000">
                      <Outlet />
                    </div>
                </main>

                {/* Ambient Visual Node */}
                <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[150px] pointer-events-none -mr-40 -mt-40 z-0" />
                <div className="fixed bottom-0 left-280 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none -ml-40 -mb-40 z-0" />
            </div>
        </div>
    );
};

export default MainLayout;
