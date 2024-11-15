// ImageCapture 타입을 명시적으로 정의
interface ImageCapture {
  takePhoto(): Promise<Blob>;
}

declare const ImageCapture: {
  prototype: ImageCapture;
  new(videoTrack: MediaStreamTrack): ImageCapture;
};

import { useRef, useEffect, useState } from "react";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
}

const CameraCapture = ({ onCapture }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [imageCapture, setImageCapture] = useState<ImageCapture | null>(null);

  // 카메라 시작
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1080 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        const track = stream.getVideoTracks()[0];

        // ImageCapture 객체 생성
        setImageCapture(new ImageCapture(track));
      }
    } catch (error) {
      console.error("카메라에 접근할 수 없습니다:", error);
    }
  };

  useEffect(() => {
    startCamera();
  }, []);

  // 캡처 버튼 눌렀을 때 이미지 저장
  const captureImage = async () => {
    if (imageCapture) {
      try {
        const blob = await imageCapture.takePhoto();
        const imageData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        onCapture(imageData);
      } catch (error) {
        console.error("사진 캡처에 실패했습니다:", error);
      }
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black">
      {/* 비디오 프리뷰 화면 */}
      <video ref={videoRef} className="absolute w-full h-full object-cover" autoPlay playsInline muted />

      {/* 캡처 버튼 */}
      <button
        onClick={captureImage}
        className="absolute bottom-10 bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg focus:outline-none"
      >
        <span className="w-12 h-12 bg-red-500 rounded-full"></span>
      </button>
    </div>
  );
};

export default CameraCapture;
