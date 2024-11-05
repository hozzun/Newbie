import { useState } from "react";
import SignupComponent from "../../components/auth/Signup";
import { BUTTON_VARIANTS } from "../../components/common/variants";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const nav = useNavigate();
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

  const handleButtonClick = () => {
    if (buttonVariant === BUTTON_VARIANTS.primary) {
      // 모든 정보가 채워지고 버튼이 활성화된 상태에서만 실행되는 로직
      console.log("회원가입이 완료되었습니다!");
      nav("/");
    }
  };

  return (
    <SignupComponent
      buttonVariant={buttonVariant}
      onNameChange={handleNameChange}
      onSelectionChange={handleSelectionChange}
      onButtonClick={handleButtonClick}
      signUpPath="/login"
    />
  );
};

export default Signup;
