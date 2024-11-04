import LoginComponent from "../../components/auth/Login";
import { KAKAO_AUTH_URL } from "../../api/Oauth";
// import { KAKAO_AUTH_URL, GOOGLE_AUTH_URL, NAVER_AUTH_URL } from "../../api/Oauth";

const Login = () => {
  const handleKakaoLoginClick = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  // const handleGoogleLoginClick = () => {
  //   window.location.href = GOOGLE_AUTH_URL;
  // };

  // const handleNaverLoginClick = () => {
  //   window.location.href = NAVER_AUTH_URL;
  // };

  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <h2 className="text-xl font-bold mb-4">Login with</h2>
        <div className="flex space-x-4 mb-8">
          <a href={KAKAO_AUTH_URL} className="text-blue-500 underline">
            Kakao Login
          </a>
          {/* <a href={GOOGLE_AUTH_URL} className="text-blue-500 underline">
            Google Login
          </a>
          <a href={NAVER_AUTH_URL} className="text-blue-500 underline">
            Naver Login
          </a> */}
        </div>
      </div>
      <LoginComponent onKakaoLoginClick={handleKakaoLoginClick} />
    </>
  );
};

export default Login;
