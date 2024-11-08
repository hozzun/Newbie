import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios, { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../../util/axiosInstance";
import { setUserInfo } from "../../redux/userSlice";

interface AuthResponse {
  email: string;
  token: string;
}

interface ApiError {
  message: string;
  status: number;
  token?: string;
}

const Redirect = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const socialLogin = async () => {
      try {
        const urlParams = new URL(window.location.href).searchParams;
        const platform = urlParams.get("platform"); // "kakao", "google" 또는 "naver"
        const code = urlParams.get("code");
        const accessToken = new URLSearchParams(window.location.hash.slice(1)).get("access_token");

        if (!platform || (!code && !accessToken)) {
          console.error("필요한 정보가 부족합니다.");
          return;
        }

        let response: AxiosResponse<AuthResponse>;

        if (platform === "kakao" && code) {
          response = await axiosInstance.post(`/api-auth/login/kakao/${code}`);
          // Redux store에 사용자 정보 저장
          dispatch(
            setUserInfo({
              email: response.data.email,
              platform: "kakao",
              isAuthenticated: true,
            }),
          );
        } else if (platform === "google" && accessToken) {
          response = await axiosInstance.post<AuthResponse>(
            `/api-auth/login/google/${accessToken}`,
          );
          dispatch(
            setUserInfo({
              email: response.data.email,
              platform: "google",
              isAuthenticated: true,
            }),
          );
        } else {
          console.error("유효하지 않은 로그인 요청입니다.");
          return;
        }

        if (response.status === 200) {
          console.log("200 응답 수신: 회원가입으로 이동");
          nav("/signup");
        } else {
          console.error("예상치 못한 응답 상태 코드:", response.status);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ApiError>;

          // 상태 코드가 303인지 확인
          if (axiosError.response?.status === 303) {
            console.log("303 응답 수신: 홈으로 이동");

            // 서버에서 전달된 토큰 추출 (토큰이 존재하는 경우에만)
            const token = axiosError.response.data.token;
            if (token) {
              sessionStorage.setItem("access_token", token); // sessionStorage에 저장
            }
            nav("/home"); // 홈으로 이동
          } else {
            console.error("인증 에러:", axiosError.response?.data.message || error.message);
          }
        } else {
          console.error("예기치 않은 에러:", error);
        }
      }
    };

    socialLogin();
  }, [nav, dispatch]);

  return <div>Redirecting...</div>;
};

export default Redirect;
