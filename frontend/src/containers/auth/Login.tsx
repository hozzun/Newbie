import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../../components/auth/Login";
import { KAKAO_AUTH_URL, GOOGLE_AUTH_URL } from "../../api/Oauth";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 인트로 체크 로직만 유지
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    if (!hasSeenIntro) {
      navigate("/intro");
    }
  }, [navigate]);

  const handleKakaoLoginClick = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleGoogleLoginClick = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <div>
      <LoginComponent
        onKakaoLoginClick={handleKakaoLoginClick}
        onGoogleLoginClick={handleGoogleLoginClick}
      />
    </div>
  );
};

export default Login;
