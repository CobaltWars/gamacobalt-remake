// React est importé implicitement avec JSX
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import SoftwarePage from './pages/SoftwarePage';
import GldfPage from './pages/GldfPage';
import MaintenancePage from './pages/MaintenancePage';

const AppContent = () => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header currentPath={location.pathname} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jeux" element={<GamesPage />} />
          <Route path="/logiciels" element={<SoftwarePage />} />
          <Route path="/gldf" element={<GldfPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
