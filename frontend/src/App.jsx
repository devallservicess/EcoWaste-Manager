import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PlanTours from './pages/PlanTours';
import ImportExport from './pages/ImportExport';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plan-tours" element={<PlanTours />} />
          <Route path="/data" element={<ImportExport />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
