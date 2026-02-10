import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { autoPlanTournee, saveTournee } from '../services/api';
import { Calendar, Save, Trash2, MapPin, Truck, Users, Sparkles } from 'lucide-react';

const PlanTours = ({ headless = false }) => {
    const [date, setDate] = useState('');
    const [plannedTour, setPlannedTour] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePlan = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await autoPlanTournee(date);
            setPlannedTour(response.data);
        } catch (error) {
            console.error("Error planning tour:", error);
            alert("Failed to plan tour. Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            await saveTournee(plannedTour);
            alert("Tour saved successfully!");
            setPlannedTour(null);
        } catch (error) {
            console.error("Error saving tour:", error);
            alert("Failed to save tour.");
        }
    };

    const content = (
        <div className={headless ? "" : "container mx-auto p-6 max-w-4xl"}>
            {!headless && <h1 className="text-3xl font-bold mb-8 text-gray-800">Plan Collection Tours</h1>}

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Sparkles size={120} />
                </div>
                <form onSubmit={handlePlan} className="relative z-10 flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-tight">Select Date for Tour</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="date"
                                className="w-full border border-gray-200 rounded-xl p-3 pl-11 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition disabled:opacity-50 shadow-lg shadow-emerald-200 flex items-center justify-center"
                    >
                        {loading ? 'Calculating...' : (
                            <>
                                <Sparkles size={20} className="mr-2" />
                                Optimize Routes
                            </>
                        )}
                    </button>
                </form>
            </div>

            {plannedTour && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in mb-8">
                    <div className="bg-emerald-50 p-6 flex justify-between items-center border-b border-emerald-100">
                        <div>
                            <h2 className="text-xl font-bold text-emerald-900">Proposed Tour Plan</h2>
                            <p className="text-sm text-emerald-700 font-medium">{date}</p>
                        </div>
                        <div className="text-right">
                            <span className="bg-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                                {plannedTour.distance} KM TOTAL
                            </span>
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                                <MapPin size={18} className="mr-2 text-rose-500" />
                                Points to Collect
                            </h3>
                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                                {plannedTour.points.map(pid => (
                                    <div key={pid} className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-emerald-600 mr-3 shadow-sm">
                                            {pid}
                                        </div>
                                        <span className="font-medium text-gray-700">Bin Location #{pid}</span>
                                    </div>
                                ))}
                                {plannedTour.points.length === 0 && <p className="text-gray-400 italic text-sm py-4 text-center">No critical points detected for this date.</p>}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                                    <Truck size={18} className="mr-2 text-blue-500" />
                                    Assigned Vehicles
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {plannedTour.vehicules.map(v => (
                                        <span key={v} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold border border-blue-100">
                                            ID: {v}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                                    <Users size={18} className="mr-2 text-amber-500" />
                                    Assigned Agents
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {plannedTour.agents.map(a => (
                                        <span key={a} className="bg-amber-50 text-amber-700 px-4 py-2 rounded-xl text-sm font-semibold border border-amber-100">
                                            CIN: {a}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 flex justify-end gap-3 border-t border-gray-100">
                        <button
                            onClick={() => setPlannedTour(null)}
                            className="px-6 py-2.5 text-gray-500 font-bold hover:text-gray-700 transition flex items-center"
                        >
                            <Trash2 size={18} className="mr-2" />
                            Discard
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-emerald-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 flex items-center"
                        >
                            <Save size={18} className="mr-2" />
                            Confirm Plan
                        </button>
                    </div>
                </div>
            )}
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

export default PlanTours;
