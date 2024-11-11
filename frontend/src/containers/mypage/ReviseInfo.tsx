import axiosInstance from '../../util/axiosInstance';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import ReviseBox from "../../components/mypage/ReviseBox";
import Button from "../../components/common/Button";
import { BUTTON_VARIANTS } from "../../components/common/variants";
import ImgAdd from "../../components/mypage/ImgAdd";
import profile from "../../assets/images/karina.jpg"

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

    const params = {
      nickname: name,
      address: address,
      profileImg: imageUrl,
    };

    try {
      // TODO: userId 바꾸기
      const response = await axiosInstance.patch("/api-user/users/5", { params }
      );
      console.log(response.data)
      console.log(params)
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
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
      <ImgAdd imgUrl={profile} onImageChange={handleImageChange} />
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
