import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SignupComponent from "../../components/auth/Signup";
import { BUTTON_VARIANTS } from "../../components/common/variants";
import axiosInstance from "../../util/axiosInstance";

interface RootState {
  user: {
    email: string;
    platform: string;
  };
}

interface MemberData {
  nickname: string;
  email: string;
  address: string;
  platform: string;
  memberImage: {
    memberId: number;
    memberImage: string;
  };
  data?: string; // 토큰이 담길 수 있는 위치로 설정
}

const Signup = () => {
  const nav = useNavigate();
  const userInfo = useSelector((state: RootState) => state.user);
  const [buttonVariant, setButtonVariant] = useState<BUTTON_VARIANTS>(BUTTON_VARIANTS.second);
  const [formData, setFormData] = useState({
    name: "",
    si: "",
    gun: "",
  });

  const handleNameChange = (name: string) => {
    setFormData(prevData => ({ ...prevData, name }));
    updateButtonVariant(name, formData.si, formData.gun);
  };

  const handleSelectionChange = (si: string, gun: string) => {
    setFormData(prevData => ({ ...prevData, si, gun }));
    updateButtonVariant(formData.name, si, gun);
  };

  const updateButtonVariant = (name: string, si: string, gun: string) => {
    if (name && si && gun) {
      setButtonVariant(BUTTON_VARIANTS.primary);
    } else {
      setButtonVariant(BUTTON_VARIANTS.second);
    }
  };

  const handleButtonClick = async () => {
    if (buttonVariant === BUTTON_VARIANTS.primary) {
      try {
        const address = `${formData.si} ${formData.gun}`.trim();

        const memberData: Partial<MemberData> = {
          nickname: formData.name,
          email: userInfo.email, // Redux store에서 가져온 이메일
          address: address,
          platform: userInfo.platform, // Redux store에서 가져온 플랫폼
        };

        // 액세스 토큰을 Signup API에 보내서 memberData로 갈아끼우고 토큰 받기
        const response = await axiosInstance.post<MemberData>(
          "/api-auth/auth/members/signup",
          memberData,
        );

        // 액세스 토큰을 sessionStorage 저장
        const accessToken = response.data.data;
        if (accessToken) {
          sessionStorage.setItem("access_token", accessToken); // 토큰을 저장
          nav("/"); // 홈으로 이동
        } else {
          console.error("액세스 토큰이 응답에 없습니다.");
        }
      } catch (error) {
        console.error("회원가입 실패:", error);
      }
    }
  };

  return (
    <SignupComponent
      buttonVariant={buttonVariant}
      onNameChange={handleNameChange}
      onSelectionChange={handleSelectionChange}
      onButtonClick={handleButtonClick}
    />
  );
};

export default Signup;
