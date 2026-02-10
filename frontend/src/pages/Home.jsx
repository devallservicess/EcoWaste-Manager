import React from 'react';
import Navbar from '../components/Navbar';
import MapComponent from '../components/MapComponent';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-6">
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Smart Waste Management</h1>
                    <p className="text-xl text-gray-600">Optimizing collection routes for a cleaner city.</p>
                </header>

                <section className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-semibold mb-6">Live Collection Points</h2>
                    <MapComponent />
                </section>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
                        <h3 className="text-xl font-bold mb-2">Real-Time Tracking</h3>
                        <p className="text-gray-600">Monitor bin levels instantly on the map.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
                        <h3 className="text-xl font-bold mb-2">Route Optimization</h3>
                        <p className="text-gray-600">Smart algorithms to reduce fuel consumption.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
                        <h3 className="text-xl font-bold mb-2">Data Reporting</h3>
                        <p className="text-gray-600">Export and analyze collection data easily.</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
