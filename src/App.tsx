import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/use-auth';
import AuthLayout from './layouts/auth-layout';
import AppLayout from './layouts/app-layout';
import LoadingPage from './pages/loading-page';
import { AnimatePresence } from 'framer-motion';

// Lazy-loaded pages for code splitting
const LoginPage = lazy(() => import('./pages/login-page'));
const RegisterPage = lazy(() => import('./pages/register-page'));
const ChatsPage = lazy(() => import('./pages/ChatsPage'));
const ChatPage = lazy(() => import('./pages/chat-page'));
const ProfilePage = lazy(() => import('./pages/profile-page'));
const SettingsPage = lazy(() => import('./pages/settings-page'));
const NotFoundPage = lazy(() => import('./pages/not-found-page'));

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {/* Public routes */}
          <Route element={<AuthLayout />}>
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/chats" replace /> : <LoginPage />}
            />
            <Route
              path="/register"
              element={isAuthenticated ? <Navigate to="/chats" replace /> : <RegisterPage />}
            />
          </Route>

          {/* Protected routes */}
          <Route 
            element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />}
          >
            <Route path="/" element={<Navigate to="/chats" replace />} />
            <Route path="/chats" element={<ChatsPage />} />
            <Route path="/chats/:chatId" element={<ChatPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* 404 page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;