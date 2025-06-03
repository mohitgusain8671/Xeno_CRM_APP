import { Routes, Route, Navigate } from 'react-router-dom';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import AudiencePage from './pages/AudiencePage';
import CampaignsPage from './pages/CampaignsPage';
import MyCampaignsPage from './pages/MyCampaignsPage';
import LoginPage from './pages/LoginPage';
import { useAppStore } from './store';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  // Placeholder for authentication logic
  const { isAuthenticated, authLoading } = useAppStore();
  if (authLoading) {
    return <div className="text-white p-4">Loading...</div>; // Or a spinner
  }
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useAppStore(); 

  return !isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  const fetchUserInfo = useAppStore(state => state.fetchUserInfo);

  useEffect(() => {
    fetchUserInfo();
  }, []);
  return (
    <>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow">
            <Routes>
              <Route path="/login" 
                element={
                  <AuthRoute><LoginPage /></AuthRoute>
                } 
              />
              <Route path="/" element={<HomePage />} />
              <Route
                path="/audience"
                element={
                  <ProtectedRoute>
                    <AudiencePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/campaigns"
                element={
                  <ProtectedRoute>
                    <CampaignsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-campaigns"
                element={
                  <ProtectedRoute>
                    <MyCampaignsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        draggable
      />
    </>
  );
}

export default App;
