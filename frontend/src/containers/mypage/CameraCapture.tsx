import axiosInstance from "../../util/axiosInstance";
import { useState } from "react";
import Container from "../../components/common/Container";
import CameraCaptureComponent from "../../components/mypage/CameraCapture";
import ModalForm from "./ModalForm";
import Dialog from "../../components/common/Dialog";
import { ButtonProps } from "../../components/common/Button";
import { BUTTON_VARIANTS } from "../../components/common/variants";
import { useNavigate } from "react-router-dom";

// base64 문자열을 Blob으로 변환하는 함수
const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteArrays = [];

  // 각 문자를 byte로 변환하여 byteArrays 배열에 추가
  for (let offset = 0; offset < byteCharacters.length; offset++) {
    byteArrays.push(byteCharacters.charCodeAt(offset));
  }

  // Blob으로 변환하여 반환
  return new Blob([new Uint8Array(byteArrays)], { type: mimeType });
};

// base64 문자열을 File 객체로 변환하는 함수
const base64ToFile = (base64: string, fileName: string): File => {
  const blob = base64ToBlob(base64, "image/png");
  return new File([blob], fileName, { type: "image/png" });
};

const CameraCapture = () => {
  const nav = useNavigate()
  const [capturedImage, setCapturedImage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [teamKorea, setTeamKorea] = useState<string[]>([]);
  const [ticketId, setTicketId] = useState<string>("");

  const yesButton: ButtonProps = {
    variant: BUTTON_VARIANTS.primary,
    children: "네",
    onClick: () => setIsDialogOpen(false),
  };

  const noButton: ButtonProps = {
    variant: BUTTON_VARIANTS.yellowGreen,
    children: "아니오",
    onClick: () => nav('/mypage')
  };

  const handleCapture = async (imageData: string) => {

    // TODO: userId 불러오기
    const userId = 5;
    const params = { userId: userId }
    const file = base64ToFile(imageData, "image.png");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosInstance.post("/api-mypage/ticket/naverOcr", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params,
      });
      setDate(response.data.date);
      setTeamKorea(response.data.teamKorean);
      setTicketId(response.data.ticketId);
      setCapturedImage(response.data.imageUrl)
      setIsModalOpen(true);
    } catch (error) {
      setIsDialogOpen(true)
      if (error) {
        console.error("서버 오류:", error);
      } else {
        console.error("요청 실패:", error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Container>
        <CameraCaptureComponent onCapture={handleCapture} />
        <div>
          {date ? (<ModalForm
            imgURL={capturedImage}
            isOpen={isModalOpen}
            onClose={closeModal}
            date={date}
            teamKorea={teamKorea}
            ticketId={ticketId}
          />) : (isDialogOpen && <Dialog title="인식 실패" body="다시 찍으시겠습니까?" yesButton={yesButton} noButton={noButton}/>)}
        </div>
      </Container>
    </div>
  );
};

export default CameraCapture;
