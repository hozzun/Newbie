import axios from 'axios';
import { useState } from 'react';
import Container from '../../components/common/Container';
import CameraCaptureComponent from '../../components/mypage/CameraCapture';
import ModalForm from './ModalForm';

// base64 문자열을 Blob으로 변환하는 함수
const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64.split(',')[1]);
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
  const blob = base64ToBlob(base64, 'image/png');
  return new File([blob], fileName, { type: 'image/png' });
};

const CameraCapture = () => {
  const [capturedImage, setCapturedImage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [ocrResult, setOcrResult] = useState<string>('');

  // TODO: 캡쳐된 사진 보내기, OCR 분석 결과 받아오기

  const handleCapture = async (imageData: string) => {
    setCapturedImage(imageData);
    setIsModalOpen(true);
  
    const api_url = import.meta.env.VITE_TICKET_OCR

    const userId = "1016";
    const file = base64ToFile(imageData, 'image.png')

    console.log(file)

    // FormData 객체 생성
    const formData = new FormData();
    formData.append('userId', userId)
    formData.append('image', file);
  
    try {
      const response = await axios.post(api_url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('OCR 처리 결과:', response.data);
      setOcrResult(response.data)
      return response.data;
    } catch (error) {
      if (error) {
        console.error('서버 오류:', error);
      } else {
        console.error('요청 실패:', error);
      }
    }
  };
  

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <Container>
        <CameraCaptureComponent onCapture={handleCapture} />
        <div>
          <ModalForm imgURL={capturedImage} isOpen={isModalOpen} onClose={closeModal} ocrResult={ocrResult} />
        </div>
      </Container>
    </div>
  );
};

export default CameraCapture;
