import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { autoPlanTournee, saveTournee } from '../services/api';

const PlanTours = () => {
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

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-6 max-w-4xl">
                <h1 className="text-3xl font-bold mb-6">Plan Collection Tours</h1>

                <div className="bg-white p-8 rounded-xl shadow-md mb-8">
                    <form onSubmit={handlePlan} className="flex gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-gray-700 font-medium mb-2">Select Date for Tour</label>
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-50"
                        >
                            {loading ? 'Calculating...' : 'Auto-Generate Plan'}
                        </button>
                    </form>
                </div>

                {plannedTour && (
                    <div className="bg-white p-8 rounded-xl shadow-md animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Proposed Tour Plan</h2>
                            <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-bold">
                                Distance: {plannedTour.distance} km
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Points to Collect</h3>
                                <ul className="space-y-2">
                                    {plannedTour.points.map(pid => (
                                        <li key={pid} className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                            Point #{pid}
                                        </li>
                                    ))}
                                    {plannedTour.points.length === 0 && <p className="text-gray-500 italic">No critical points found.</p>}
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Assigned Resources</h3>
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500">Vehicles</p>
                                    <div className="flex gap-2 mt-1">
                                        {plannedTour.vehicules.map(v => (
                                            <span key={v} className="bg-gray-100 px-3 py-1 rounded text-sm">Vehicle #{v}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Agents (CIN)</p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {plannedTour.agents.map(a => (
                                            <span key={a} className="bg-gray-100 px-3 py-1 rounded text-sm">{a}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setPlannedTour(null)}
                                className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition"
                            >
                                Discard
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-blue-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                            >
                                Confirm & Save Tour
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlanTours;
