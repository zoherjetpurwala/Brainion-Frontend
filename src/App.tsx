import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import LoadingComponent from "./components/LoadingComponent";
import { useUserStore } from "./store/useUserStore";

const AppRoutes: React.FC = () => {
  const { user, loading, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser(); // Fetch user on mount
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Routes>
      {/* Public Route */}
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />}
      />

      {/* Private Route */}
      <Route
        path="/dashboard/*"
        element={user ? <Dashboard /> : <Navigate to="/" replace />}
      />

      {/* Fallback for non-existent routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
