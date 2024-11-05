import { useState } from 'react';
import Container from '../../components/common/Container';
import CameraCaptureContainer from '../../containers/mypage/CameraCapture'

const CameraCapture = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  //TODO: 캡쳐 이미지 전송 후 응답 반환

  // 캡처된 이미지 처리
  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData);
  };

  return (
    <div>
      <Container>
        <CameraCaptureContainer onCapture={handleCapture} />
        {capturedImage && (
          <div>
            <img src={capturedImage} alt="Captured" />
          </div>
        )}
      </Container>
    </div>
  );
};

export default CameraCapture;
