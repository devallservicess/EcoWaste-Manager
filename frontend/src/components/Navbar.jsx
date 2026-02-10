import React from 'react';
import { Link } from 'react-router-dom';
import { Map, LayoutDashboard, Truck, Users, FileText } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-lg p-4 mb-6">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-green-600 flex items-center gap-2">
                    <Map className="w-8 h-8" />
                    EcoWaste Manager
                </Link>
                <div className="flex gap-6">
                    <Link to="/" className="flex items-center gap-1 hover:text-green-600 font-medium">
                        <Map size={18} /> Public Map
                    </Link>
                    <Link to="/dashboard" className="flex items-center gap-1 hover:text-green-600 font-medium">
                        <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <Link to="/plan-tours" className="flex items-center gap-1 hover:text-green-600 font-medium">
                        <Truck size={18} /> Tours
                    </Link>
                    <Link to="/data" className="flex items-center gap-1 hover:text-green-600 font-medium">
                        <FileText size={18} /> Data Management
                    </Link>
                    <Link to="/admin" className="flex items-center gap-1 hover:text-blue-600 font-medium">
                        <Users size={18} /> Admin
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
