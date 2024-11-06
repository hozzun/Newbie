import ModalFormComponent from "../../components/mypage/ModalForm";
import ModalImage from "../../components/mypage/ModalImage";
import ModalInput from "../../components/mypage/ModalInput";
import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import { BUTTON_VARIANTS } from "../../components/common/variants";

interface ModalFormProps {
  imgURL: string;
  isOpen: boolean;
  onClose: () => void; // 모달 닫기 함수
}

const ModalForm = (props: ModalFormProps) => {
  if (!props.isOpen) return null;

  const onSaveClick = () => {
    console.log("저장하기 버튼 클릭");
  };

  const onReClick = () => {
    console.log("다시 찍기 버튼 클릭");
    props.onClose();
  };

  return (
    <>
    <Container>
      <div
        className="fixed bottom-0 left-0 right-0 flex flex-col items-center bg-gray-100 w-full h-full shadow-lg"
        style={{ zIndex: 50 }}
      >
          <ModalFormComponent date="2024.08.03" team1="키움 히어로즈" team2="두산 베어스" />
          <ModalImage imageUrl={props.imgURL} />
          <ModalInput />
          <div className="flex flex-row mb-10">
            <Button
              className="w-1/2 mr-4 flex justify-center"
              variant={BUTTON_VARIANTS.primary}
              children="저장하기"
              onClick={onSaveClick}
            />
            <Button
              className="w-1/2 flex justify-center"
              variant={BUTTON_VARIANTS.second}
              children="다시찍기"
              onClick={onReClick}
            />
          </div>
    </div>
    </Container>
    </>
  );
};

export default ModalForm;
