import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import MainLayout from "./layout/MainLayout ";  //<-- removed extra space
import Signup from "./pages/Signup";
import Pricing from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/Profile";
import DashboardPage from "./pages/DashboardPage";
import UploadPage from "./pages/UploadPage";
import ProcessingPage from "./pages/ProcessingPage";
import ResultsPage from "./pages/ResultsPage";
import HistoryPage from "./pages/History";
import SettingsPage from "./pages/Settings";
import SupportPage from "./pages/Support";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./firebase/useAuth";
import Features from "./pages/Features";
import Navbar from "./common/Navbar";

function AppContent() {
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth();

  // Handle navigation when user becomes authenticated
  useEffect(() => {
    if (!loading && currentUser) {
      // Check if we're on login or signup page, then redirect to dashboard
      const currentPath = window.location.pathname;
      if (currentPath === "/login" || currentPath === "/signup") {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [currentUser, loading, navigate]);

  return (
    <>
      {/* Navbar always visible on all pages */}
      <Navbar />
      <Routes>
        {/* LAYOUT ROUTE */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />        {/* /  → Home */}
          <Route path="login" element={<LoginPage />} /> {/* /login */}
          <Route path="signup" element={<Signup />} />
          <Route path="/pricing" element={<Pricing />} />   {/* <-- Route */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/features" element={<Features />} />

          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
        </Route>
        
        {/* Dashboard Routes (protected - require authentication) */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/upload" 
          element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/processing" 
          element={
            <ProtectedRoute>
              <ProcessingPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/results" 
          element={
            <ProtectedRoute>
              <ResultsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/history" 
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/settings" 
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/support" 
          element={
            <ProtectedRoute>
              <SupportPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
