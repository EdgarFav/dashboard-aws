import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from './auth/components/ProtectedRoute';
import OverviewSection from './dashboard/sections/OverviewSection';
import DataUploadSection from './dashboard/sections/DataUploadSection';
import UsersSection from './dashboard/sections/UsersSection';
import AnalyticsSection from './dashboard/sections/AnalyticsSection';
import ForecastSection from './dashboard/sections/ForecastSection';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<OverviewSection />} />
          <Route path="upload" element={<DataUploadSection />} />
          <Route path="forecast" element={<ForecastSection />} />
          <Route path="analytics" element={<AnalyticsSection />} />
          <Route path="users" element={<UsersSection />} />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
