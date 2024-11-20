import { useState, useEffect } from "react";
import AuthorityBottomSheetItem, { Authority } from "./AuthorityBottomSheetItem";
import Button from "./Button";
import { BUTTON_VARIANTS } from "./variants";
import BellSolid from "../../assets/icons/bell-solid.svg?react";
import PictureSolid from "../../assets/icons/picture-solid.svg?react";
import TextButton from "./TextButton";

interface AuthorityBottomSheetProps {
  onClose: () => void;
  requestPermission: () => void;
}

const authorities: Array<Authority> = [
  {
    img: BellSolid,
    imgColor: "text-warning",
    title: "알림 (선택)",
    body: "나의 구단 경기 정보를 받거나, 새로운 채팅 메세지에 대한 알림을 받아요.",
  },
  {
    img: PictureSolid,
    imgColor: "text-success-200",
    title: "사진/미디어/파일 (선택)",
    body: "게시판 및 중고거래에서 사진을 첨부해요.",
  },
];

const AuthorityBottomSheet = ({ onClose, requestPermission }: AuthorityBottomSheetProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 5);
    return () => clearTimeout(timer);
  }, []);

  const authorityBottomSheetClass = `fixed bottom-0 left-0 right-0 transform transition-transform duration-500 bg-white rounded-t-lg p-6 z-20 ${
    isVisible ? "translate-y-0" : "translate-y-full"
  }`;

  return (
    <>
      <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-10" onClick={onClose}></div>
      <div className={authorityBottomSheetClass}>
        <p className="text-base font-kbogothicmedium text-gray-700">
          NEWBIE를 시작하려면 권한이 필요해요
        </p>
        <div className="flex flex-col mt-8">
          {authorities.map((authority, index) => (
            <AuthorityBottomSheetItem key={index} authority={authority} />
          ))}
        </div>
        <div className="flex flex-col items-center mt-8">
          <Button className="w-full" variant={BUTTON_VARIANTS.primary} onClick={requestPermission}>
            계속하기
          </Button>
          <TextButton className="mt-3 underline" onClick={onClose}>
            나중에 받을게요
          </TextButton>
        </div>
      </div>
    </>
  );
};

export default AuthorityBottomSheet;
