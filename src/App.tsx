import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import ToastProvider from '@/components/shared/Toast';

// Layouts
import PublicLayout from '@/components/layout/PublicLayout';
import AdminLayout from '@/components/layout/AdminLayout';

// Public Pages
import HomePage from '@/pages/HomePage';
import NoticesPage from '@/pages/NoticesPage';
import CoursesPage from '@/pages/CoursesPage';
import ResultsPage from '@/pages/ResultsPage';
import GalleryPage from '@/pages/GalleryPage';
import AboutPage from '@/pages/AboutPage';
import DynamicPage from '@/pages/DynamicPage';
import LoginPage from '@/pages/LoginPage';

// Admin Components
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardHome from '@/components/admin/DashboardHome';
import PagesManager from '@/components/admin/PagesManager';
import NoticesManager from '@/components/admin/NoticesManager';
import CoursesManager from '@/components/admin/CoursesManager';
import ResultsManager from '@/components/admin/ResultsManager';
import UsersManager from '@/components/admin/UsersManager';
import UploadsManager from '@/components/admin/UploadsManager';
import SettingsManager from '@/components/admin/SettingsManager';

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/page/:slug" element={<DynamicPage />} />
      </Route>

      {/* Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="pages" element={<PagesManager />} />
        <Route path="notices" element={<NoticesManager />} />
        <Route path="courses" element={<CoursesManager />} />
        <Route path="results" element={<ResultsManager />} />
        <Route path="users" element={<UsersManager />} />
        <Route path="uploads" element={<UploadsManager />} />
        <Route path="settings" element={<SettingsManager />} />
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={
        <PublicLayout />
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <ToastProvider />
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  );
}
