import React, { useState, useEffect } from 'react';
import { getVehicules, saveVehicule, deleteVehicule } from '../../services/api';
import { Plus, Edit, Trash, X, Save } from 'lucide-react';

const VehiculeManager = () => {
    const [vehicules, setVehicules] = useState([]);
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
            alert("Failed to save vehicle");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this vehicle?")) {
            try {
                await deleteVehicule(id);
                fetchVehicules();
            } catch (error) {
                console.error("Error deleting vehicule:", error);
                alert("Failed to delete vehicle");
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Manage Vehicles</h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-emerald-600 text-white px-4 py-2 rounded flex items-center hover:bg-emerald-700"
                >
                    <Plus size={18} className="mr-2" />
                    Add Vehicle
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-2 px-4 border-b text-left">ID</th>
                            <th className="py-2 px-4 border-b text-left">Plate Number</th>
                            <th className="py-2 px-4 border-b text-left">Capacity</th>
                            <th className="py-2 px-4 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicules.map((vehicule) => (
                            <tr key={vehicule.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{vehicule.id}</td>
                                <td className="py-2 px-4 border-b">{vehicule.matricule}</td>
                                <td className="py-2 px-4 border-b">{vehicule.capacite}</td>
                                <td className="py-2 px-4 border-b space-x-2">
                                    <button onClick={() => handleOpenModal(vehicule)} className="text-blue-600 hover:text-blue-800">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(vehicule.id)} className="text-red-600 hover:text-red-800">
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
                            <h3 className="text-lg font-bold">{isEditing ? 'Edit Vehicle' : 'Add Vehicle'}</h3>
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Plate Number</label>
                                <input
                                    type="text"
                                    value={formData.matricule}
                                    onChange={(e) => setFormData({ ...formData, matricule: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
                                    required
                                />
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

export default VehiculeManager;
