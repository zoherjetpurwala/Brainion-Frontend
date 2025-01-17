import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserProvider, useUser } from "./context/UserContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const AppRoutes: React.FC = () => {
  const { user } = useUser();

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Home />} />

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
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
};

export default App;
