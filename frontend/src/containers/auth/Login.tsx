import LoginComponent from "../../components/auth/Login";
import { KAKAO_AUTH_URL, GOOGLE_AUTH_URL, NAVER_AUTH_URL } from "../../api/Oauth";

const Login = () => {
  const handleNaverLoginClick = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  const handleKakaoLoginClick = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleGoogleLoginClick = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <>
      <div>
        <LoginComponent
          onNaverLoginClick={handleNaverLoginClick}
          onKakaoLoginClick={handleKakaoLoginClick}
          onGoogleLoginClick={handleGoogleLoginClick}
          signUpPath="/signup"
        />
      </div>
    </>
  );
};

export default Login;
