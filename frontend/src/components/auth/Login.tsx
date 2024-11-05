import karina from "../../../src/assets/images/karina.jpg";
import kakao from "../.././assets/images/auth/kakao_login.png";
import google from "../../assets/images/auth/google_login.png";
import naver from "../../assets/images/auth/naver_login.png";

type LoginProps = {
  onNaverLoginClick: () => void;
  onKakaoLoginClick: () => void;
  onGoogleLoginClick: () => void;
  signUpPath: string;
};

const Login = ({
  onNaverLoginClick,
  onKakaoLoginClick,
  onGoogleLoginClick,
  signUpPath,
}: LoginProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full pt-12">
      <img src={karina} alt="Karina" className="w-60 h-60 rounded-xl object-cover mb-36" />
      <img
        src={naver}
        alt="네이버 로그인 버튼"
        className="w-full cursor-pointer mb-2"
        onClick={onNaverLoginClick}
      />
      <img
        src={kakao}
        alt="카카오 로그인 버튼"
        className="w-full cursor-pointer mb-2"
        onClick={onKakaoLoginClick}
      />
      <img
        src={google}
        alt="구글 로그인 버튼"
        className="w-full cursor-pointer mb-12"
        onClick={onGoogleLoginClick}
      />

      <div className="font-kbogothiclight mb-4 text-center">
        아직 회원이 아니신가요?
        <a href={signUpPath} className="text-green-900">
          회원가입
        </a>
      </div>
    </div>
  );
};

export default Login;
