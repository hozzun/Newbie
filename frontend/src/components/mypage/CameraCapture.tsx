import { useEffect, useState, useRef } from "react";

// ImageCapture 타입을 명시적으로 정의
interface ImageCapture {
  takePhoto(): Promise<Blob>;
}

declare global {
  interface Window {
    ImageCapture: {
      prototype: ImageCapture;
      new(videoTrack: MediaStreamTrack): ImageCapture;
    };
  }
}

interface CameraCaptureProps {
  onCapture: (imageData: string) => void; // 캡처된 이미지 데이터 전달
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

      // 카메라 화면을 실시간으로 보여줌
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // 첫 번째 비디오 트랙
      const track = stream.getVideoTracks()[0];

      // ImageCapture 객체 생성
      if (window.ImageCapture) {
        const imageCaptureObj = new window.ImageCapture(track);
        setImageCapture(imageCaptureObj);
      } else {
        console.error("ImageCapture API가 지원되지 않는 브라우저입니다.");
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
      {/* 카메라 화면을 비디오로 보여줍니다. */}
      <video
        ref={videoRef}
        className="absolute w-full h-full object-cover"
        autoPlay
        playsInline
        muted
      />

      {/* 캡처 버튼 */}
      <button
        onClick={captureImage}
        onTouchStart={captureImage}  // 모바일에서 터치 이벤트를 처리하도록 추가
        className="absolute bottom-10 bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg focus:outline-none z-10"
      >
        <span className="w-12 h-12 bg-red-500 rounded-full"></span>
      </button>
    </div>
  );
};

export default CameraCapture;
