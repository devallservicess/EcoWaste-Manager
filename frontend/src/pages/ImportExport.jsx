import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { exportData, importData } from '../services/api';
import { FileUp, Download, AlertCircle, CheckCircle, Database, FileText } from 'lucide-react';

const ImportExport = ({ headless = false }) => {
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

    const content = (
        <div className={headless ? "" : "container mx-auto p-6 max-w-5xl"}>
            {!headless && <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">System Data Management</h1>}

            {message.text && (
                <div className={`p-4 mb-8 rounded-2xl flex items-center gap-3 animate-fade-in ${message.type === 'success'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    : 'bg-rose-50 text-rose-700 border border-rose-100'
                    }`}>
                    {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span className="font-medium">{message.text}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Import Section */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-50">
                        <div className="bg-blue-50 p-4 rounded-xl text-blue-600 border border-blue-100">
                            <FileUp size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Import Data</h2>
                            <p className="text-sm text-gray-500">Upload XML files to populate system</p>
                        </div>
                    </div>

                    <form onSubmit={handleImport} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">Data Categorization</label>
                            <select
                                className="w-full border border-gray-200 rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 cursor-pointer"
                                value={importType}
                                onChange={(e) => setImportType(e.target.value)}
                                required
                            >
                                <option value="">Select Category...</option>
                                <option value="employe_ins">Active Personnel List</option>
                                <option value="vehicule">Fleet Inventory</option>
                                <option value="point">Collection Hubs</option>
                                <option value="tournees">Route Schedules</option>
                                <option value="rapports">Activity Reports</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">Source File (.XML)</label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    accept=".xml"
                                    className="w-full border-2 border-dashed border-gray-200 rounded-xl p-8 text-center file:hidden cursor-pointer hover:border-blue-400 transition-colors"
                                    onChange={handleFileChange}
                                    required
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-gray-400 group-hover:text-blue-500 transition-colors">
                                    <FileText size={32} className="mb-2" />
                                    <span className="text-sm font-medium">{file ? file.name : "Click or drag to upload XML"}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50 shadow-lg shadow-blue-100 flex items-center justify-center"
                        >
                            {loading ? 'Processing XML...' : (
                                <>
                                    <FileUp size={20} className="mr-2" />
                                    Synchronize Data
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Export Section */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-50">
                        <div className="bg-emerald-50 p-4 rounded-xl text-emerald-600 border border-emerald-100">
                            <Download size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Data Backups</h2>
                            <p className="text-sm text-gray-500">Generate secure XML exports</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <ExportButton type="employe_ins" label="Personnel Records" />
                        <ExportButton type="vehicule" label="Fleet State" />
                        <ExportButton type="point" label="Hub Locations" />
                        <ExportButton type="tournees" label="Collection History" />
                        <ExportButton type="rapports" label="System Reports" />
                    </div>

                    <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
                        <AlertCircle className="text-amber-500 shrink-0" size={20} />
                        <p className="text-xs text-amber-800 leading-relaxed font-medium">
                            Exports reflect the current real-time state of the database.
                            Use these files for manual backups or data migration between environments.
                        </p>
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

const ExportButton = ({ type, label }) => (
    <a
        href={exportData(type)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-between items-center w-full p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-white hover:border-emerald-500 hover:shadow-sm transition-all group"
    >
        <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg text-gray-400 group-hover:text-emerald-500 transition-colors">
                <Database size={18} />
            </div>
            <span className="font-bold text-gray-700 group-hover:text-emerald-900">{label}</span>
        </div>
        <Download size={18} className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-y-0.5 transition-transform" />
    </a>
);

export default ImportExport;
