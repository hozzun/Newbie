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
import Cheerteam from "./pages/cheersong/CheerTeam";
import ClubRecommend from "./pages/cheerteam/ClubRecommend";
import CheerLyris from "./pages/cheersong/CheerLyris";
import CardStore from "./pages/cardStore/CardStore";
import MyPage from "./pages/mypage/MyPage";
import CameraCapture from "./pages/mypage/CameraCapture";
import CardDetail from "./pages/cardStore/CardDetail";
import ReviseInfo from "./pages/mypage/ReviseInfo";
import Player from "./pages/player/Player";
import PlayerList from "./pages/player/PlayerList";
import PhotoCard from "./pages/mypage/PhotoCard";
import PhotoCardDetail from "./pages/mypage/PhotoCardDetail";
import BaseballDict from "./pages/baseballdict/BaseballDict";
import WatchGame from "./pages/mypage/WatchGame";
import CommuHome from "./pages/commu/CommuHome";
import MyBoard from "./pages/mypage/MyBoard";
import MyScrap from "./pages/mypage/MyScrap";
import MyActive from "./pages/mypage/MyActive";
import CommuFreeCreate from "./pages/commu/CommuFreeCreate";
import CommuTradeCreate from "./pages/commu/CommuTradeCreate";
import ScrollToTop from "./components/common/ScrollToTop";
import CommuTradeDetail from "./pages/commu/CommuTradeDetail";
import CommuFreeDetail from "./pages/commu/CommuFreeDetail";

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

const AppRouter = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Intro 페이지 라우트 추가 */}
        <Route path="/intro" element={<Intro />} />

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
          path="/club/:id"
          element={
            <ProtectedRoute>
              <ClubHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/club/:id/player"
          element={
            <ProtectedRoute>
              <PlayerList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/club/:clubId/player/:playerId"
          element={
            <ProtectedRoute>
              <Player />
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
          path="/baseballdict"
          element={
            <ProtectedRoute>
              <BaseballDict />
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
          path="/cheersong/lyris"
          element={
            <ProtectedRoute>
              <CheerLyris />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cheersong/team"
          element={
            <ProtectedRoute>
              <Cheerteam />
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
          path="/clubrecommend"
          element={
            <ProtectedRoute>
              <ClubRecommend />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game/schedule"
          element={
            <ProtectedRoute>
              <GameSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game/result/:id"
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
          path="/cardstore/:id"
          element={
            <ProtectedRoute>
              <CardDetail />
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
          path="/mypage/revise"
          element={
            <ProtectedRoute>
              <ReviseInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypage/photocard"
          element={
            <ProtectedRoute>
              <PhotoCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypage/photocard/:id"
          element={
            <ProtectedRoute>
              <PhotoCardDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypage/watchgame/:id"
          element={
            <ProtectedRoute>
              <WatchGame />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypage/board"
          element={
            <ProtectedRoute>
              <MyBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypage/active"
          element={
            <ProtectedRoute>
              <MyActive />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypage/scrap"
          element={
            <ProtectedRoute>
              <MyScrap />
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
        <Route
          path="/commuhome"
          element={
            <ProtectedRoute>
              <CommuHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/commuhome/freecreate"
          element={
            <ProtectedRoute>
              <CommuFreeCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/commuhome/tradecreate"
          element={
            <ProtectedRoute>
              <CommuTradeCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/commuhome/freedetail/:id"
          element={
            <ProtectedRoute>
              <CommuFreeDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/commuhome/tradedetail"
          element={
            <ProtectedRoute>
              <CommuTradeDetail />
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
