import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { exportData, importData } from '../services/api';
import { FileUp, Download, AlertCircle, CheckCircle } from 'lucide-react';

const ImportExport = () => {
    const [importType, setImportType] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleImport = async (e) => {
        e.preventDefault();
        if (!importType || !file) {
            setMessage({ type: 'error', text: 'Please select a type and a file.' });
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        try {
            await importData(importType, formData);
            setMessage({ type: 'success', text: `Successfully imported ${importType} data.` });
            setFile(null);
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Failed to import data. Check the file format.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-6 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Data Management</h1>

                {message.text && (
                    <div className={`p-4 mb-6 rounded-lg flex items-center gap-3 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Import Section */}
                    <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-blue-500">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                                <FileUp size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Import XML</h2>
                        </div>

                        <form onSubmit={handleImport} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Data Type</label>
                                <select
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={importType}
                                    onChange={(e) => setImportType(e.target.value)}
                                    required
                                >
                                    <option value="">Select Type...</option>
                                    <option value="employe_ins">Employees (employe_ins)</option>
                                    <option value="vehicule">Vehicles</option>
                                    <option value="point">Collection Points</option>
                                    <option value="tournees">Tours</option>
                                    <option value="rapports">Reports</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">XML File</label>
                                <input
                                    type="file"
                                    accept=".xml"
                                    className="w-full border border-gray-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {loading ? 'Importing...' : 'Upload & Import'}
                            </button>
                        </form>
                    </div>

                    {/* Export Section */}
                    <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-green-500">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-green-100 p-3 rounded-full text-green-600">
                                <Download size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Export XML</h2>
                        </div>

                        <p className="text-gray-600 mb-6">Download current data snapshots as XML files.</p>

                        <div className="space-y-3">
                            <ExportButton type="employe_ins" label="Employees" />
                            <ExportButton type="vehicule" label="Vehicles" />
                            <ExportButton type="point" label="Collection Points" />
                            <ExportButton type="tournees" label="Tours" />
                            <ExportButton type="rapports" label="Reports" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExportButton = ({ type, label }) => (
    <a
        href={exportData(type)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-between items-center w-full p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition group"
    >
        <span className="font-medium text-gray-700 group-hover:text-green-700">{label}</span>
        <Download size={18} className="text-gray-400 group-hover:text-green-600" />
    </a>
);

export default ImportExport;
