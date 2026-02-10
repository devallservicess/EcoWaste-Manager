import React, { useState, useEffect } from 'react';
import { getPoints, savePoint, deletePoint } from '../../services/api';
import { Plus, Edit, Trash2, X, Save, MapPin, Navigation, Droplets, Trash, Search, Zap } from 'lucide-react';

const PointManager = () => {
    const [points, setPoints] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        longitude: '',
        latitude: '',
        capacite: '',
        niveauRemplissage: 0,
        typeDechet: 'General',
        etat: 'actif'
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchPoints();
    }, []);

    const fetchPoints = async () => {
        try {
            const response = await getPoints();
            setPoints(response.data);
        } catch (error) {
            console.error("Error fetching points:", error);
        }
    };

    const handleOpenModal = (point = null) => {
        if (point) {
            setFormData(point);
            setIsEditing(true);
        } else {
            setFormData({
                id: '',
                longitude: '',
                latitude: '',
                capacite: '',
                niveauRemplissage: 0,
                typeDechet: 'General',
                etat: 'actif'
            });
            setIsEditing(false);
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await savePoint(formData);
            setIsModalOpen(false);
            fetchPoints();
        } catch (error) {
            console.error("Error saving point:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this point?")) {
            try {
                await deletePoint(id);
                fetchPoints();
            } catch (error) {
                console.error("Error deleting point:", error);
            }
        }
    };

    const filteredPoints = points.filter(p =>
        p.id.toString().includes(searchTerm) ||
        p.typeDechet.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative flex-1 w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by ID or waste type..."
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
                    New Hub
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPoints.map((p) => (
                    <div key={p.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                        <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-[0.03] transition-transform group-hover:scale-125 pointer-events-none ${p.niveauRemplissage > 80 ? 'bg-rose-500' : 'bg-emerald-500'
                            }`}></div>

                        <div className="flex justify-between items-start mb-6">
                            <div className={`${p.niveauRemplissage > 80 ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                } p-3 rounded-xl border transition-colors`}>
                                <MapPin size={24} strokeWidth={1.5} />
                            </div>
                            <div className="flex space-x-1">
                                <button onClick={() => handleOpenModal(p)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit size={18} /></button>
                                <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                                    Hub #{p.id}
                                    {p.niveauRemplissage > 80 && <Zap size={14} className="ml-2 text-rose-500 animate-pulse" />}
                                </h3>
                                <div className="flex items-center text-xs text-gray-400 mt-1 font-medium">
                                    <Navigation size={12} className="mr-1" />
                                    {p.latitude.toFixed(4)}, {p.longitude.toFixed(4)}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                    <span className="text-gray-400">Current Occupancy</span>
                                    <span className={p.niveauRemplissage > 80 ? 'text-rose-600' : 'text-emerald-600'}>{p.niveauRemplissage}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ${p.niveauRemplissage > 80 ? 'bg-rose-500' : 'bg-emerald-500'
                                            }`}
                                        style={{ width: `${p.niveauRemplissage}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-1">Max Volume</p>
                                    <div className="flex items-center text-gray-700 font-bold text-sm">
                                        <Trash size={14} className="mr-1 text-gray-300" />
                                        {p.capacite} L
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-1">Waste Type</p>
                                    <div className="flex items-center text-blue-600 font-bold text-sm uppercase">
                                        <Droplets size={14} className="mr-1" />
                                        {p.typeDechet}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredPoints.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-400 italic bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-100">
                        No collection hubs found.
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-emerald-950/20 backdrop-blur-sm flex justify-center items-end sm:items-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-white/20 transform animate-slide-up">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-3xl">
                            <div className="flex items-center gap-3">
                                <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
                                    <MapPin size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">{isEditing ? 'Modify Hub' : 'Establish New Hub'}</h3>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">UNIQUE HUB ID</label>
                                    <input
                                        type="number"
                                        value={formData.id}
                                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none disabled:opacity-50 font-mono"
                                        required
                                        disabled={isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">TOTAL CAPACITY (L)</label>
                                    <input
                                        type="number"
                                        value={formData.capacite}
                                        onChange={(e) => setFormData({ ...formData, capacite: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                                        required
                                        placeholder="Volume in Liters"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">LATITUDE</label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={formData.latitude}
                                        onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">LONGITUDE</label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={formData.longitude}
                                        onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">WASTE CATEGORIZATION</label>
                                <select
                                    value={formData.typeDechet}
                                    onChange={(e) => setFormData({ ...formData, typeDechet: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
                                >
                                    <option value="General">Household / General</option>
                                    <option value="Plastic">Plastic & Polymers</option>
                                    <option value="Glass">Glass / Silica</option>
                                    <option value="Paper">Paper & Cardboard</option>
                                    <option value="Organic">Bio-Organic Waste</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 border border-gray-200 rounded-xl text-gray-500 font-bold hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center"
                                >
                                    <Save size={20} className="mr-2" />
                                    {isEditing ? 'Save Location' : 'Register Location'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PointManager;
