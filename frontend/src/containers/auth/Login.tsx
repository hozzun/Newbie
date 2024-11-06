import { useState } from "react";
import LoginComponent from "../../components/auth/Login";
import { KAKAO_AUTH_URL, GOOGLE_AUTH_URL } from "../../api/Oauth";
import AuthorityBottomSheet from "../../components/common/AuthorityBottomSheet";

const Login = () => {
  const [showBottomSheet, setShowBottomSheet] = useState(true);

  const handleKakaoLoginClick = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleGoogleLoginClick = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  const handleBottomSheetClose = () => {
    setShowBottomSheet(false); // 시트를 닫음
  };

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("알림 권한이 허용되었습니다.");
        setShowBottomSheet(false);
      } else {
        console.log("알림 권한이 거부되었습니다.");
      }
    } else {
      console.log("이 브라우저는 알림 기능을 지원하지 않습니다.");
    }
  };

  return (
    <>
      <div>
        <LoginComponent
          onKakaoLoginClick={handleKakaoLoginClick}
          onGoogleLoginClick={handleGoogleLoginClick}
          signUpPath="/signup"
        />

        {showBottomSheet && (
          <AuthorityBottomSheet
            onClose={handleBottomSheetClose}
            requestPermission={requestNotificationPermission}
          />
        )}
      </div>
    </>
  );
};

export default Login;
