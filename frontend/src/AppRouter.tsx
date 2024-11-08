// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Intro from "./pages/intro/Intro";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Redirect from "./pages/auth/Redirect";

import ClubHome from "./pages/club/ClubHome";
import Home from "./pages/home/Home";
import GameResult from "./pages/home/GameResult";
import GameSchedule from "./pages/home/GameSchedule";
import CheerSong from "./pages/cheersong/CheerSong";
import CheerTeam from "./pages/cheerteam/CheerTeam";
import ClubRecommend from "./pages/cheerteam/ClubRecommend";
import CheerLyris from "./pages/cheersong/CheerLyris";
import CardStore from "./pages/cardStore/CardStore";
import MyPage from "./pages/mypage/MyPage";
import CameraCapture from "./pages/mypage/CameraCapture";

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
        {/* 로그인 된 사용자 접근 금지 */}
        <Route
          path="/intro"
          element={
            <AuthRoute>
              <Intro />
            </AuthRoute>
          }
        />
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
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/camera"
          element={
            <ProtectedRoute>
              <CameraCapture />
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
