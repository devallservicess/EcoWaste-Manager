import React, { useState } from 'react';
import EmployeManager from '../components/admin/EmployeManager';
import VehiculeManager from '../components/admin/VehiculeManager';
import PointManager from '../components/admin/PointManager';
import { Users, Truck, MapPin } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('employes');

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Management</h1>

            <div className="flex space-x-4 mb-6 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('employes')}
                    className={`flex items-center space-x-2 py-2 px-4 border-b-2 transition-colors ${activeTab === 'employes'
                            ? 'border-emerald-600 text-emerald-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <Users size={20} />
                    <span>Employees</span>
                </button>
                <button
                    onClick={() => setActiveTab('vehicules')}
                    className={`flex items-center space-x-2 py-2 px-4 border-b-2 transition-colors ${activeTab === 'vehicules'
                            ? 'border-emerald-600 text-emerald-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <Truck size={20} />
                    <span>Vehicles</span>
                </button>
                <button
                    onClick={() => setActiveTab('points')}
                    className={`flex items-center space-x-2 py-2 px-4 border-b-2 transition-colors ${activeTab === 'points'
                            ? 'border-emerald-600 text-emerald-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <MapPin size={20} />
                    <span>Collection Points</span>
                </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                {activeTab === 'employes' && <EmployeManager />}
                {activeTab === 'vehicules' && <VehiculeManager />}
                {activeTab === 'points' && <PointManager />}
            </div>
        </div>
    );
};

export default AdminDashboard;
