import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Redirect from "./pages/auth/Redirect";
import Home from "./pages/home/Home";

// 로그인 하지 않은 사용자의 접근 방지
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return children;
}

// 로그인된 사용자가 로그인 페이지에 접근하지 못하게
function AuthRoute({ children }: { children: JSX.Element }) {
  const token = sessionStorage.getItem("access_token");
  if (token) {
    return <Navigate to="/" />;
  }
  return children;
}

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* 리다이렉트 경로 추가 */}
        <Route path="/auth/redirect" element={<Redirect />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
