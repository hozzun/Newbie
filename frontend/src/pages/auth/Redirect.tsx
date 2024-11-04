import { useEffect } from "react";

const Redirect = () => {
  useEffect(() => {
    const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    console.log("Redirect URI:", redirectUri);

    // 인증 코드 처리 로직 추가 가능
  }, []);

  return <div>Redirecting...</div>;
};

export default Redirect;
