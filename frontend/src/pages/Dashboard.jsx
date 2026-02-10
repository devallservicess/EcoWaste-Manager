import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getPoints, getEmployes, getVehicules, getTournees } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const Dashboard = () => {
    const [stats, setStats] = useState({
        points: 0,
        employes: 0,
        vehicules: 0,
        tournees: 0
    });
    const [pointsData, setPointsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const [p, e, v, t] = await Promise.all([
                getPoints(),
                getEmployes(),
                getVehicules(),
                getTournees()
            ]);

            setStats({
                points: p.data.length,
                employes: e.data.length,
                vehicules: v.data.length,
                tournees: t.data.length
            });

            setPointsData(p.data.map(pt => ({ name: `Pt ${pt.id}`, level: pt.niveauRemplissage })));
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-8">Administrator Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <StatCard title="Collection Points" value={stats.points} color="blue" />
                    <StatCard title="Active Employees" value={stats.employes} color="green" />
                    <StatCard title="Vehicles" value={stats.vehicules} color="yellow" />
                    <StatCard title="Planned Tours" value={stats.tournees} color="purple" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold mb-4">Bin Levels Overview</h2>
                        <BarChart width={500} height={300} data={pointsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="level" fill="#3b82f6" />
                        </BarChart>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold mb-4">Recent Alerts</h2>
                        <ul className="space-y-3">
                            {pointsData.filter(p => p.level > 80).map(p => (
                                <li key={p.name} className="flex justify-between items-center bg-red-50 p-3 rounded-lg border border-red-100">
                                    <span className="font-medium text-red-700">{p.name} is {p.level}% full</span>
                                    <button className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200">Action</button>
                                </li>
                            ))}
                            {pointsData.filter(p => p.level > 80).length === 0 && (
                                <p className="text-green-600">No critical alerts.</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, color }) => (
    <div className={`bg-white p-6 rounded-xl shadow-md border-l-4 border-${color}-500`}>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
);

export default Dashboard;
