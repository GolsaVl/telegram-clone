import { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/use-auth";
import AuthLayout from "./layouts/auth-layout";
import AppLayout from "./layouts/app-layout";
import LoadingPage from "./pages/loading-page";
import { AnimatePresence } from "framer-motion";

const LoginPage = lazy(() => import("./pages/login-page"));
const RegisterPage = lazy(() => import("./pages/register-page"));
const ChatsPage = lazy(() => import("./pages/ChatsPage"));
const ChatPage = lazy(() => import("./pages/chat-page"));
const ProfilePage = lazy(() => import("./pages/profile-page"));
const SettingsPage = lazy(() => import("./pages/settings-page"));
const NotFoundPage = lazy(() => import("./pages/not-found-page"));

function App() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {/* 
        Keying Routes with location.pathname and passing location allows AnimatePresence
        to correctly track route changes for page transitions.
        Suspense is now moved to wrap the individual lazy-loaded page components.
      */}
      <Routes location={location} key={location.pathname}>
        {/* Public routes */}
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <Suspense fallback={<LoadingPage />}>
                {isAuthenticated ? (
                  <Navigate to="/chats" replace />
                ) : (
                  <LoginPage />
                )}
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<LoadingPage />}>
                {isAuthenticated ? (
                  <Navigate to="/chats" replace />
                ) : (
                  <RegisterPage />
                )}
              </Suspense>
            }
          />
        </Route>

        {/* Protected routes */}
        <Route
          element={
            isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />
          }
        >
          <Route path="/" element={<Navigate to="/chats" replace />} />
          <Route
            path="/chats"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ChatsPage />
              </Suspense>
            }
          />
          <Route
            path="/chats/:chatId"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ChatPage />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ProfilePage />
              </Suspense>
            }
          />
          <Route
            path="/settings"
            element={
              <Suspense fallback={<LoadingPage />}>
                <SettingsPage />
              </Suspense>
            }
          />
        </Route>

        {/* 404 page */}
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingPage />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
