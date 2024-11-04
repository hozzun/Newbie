import karina from "../../../src/assets/images/karina.jpg";
import kakao from "../.././assets/images/auth/kakao_login_large_wide.png";

type LoginProps = {
  onKakaoLoginClick: () => void;
};

const Login = ({ onKakaoLoginClick }: LoginProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img src={karina} alt="Karina" className="mb-4 w-48 h-48 rounded-full object-cover" />
      <img
        src={kakao}
        alt="카카오 로그인 버튼"
        className="w-full max-w-xs cursor-pointer" // Tailwind CSS 클래스 사용
        onClick={onKakaoLoginClick} // 클릭 이벤트 핸들러
      />
    </div>
  );
};

export default Login;
