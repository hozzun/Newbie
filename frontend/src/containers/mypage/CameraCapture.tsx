import { useState } from 'react';
import Container from '../../components/common/Container';
import CameraCaptureComponent from '../../components/mypage/CameraCapture';
import ModalForm from './ModalForm';

const CameraCapture = () => {
  const [capturedImage, setCapturedImage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // TODO: 캡쳐된 사진 보내기, OCR 분석 결과 받아오기

  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Container>
        <CameraCaptureComponent onCapture={handleCapture} />
        <div>
          <ModalForm imgURL={capturedImage} isOpen={isModalOpen} />
        </div>
      </Container>
    </div>
  );
};

export default CameraCapture;
