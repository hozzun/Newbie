import axiosInstance from '../../util/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import ReviseBox from "../../components/mypage/ReviseBox";
import Button from "../../components/common/Button";
import { BUTTON_VARIANTS } from "../../components/common/variants";
import ImgAdd from "../../components/mypage/ImgAdd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from 'react-redux';
import { fetchMyInfo } from '../../redux/myInfoSlice';
import { AppDispatch } from "../../redux/store";
import Dialog from '../../components/common/Dialog';

const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64);  // atob을 사용해 base64 문자열 디코딩
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
  const dispatch = useDispatch<AppDispatch>()

  const { nickname, address, profileImage } = useSelector((state: RootState) => state.myInfo)
  const [name, setName] = useState<string>(nickname);
  const [newAddress, setAddress] = useState<{ si: string; gun: string }>({ si: '', gun: '' })
  const [disabled, setDisabled] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string>(`${profileImage}?cacheBust=${Date.now()}`);
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    const [si, ...gunParts] = address.split(' ');
    setAddress({ si, gun: gunParts.join(' ') });
  }, [address]);
  
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
    const fullAddress = `${newAddress.si} ${newAddress.gun}`;
    formData.append("address", fullAddress);
  
  // imageUrl이 Base64 형식인지 확인
  if (imageUrl !== profileImage && imageUrl.startsWith("data:image/")) {
    const base64Image = imageUrl.replace(/^data:image\/\w+;base64,/, "");
    const fileName = `image_${Date.now()}.png`;
    const file = base64ToFile(base64Image, fileName);
    formData.append("profileImage", file);
  } else if (imageUrl !== profileImage) {
    console.warn("imageUrl is not a Base64 encoded string:", imageUrl);
  }
  
    try {
      const response = await axiosInstance.patch("/api/v1/user/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      dispatch(fetchMyInfo());
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      throw error;
    }
  };

  const reviseClick = () => {
    patchReviseUser()
    setShow(true)
    setTimeout(() => {
      setShow(false)
      nav('/mypage', { state: { imageUrl }})
    }, 3000)
  }

  useEffect(() => {
    // 초기값과 다른지 확인 및 추가 조건 확인
    const isNameChanged = name && name !== nickname;
    const isAddressChanged = newAddress.si && newAddress.gun && (newAddress.si !== newAddress.si || newAddress.gun !== newAddress.gun);
    const isImageChanged = imageUrl && imageUrl !== profileImage;

    // 닉네임과 주소 둘 중 하나라도 변경되었을 경우 버튼 활성화
    setDisabled(!(isNameChanged || isAddressChanged || isImageChanged));
  }, [name, newAddress, imageUrl]);

  return (
    <>
      <ImgAdd imgUrl={profileImage} onImageChange={handleImageChange} />
      <ReviseBox
        onNameChange={handleNameChange}
        onSelectionChange={handleSelectionChange}
        name={nickname}
        placeholder1={newAddress.si}
        placeholder2={newAddress.gun}
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
      {show && <Dialog title='프로필 수정' body="프로필 수정 중입니다! 잠시만 기다려주세요😊" />}
    </>
  );
};

export default ReviseInfo;
