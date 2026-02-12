import axios from 'axios';

const API_URL = 'https://ecowaste-manager.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getPoints = () => api.get('/points');
export const savePoint = (point) => api.post('/points', point);
export const deletePoint = (id) => api.delete(`/points/${id}`);

export const getEmployes = () => api.get('/employes');
export const saveEmploye = (employe) => api.post('/employes', employe);
export const deleteEmploye = (cin) => api.delete(`/employes/${cin}`);
export const loginEmploye = (credentials) => api.post('/auth/login/employe', credentials);
export const loginAdmin = (credentials) => api.post('/auth/login/admin', credentials);

export const exportData = (type) => `${API_URL}/data/export/${type}`;
export const importData = (type, formData) => api.post(`/data/import/${type}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const getVehicules = () => api.get('/vehicules');
export const saveVehicule = (vehicule) => api.post('/vehicules', vehicule);
export const deleteVehicule = (id) => api.delete(`/vehicules/${id}`);

export const getTournees = () => api.get('/tournees');
export const saveTournee = (tournee) => api.post('/tournees', tournee);
export const deleteTournee = (id) => api.delete(`/tournees/${id}`);
export const autoPlanTournee = (date) => api.post(`/tournees/auto-plan?date=${date}`);

export const getRapports = () => api.get('/rapports');
export const saveRapport = (rapport) => api.post('/rapports', rapport);
export const deleteRapport = (id) => api.delete(`/rapports/${id}`);

export default api;
