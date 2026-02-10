import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getPoints, getEmployes, getVehicules, getTournees } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Users, Truck, MapPin, Route, AlertTriangle, CheckCircle } from 'lucide-react';

const Dashboard = ({ headless = false }) => {
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

    const content = (
        <div className={headless ? "" : "container mx-auto p-6"}>
            {!headless && <h1 className="text-3xl font-bold mb-8 text-gray-800">Administrator Dashboard</h1>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Collection Points" value={stats.points} icon={MapPin} color="emerald" />
                <StatCard title="Active Employees" value={stats.employes} icon={Users} color="blue" />
                <StatCard title="Total Vehicles" value={stats.vehicules} icon={Truck} color="amber" />
                <StatCard title="Current Tours" value={stats.tournees} icon={Route} color="purple" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                        <BarChart className="mr-2 text-emerald-500" size={20} />
                        Bin Levels Overview
                    </h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={pointsData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="level" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                        <AlertTriangle className="mr-2 text-rose-500" size={20} />
                        Recent Alerts
                    </h2>
                    <div className="space-y-4">
                        {pointsData.filter(p => p.level > 80).map(p => (
                            <div key={p.name} className="flex justify-between items-center bg-rose-50 p-4 rounded-xl border border-rose-100">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-rose-500 rounded-full mr-3 animate-pulse"></div>
                                    <span className="font-semibold text-rose-700">{p.name} is {p.level}% full</span>
                                </div>
                                <button className="text-xs font-bold bg-white text-rose-600 px-4 py-2 rounded-lg shadow-sm border border-rose-200 hover:bg-rose-50 transition">
                                    ACTION
                                </button>
                            </div>
                        ))}
                        {pointsData.filter(p => p.level > 80).length === 0 && (
                            <div className="text-center py-12">
                                <div className="bg-emerald-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <CheckCircle className="text-emerald-500" size={24} />
                                </div>
                                <p className="text-gray-500 font-medium">All systems normal. No critical alerts.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    if (headless) return content;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            {content}
        </div>
    );
};

const StatCard = ({ title, value, icon: Icon, color }) => {
    const colorClasses = {
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        amber: "bg-amber-50 text-amber-600 border-amber-100",
        purple: "bg-purple-50 text-purple-600 border-purple-100",
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className={`p-4 rounded-xl ${colorClasses[color] || 'bg-gray-50 text-gray-600'} border`}>
                <Icon size={24} strokeWidth={1.5} />
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <p className="text-2xl font-bold text-gray-800 tabular-nums">{value}</p>
            </div>
        </div>
    );
};

export default Dashboard;
