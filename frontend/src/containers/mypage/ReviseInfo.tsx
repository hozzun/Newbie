import axiosInstance from '../../util/axiosInstance';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import ReviseBox from "../../components/mypage/ReviseBox";
import Button from "../../components/common/Button";
import { BUTTON_VARIANTS } from "../../components/common/variants";
import ImgAdd from "../../components/mypage/ImgAdd";

const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64);  // atob을 사용해 base64 문자열을 디코딩합니다.
  const byteNumbers = new Array(byteCharacters.length);
  
  // 각 문자를 byte로 변환하여 byteNumbers 배열에 추가
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  // Blob으로 변환하여 반환
  return new Blob([new Uint8Array(byteNumbers)], { type: mimeType });
};

const base64ToFile = (base64: string, fileName: string): File => {
  // base64 문자열에서 접두사 제거 (예: "data:image/png;base64," 제거)
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
  const blob = base64ToBlob(base64Data, "image/png");
  return new File([blob], fileName, { type: "image/png" });
};

const ReviseInfo = () => {

  const nav = useNavigate()

  const location = useLocation();
  const { userInfo } = location.state || {}
  const [name, setName] = useState<string>(userInfo.nickname);
  const [address, setAddress] = useState<{ si: string; gun: string }>({ si: '', gun: '' })
  const [disabled, setDisabled] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string>(userInfo.profileImage);

  useEffect(() => {
    const [si, ...gunParts] = userInfo.address.split(' ');
    setAddress({ si, gun: gunParts.join(' ') });
  }, [userInfo.address]);
  
  // 닉네임 변경 함수
  const handleNameChange = (newName: string) => {
    setName(newName);
  };

  // 시, 구 변경 함수
  const handleSelectionChange = (si: string, gun: string) => {
    setAddress({ si, gun });
  };

  const handleImageChange = (newImageUrl: string) => {
    setImageUrl(newImageUrl);
  };

  const patchReviseUser = async () => {
    const formData = new FormData();
    formData.append("nickname", name);
    const fullAddress = `${address.si} ${address.gun}`;
    formData.append("address", fullAddress);
  
    // imageUrl이 있는 경우에만 이미지 파일을 FormData에 추가
    if (imageUrl) {
      const base64Image = imageUrl.replace(/^data:image\/\w+;base64,/, "");
      const file = base64ToFile(base64Image, "profile.png");
      formData.append("profileImage", file);
    }
  
    try {
      const response = await axiosInstance.patch("/api-user/users/5", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      throw error;
    }
  };

  const reviseClick = () => {
    patchReviseUser()
    nav('/mypage')
  }

  useEffect(() => {
    // 초기값과 다른지 확인 및 추가 조건 확인
    const isNameChanged = name && name !== userInfo.nickname;
    const isAddressChanged = address.si && address.gun && (address.si !== userInfo.address.si || address.gun !== userInfo.address.gun);
    const isImageChanged = imageUrl && imageUrl !== userInfo.profileImage;

    // 닉네임과 주소 둘 중 하나라도 변경되었을 경우 버튼 활성화
    setDisabled(!(isNameChanged || isAddressChanged || isImageChanged));
  }, [name, address, imageUrl]);

  return (
    <>
      <ImgAdd imgUrl={userInfo.profileImage} onImageChange={handleImageChange} />
      <ReviseBox
        onNameChange={handleNameChange}
        onSelectionChange={handleSelectionChange}
        name={userInfo.nickname}
        placeholder1={address.si}
        placeholder2={address.gun}
      />
      <div className="flex justify-center items-center m-3">
        <Button
          className="w-[100%] mt-5"
          variant={BUTTON_VARIANTS.primary}
          children="저장하기"
          disabled={disabled}
          onClick={reviseClick}
        />
      </div>
    </>
  );
};

export default ReviseInfo;
