import { useState } from 'react' 
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
  ocrResult: string;
}

const ModalForm = (props: ModalFormProps) => {
  if (!props.isOpen) return null;

  const [memoText, setMemoText] = useState<string>("");

  const handleMemoChange = (newText: string) => {
    setMemoText(newText);
  };

  console.log(props.ocrResult); // 일단 그냥 써둠

  const TextSaveAPI = async () => {

    const api_url = import.meta.env.VITE_TICKET_TEXT

    const TextData = {
      id: "672b18692d22ab456ed56763",
      text: memoText
    };

    try {
      const response = await fetch(api_url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(TextData), // JSON 형태로 데이터 변환
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };

  const onSaveClick = () => {
    console.log("저장하기 버튼 클릭");
    TextSaveAPI();
  };

  const onReClick = () => {
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
          <ModalInput onMemoChange={handleMemoChange} />
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
