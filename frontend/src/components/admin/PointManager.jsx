import React, { useState, useEffect } from 'react';
import { getPoints, savePoint, deletePoint } from '../../services/api';
import { Plus, Edit, Trash, X, Save } from 'lucide-react';

const PointManager = () => {
    const [points, setPoints] = useState([]);
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
            alert("Failed to save point");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this point?")) {
            try {
                await deletePoint(id);
                fetchPoints();
            } catch (error) {
                console.error("Error deleting point:", error);
                alert("Failed to delete point");
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Manage Collection Points</h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-emerald-600 text-white px-4 py-2 rounded flex items-center hover:bg-emerald-700"
                >
                    <Plus size={18} className="mr-2" />
                    Add Point
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-2 px-4 border-b text-left">ID</th>
                            <th className="py-2 px-4 border-b text-left">Location (Lat, Lng)</th>
                            <th className="py-2 px-4 border-b text-left">Capacity</th>
                            <th className="py-2 px-4 border-b text-left">Fill Level</th>
                            <th className="py-2 px-4 border-b text-left">Type</th>
                            <th className="py-2 px-4 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {points.map((point) => (
                            <tr key={point.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{point.id}</td>
                                <td className="py-2 px-4 border-b">{point.latitude}, {point.longitude}</td>
                                <td className="py-2 px-4 border-b">{point.capacite}</td>
                                <td className="py-2 px-4 border-b">{point.niveauRemplissage}%</td>
                                <td className="py-2 px-4 border-b">{point.typeDechet}</td>
                                <td className="py-2 px-4 border-b space-x-2">
                                    <button onClick={() => handleOpenModal(point)} className="text-blue-600 hover:text-blue-800">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(point.id)} className="text-red-600 hover:text-red-800">
                                        <Trash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">{isEditing ? 'Edit Point' : 'Add Point'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">ID</label>
                                <input
                                    type="number"
                                    value={formData.id}
                                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
                                    required
                                    disabled={isEditing}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Latitude</label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={formData.latitude}
                                        onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Longitude</label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={formData.longitude}
                                        onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                                <input
                                    type="number"
                                    value={formData.capacite}
                                    onChange={(e) => setFormData({ ...formData, capacite: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Waste Type</label>
                                <select
                                    value={formData.typeDechet}
                                    onChange={(e) => setFormData({ ...formData, typeDechet: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
                                >
                                    <option value="General">General</option>
                                    <option value="Plastic">Plastic</option>
                                    <option value="Glass">Glass</option>
                                    <option value="Paper">Paper</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 flex items-center"
                                >
                                    <Save size={18} className="mr-2" />
                                    Save
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
