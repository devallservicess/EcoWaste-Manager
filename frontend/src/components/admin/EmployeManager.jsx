import React, { useState, useEffect } from 'react';
import { getEmployes, saveEmploye, deleteEmploye } from '../../services/api';
import { Plus, Edit, Trash, X, Save } from 'lucide-react';

const EmployeManager = () => {
    const [employes, setEmployes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        cin: '',
        tel: '',
        password: '',
        competence: 'Employe', // Default
        status: 'Disponible'
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchEmployes();
    }, []);

    const fetchEmployes = async () => {
        try {
            const response = await getEmployes();
            setEmployes(response.data);
        } catch (error) {
            console.error("Error fetching employes:", error);
        }
    };

    const handleOpenModal = (employe = null) => {
        if (employe) {
            setFormData(employe);
            setIsEditing(true);
        } else {
            setFormData({
                nom: '',
                prenom: '',
                cin: '',
                tel: '',
                password: '',
                competence: 'Employe',
                status: 'Disponible'
            });
            setIsEditing(false);
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await saveEmploye(formData);
            setIsModalOpen(false);
            fetchEmployes();
        } catch (error) {
            console.error("Error saving employe:", error);
            alert("Failed to save employee");
        }
    };

    const handleDelete = async (cin) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await deleteEmploye(cin);
                fetchEmployes();
            } catch (error) {
                console.error("Error deleting employe:", error);
                alert("Failed to delete employee");
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Manage Employees</h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-emerald-600 text-white px-4 py-2 rounded flex items-center hover:bg-emerald-700"
                >
                    <Plus size={18} className="mr-2" />
                    Add Employee
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-2 px-4 border-b text-left">CIN</th>
                            <th className="py-2 px-4 border-b text-left">Name</th>
                            <th className="py-2 px-4 border-b text-left">Role</th>
                            <th className="py-2 px-4 border-b text-left">Tel</th>
                            <th className="py-2 px-4 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employes.map((emp) => (
                            <tr key={emp.cin} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{emp.cin}</td>
                                <td className="py-2 px-4 border-b">{emp.prenom} {emp.nom}</td>
                                <td className="py-2 px-4 border-b">
                                    <span className={`px-2 py-1 rounded text-xs ${emp.competence === 'Chauffeur' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {emp.competence}
                                    </span>
                                </td>
                                <td className="py-2 px-4 border-b">{emp.tel}</td>
                                <td className="py-2 px-4 border-b space-x-2">
                                    <button onClick={() => handleOpenModal(emp)} className="text-blue-600 hover:text-blue-800">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(emp.cin)} className="text-red-600 hover:text-red-800">
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
                            <h3 className="text-lg font-bold">{isEditing ? 'Edit Employee' : 'Add Employee'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">CIN (ID)</label>
                                <input
                                    type="text"
                                    value={formData.cin}
                                    onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
                                    required
                                    disabled={isEditing} // CIN is usually ID, cannot change
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        value={formData.prenom}
                                        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        value={formData.nom}
                                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Role</label>
                                <select
                                    value={formData.competence}
                                    onChange={(e) => setFormData({ ...formData, competence: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
                                >
                                    <option value="Employe">Employé</option>
                                    <option value="Chauffeur">Chauffeur</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="text"
                                    value={formData.tel}
                                    onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="text"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

export default EmployeManager;
