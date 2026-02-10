import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Lock, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user } = useAuth();

    return (
        <nav className="bg-white shadow-lg p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-emerald-600 flex items-center gap-2 hover:opacity-80 transition">
                    <Map className="w-8 h-8" />
                    EcoWaste Manager
                </Link>
                <div className="flex gap-6 items-center">
                    <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-emerald-600 font-medium transition">
                        <Map size={18} /> Public Map
                    </Link>

                    {user ? (
                        <Link
                            to="/admin"
                            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition shadow-sm font-medium"
                        >
                            <LayoutDashboard size={18} />
                            Admin Dashboard
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="flex items-center gap-2 text-emerald-600 border border-emerald-600 px-4 py-2 rounded-full hover:bg-emerald-50 transition font-medium"
                        >
                            <Lock size={18} />
                            Admin Access
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
