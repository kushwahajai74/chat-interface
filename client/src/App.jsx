import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

import Loader from "./components/Loader/Loader";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./Provider/AuthProvider";

const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<ProtectedRoute user={isAuthenticated} />}>
              <Route path="/chat" element={<Chat />} />
            </Route>

            <Route
              path="/"
              element={
                <ProtectedRoute user={!isAuthenticated} redirect="/chat">
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/login"
              element={
                <ProtectedRoute user={!isAuthenticated} redirect="/">
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
