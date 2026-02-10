import React, { useState, useEffect } from 'react';
import { getVehicules, saveVehicule, deleteVehicule } from '../../services/api';
import { Plus, Edit, Trash2, X, Save, Truck, Hash, Gauge, Search } from 'lucide-react';

const VehiculeManager = () => {
    const [vehicules, setVehicules] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        matricule: '',
        capacite: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchVehicules();
    }, []);

    const fetchVehicules = async () => {
        try {
            const response = await getVehicules();
            setVehicules(response.data);
        } catch (error) {
            console.error("Error fetching vehicules:", error);
        }
    };

    const handleOpenModal = (vehicule = null) => {
        if (vehicule) {
            setFormData(vehicule);
            setIsEditing(true);
        } else {
            setFormData({
                id: '',
                matricule: '',
                capacite: ''
            });
            setIsEditing(false);
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await saveVehicule(formData);
            setIsModalOpen(false);
            fetchVehicules();
        } catch (error) {
            console.error("Error saving vehicule:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this vehicle?")) {
            try {
                await deleteVehicule(id);
                fetchVehicules();
            } catch (error) {
                console.error("Error deleting vehicule:", error);
            }
        }
    };

    const filteredVehicules = vehicules.filter(v =>
        v.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.id.toString().includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative flex-1 w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by plate or ID..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="w-full sm:w-auto bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition flex items-center justify-center shadow-lg shadow-emerald-100"
                >
                    <Plus size={20} className="mr-2" />
                    New Vehicle
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicules.map((v) => (
                    <div key={v.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-blue-50 p-3 rounded-xl text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Truck size={24} strokeWidth={1.5} />
                            </div>
                            <div className="flex space-x-1">
                                <button
                                    onClick={() => handleOpenModal(v)}
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(v.id)}
                                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">{v.matricule}</h3>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Vehicle Plate</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-1">Asset ID</p>
                                    <div className="flex items-center text-gray-700 font-bold">
                                        <Hash size={14} className="mr-1 text-gray-300" />
                                        {v.id}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-1">Max Capacity</p>
                                    <div className="flex items-center text-emerald-600 font-bold">
                                        <Gauge size={14} className="mr-1" />
                                        {v.capacite} KG
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredVehicules.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-400 italic bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-100">
                        No vehicles registered yet or matching your search.
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-emerald-950/20 backdrop-blur-sm flex justify-center items-end sm:items-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-white/20 transform animate-slide-up">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-3xl">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
                                    <Truck size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">{isEditing ? 'Update Assets' : 'Add New Vehicle'}</h3>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">INTERNAL ASSET ID</label>
                                <input
                                    type="number"
                                    value={formData.id}
                                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none disabled:opacity-50 font-mono"
                                    required
                                    disabled={isEditing}
                                    placeholder="Unique integer ID"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">VEHICLE PLATE NUMBER</label>
                                <div className="relative">
                                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        value={formData.matricule}
                                        onChange={(e) => setFormData({ ...formData, matricule: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pl-10 focus:ring-2 focus:ring-emerald-500 outline-none uppercase font-bold tracking-tight"
                                        required
                                        placeholder="ABC-123-XY"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">LOAD CAPACITY (KG)</label>
                                <div className="relative">
                                    <Gauge className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="number"
                                        value={formData.capacite}
                                        onChange={(e) => setFormData({ ...formData, capacite: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pl-10 focus:ring-2 focus:ring-emerald-500 outline-none"
                                        required
                                        placeholder="Max payload"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 border border-gray-200 rounded-xl text-gray-500 font-bold hover:bg-gray-50 transition-colors flex-1 sm:flex-none"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center flex-1 sm:flex-none"
                                >
                                    <Save size={20} className="mr-2" />
                                    {isEditing ? 'Update Fleet' : 'Add to Fleet'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VehiculeManager;
