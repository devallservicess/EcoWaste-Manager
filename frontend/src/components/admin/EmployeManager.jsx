import React, { useState, useEffect } from 'react';
import { getEmployes, saveEmploye, deleteEmploye } from '../../services/api';
import { Plus, Edit, Trash2, X, Save, User, Phone, ShieldCheck, Search, Filter, Truck } from 'lucide-react';

const EmployeManager = () => {
    const [employes, setEmployes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        cin: '',
        tel: '',
        password: '',
        competence: 'Employe',
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
        }
    };

    const handleDelete = async (cin) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await deleteEmploye(cin);
                fetchEmployes();
            } catch (error) {
                console.error("Error deleting employe:", error);
            }
        }
    };

    const filteredEmployes = employes.filter(emp =>
        `${emp.prenom} ${emp.nom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.cin.includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative flex-1 w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or CIN..."
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
                    New Employee
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">CIN</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredEmployes.map((emp) => (
                                <tr key={emp.cin} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mr-3 border border-emerald-100">
                                                {emp.nom.charAt(0)}{emp.prenom.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">{emp.prenom} {emp.nom}</p>
                                                <p className="text-xs text-gray-500 flex items-center mt-0.5">
                                                    <Phone size={10} className="mr-1" /> {emp.tel}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{emp.cin}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${emp.competence === 'Chauffeur'
                                            ? 'bg-blue-50 text-blue-600 border border-blue-100'
                                            : 'bg-gray-50 text-gray-600 border border-gray-100'
                                            }`}>
                                            {emp.competence === 'Chauffeur' ? <Truck size={12} className="mr-1" /> : <User size={12} className="mr-1" />}
                                            {emp.competence}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold ${emp.status === 'Disponible'
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-3">
                                        <button
                                            onClick={() => handleOpenModal(emp)}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                            title="Edit"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(emp.cin)}
                                            className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredEmployes.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400 italic">
                                        No employees found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-emerald-950/20 backdrop-blur-sm flex justify-center items-end sm:items-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-white/20 transform animate-slide-up">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-3xl">
                            <div className="flex items-center gap-3">
                                <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
                                    {isEditing ? <Edit size={20} /> : <Plus size={20} />}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">{isEditing ? 'Update Employee' : 'Register Employee'}</h3>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">CIN IDENTIFIER</label>
                                    <input
                                        type="text"
                                        value={formData.cin}
                                        onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none disabled:opacity-50 font-mono"
                                        required
                                        disabled={isEditing}
                                        placeholder="e.g. 12345678"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">CONTACT NUMBER</label>
                                    <input
                                        type="text"
                                        value={formData.tel}
                                        onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                                        placeholder="+216 -- --- ---"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">FIRST NAME</label>
                                    <input
                                        type="text"
                                        value={formData.prenom}
                                        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">LAST NAME</label>
                                    <input
                                        type="text"
                                        value={formData.nom}
                                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">ACCESS ROLE</label>
                                    <select
                                        value={formData.competence}
                                        onChange={(e) => setFormData({ ...formData, competence: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
                                    >
                                        <option value="Employe">Standard Employee</option>
                                        <option value="Chauffeur">Fleet Driver</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">SYSTEM PASSWORD</label>
                                    <div className="relative">
                                        <ShieldCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text" // User requested "mot de passe", showing it as text is fine for admin management
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 focus:ring-2 focus:ring-emerald-500 outline-none"
                                            required
                                        />
                                    </div>
                                </div>
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
                                    {isEditing ? 'Save Changes' : 'Confirm Registration'}
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
