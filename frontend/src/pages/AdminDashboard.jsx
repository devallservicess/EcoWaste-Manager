import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import EmployeManager from '../components/admin/EmployeManager';
import VehiculeManager from '../components/admin/VehiculeManager';
import PointManager from '../components/admin/PointManager';
import Dashboard from './Dashboard';
import PlanTours from './PlanTours';
import ImportExport from './ImportExport';
import {
    LayoutDashboard,
    Users,
    Truck,
    MapPin,
    Route,
    Database,
    LogOut,
    Menu,
    X
} from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <Dashboard headless={true} />;
            case 'tours': return <PlanTours headless={true} />;
            case 'data': return <ImportExport headless={true} />;
            case 'employes': return <EmployeManager />;
            case 'vehicules': return <VehiculeManager />;
            case 'points': return <PointManager />;
            default: return <Dashboard headless={true} />;
        }
    };

    const menuItems = [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'tours', label: 'Tour Planning', icon: Route },
        { id: 'data', label: 'Data Management', icon: Database },
        { id: 'employes', label: 'Employees', icon: Users },
        { id: 'vehicules', label: 'Vehicles', icon: Truck },
        { id: 'points', label: 'Collection Points', icon: MapPin },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside
                className={`bg-emerald-900 text-white transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'
                    } flex flex-col fixed h-full z-20`}
            >
                <div className="p-4 flex items-center justify-between border-b border-emerald-800">
                    {isSidebarOpen && <span className="text-xl font-bold tracking-wider">EcoAdmin</span>}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1 hover:bg-emerald-800 rounded"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <div className="p-4 border-b border-emerald-800 bg-emerald-800/50">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-lg font-bold">
                            {user?.username?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        {isSidebarOpen && (
                            <div className="overflow-hidden">
                                <p className="font-medium truncate">{user?.username}</p>
                                <p className="text-xs text-emerald-300">Administrator</p>
                            </div>
                        )}
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-2">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                                        ? 'bg-emerald-600 text-white shadow-lg'
                                        : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
                                        }`}
                                >
                                    <item.icon size={22} strokeWidth={1.5} />
                                    {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-4 border-t border-emerald-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-emerald-100 hover:bg-red-600/80 hover:text-white transition-colors"
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-20'
                    } p-8`}
            >
                <div className="max-w-7xl mx-auto">
                    <header className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                {menuItems.find(i => i.id === activeTab)?.label}
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">Manage your waste management system</p>
                        </div>
                        <div className="text-sm text-gray-400">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </header>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[500px] p-6 animate-fade-in">
                        {renderContent()}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
