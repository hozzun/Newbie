import karina from "../../../src/assets/images/LOGO.png";
import kakao from "../.././assets/images/auth/kakao_login.png";

type LoginProps = {
  onKakaoLoginClick: () => void;
};

const Login = ({ onKakaoLoginClick }: LoginProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <img src={karina} alt="Karina" className="w-70 h-80 rounded-xl object-cover" />
      <div className="font-kbogothiclight text-xl pb-8">
        <div className="text-center text-gray-900">
          처음 만나는 야구
          <br />
          함께 즐기는 첫걸음!
        </div>
      </div>
      <img
        src={kakao}
        alt="카카오 로그인 버튼"
        className="w-full cursor-pointer my-2"
        onClick={onKakaoLoginClick}
      />
    </div>
  );
};

export default Login;
