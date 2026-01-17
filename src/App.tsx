import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Listings from './pages/Listings';
import BossaPiskaProject from './pages/BossaPiskaProject';
import BeachProject from './pages/BeachProject';
import ClientPortal from './pages/ClientPortal';
import Dashboard from './pages/Dashboard';
import Tokenization from './pages/Tokenization';

// Placeholder Pages removed
// Listings now imported
// ClientPortal now imported
// BossaPiskaProject now imported
// BeachProject now imported
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="listings" element={<Listings />} />
                    <Route path="client-portal" element={<ClientPortal />} />
                    <Route path="bossa-piska" element={<BossaPiskaProject />} />
                    <Route path="beach-project" element={<BeachProject />} />
                    <Route path="tokenization" element={<Tokenization />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
