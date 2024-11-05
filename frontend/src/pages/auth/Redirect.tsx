import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../../util/axiosInstance"; // util 폴더에서 axiosInstance import

// 서버에서 반환하는 응답 데이터 타입
interface AuthResponse {
  token: string;
}

// 에러 타입을 정의 (서버에서 반환하는 에러 구조에 맞게 정의)
interface ApiError {
  message: string;
  status: number;
}

const Redirect = () => {
  const nav = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI as string;
        console.log("Redirect URI:", redirectUri);

        const code: string | null = new URL(window.location.href).searchParams.get("code");
        if (!code) {
          console.error("인증 코드를 찾지 못했습니다");
          return;
        }

        const response: AxiosResponse<AuthResponse> = await axiosInstance.post<AuthResponse>(
          "/oauth/kakao",
          { code, redirectUri },
        );

        if (response.status === 200) {
          console.log("200 응답 수신: 회원가입으로 이동");
          nav("/auth/signup");
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

    handleAuth();
  }, [nav]);

  return <div>Redirecting...</div>;
};

export default Redirect;
