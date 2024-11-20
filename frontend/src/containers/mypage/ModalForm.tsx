import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../util/axiosInstance";
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
  date: string;
  teamKorea: Array<string>;
  ticketId: string;
}

const ModalForm = (props: ModalFormProps) => {

  const nav = useNavigate();
  const [memo, setMemo] = useState<string>("");

  if (!props.isOpen) return null; // 모달이 열리지 않으면 반환

  // 메모 변경 핸들러
  const handleMemoChange = (newMemo: string) => {
    setMemo(newMemo);
  };

  // 메모 저장 API 호출
  const TextSaveAPI = async () => {
    const TextData = {
      id: props.ticketId,
      text: memo,
    };

    try {
      const response = await axiosInstance.put("/api/v1/mypage/ticket/text", TextData);
      return response.data;
    } catch (error) {
      console.error("Error sending data to API:", error);
      throw error;
    }
  };

  // 저장 버튼 클릭 시 처리
  const onSaveClick = async () => {
    try {
      await TextSaveAPI();
      nav("/mypage");
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  // 다시 찍기 버튼 클릭 시 모달 닫기
  const onReClick = () => {
    props.onClose();
  };

  return (
    <Container>
      <div
        className="fixed bottom-0 left-0 right-0 flex flex-col items-center bg-gray-100 w-full h-full shadow-lg"
        style={{ zIndex: 50 }} // 다른 요소 위로 모달을 띄우기 위해 zIndex 설정
      >
        <ModalFormComponent
          date={props.date}
          team1={props.teamKorea[0]}
          team2={props.teamKorea[1]}
        />
        <ModalImage imageUrl={props.imgURL} />
        <ModalInput memo={memo} onChange={handleMemoChange} />
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
  );
};

export default ModalForm;
