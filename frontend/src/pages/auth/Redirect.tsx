import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../../util/axiosInstance";

interface AuthResponse {
  token: string;
}

interface ApiError {
  message: string;
  status: number;
}

const Redirect = () => {
  const nav = useNavigate();

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
          const kakaoRedirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI as string;
          response = await axiosInstance.post<AuthResponse>(`/api/v1/login/kakao/${code}`, {
            redirectUri: "/signup",
          });
          console.log(response, "redirectUri", kakaoRedirectUri);
        } else if (platform === "google" && accessToken) {
          const googleRedirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI as string;
          response = await axiosInstance.post<AuthResponse>(
            `/api/v1/login/google/access-token?${accessToken}`,
            { redirectUri: googleRedirectUri },
          );
        } else {
          console.error("유효하지 않은 로그인 요청입니다.");
          return;
        }

        if (response.status === 200) {
          console.log("200 응답 수신: 회원가입으로 이동");
          nav("/signup");
        } else if (response.status === 303) {
          console.log("303 응답 수신: 홈으로 이동");
          sessionStorage.setItem("token", response.data.token);
          nav("/");
        } else {
          console.error("예상치 못한 응답 상태 코드:", response.status);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ApiError>;
          console.error("인증 에러:", axiosError.response?.data.message || error.message);
        } else {
          console.error("예기치 않은 에러:", error);
        }
      }
    };

    socialLogin();
  }, [nav]);

  return <div>Redirecting...</div>;
};

export default Redirect;
