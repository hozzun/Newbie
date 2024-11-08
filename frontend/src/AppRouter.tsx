// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Redirect from "./pages/auth/Redirect";
import Intro from "./pages/intro/Intro";

import ClubHome from "./pages/club/ClubHome";
import Home from "./pages/home/Home";
import GameResult from "./pages/home/GameResult";
import GameSchedule from "./pages/home/GameSchedule";
import CheerSong from "./pages/cheersong/CheerSong";
import CheerTeam from "./pages/cheerteam/CheerTeam";
import ClubRecommend from "./pages/cheerteam/ClubRecommend";
import CheerLyris from "./pages/cheersong/CheerLyris";
import CardStore from "./pages/cardStore/CardStore";

// 로그인 하지 않은 사용자는 로그인으로
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

function IntroRoute({ children }: { children: JSX.Element }) {
  const hasSeenIntro = localStorage.getItem("hasSeenIntro");
  const token = sessionStorage.getItem("access_token");

  // Intro를 본 적이 있으면
  if (hasSeenIntro === "true") {
    // 토큰이 있으면 홈으로, 없으면 로그인으로
    return token ? <Navigate to="/" /> : <Navigate to="/login" />;
  }

  return children;
}

function RootRoute() {
  const hasSeenIntro = localStorage.getItem("hasSeenIntro");
  const token = sessionStorage.getItem("access_token");

  if (!hasSeenIntro) {
    return <Navigate to="/intro" />;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Navigate to="/" />;
}

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* 루트 경로 처리 */}
        <Route path="/" element={<RootRoute />} />
        {/* Intro 페이지 라우트 추가 */}
        <Route
          path="/intro"
          element={
            <IntroRoute>
              <Intro />
            </IntroRoute>
          }
        />

        {/* 로그인 된 사용자 접근 금지 */}
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

        {/* 로그인 안된 사용자 접근금지 */}
        <Route
          path="/clubhome"
          element={
            <ProtectedRoute>
              <ClubHome />
            </ProtectedRoute>
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
        <Route
          path="/cheersong"
          element={
            <ProtectedRoute>
              <CheerSong />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cheerteam"
          element={
            <ProtectedRoute>
              <CheerTeam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cheersong/cheerlyris"
          element={
            <ProtectedRoute>
              <CheerLyris />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clubrecommend"
          element={
            <ProtectedRoute>
              <ClubRecommend />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gameschedule"
          element={
            <ProtectedRoute>
              <GameSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gameschedule/gameresult"
          element={
            <ProtectedRoute>
              <GameResult />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cardstore"
          element={
            <ProtectedRoute>
              <CardStore />
            </ProtectedRoute>
          }
        />

        {/* 리다이렉트 경로 */}
        <Route path="/auth/redirect" element={<Redirect />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
