import { useEffect, useRef } from "react";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void; // 캡처된 이미지 데이터 전달
}

const CameraCapture = ({ onCapture }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // 캔버스 참조

  // 카메라 시작
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } }
      });

      // 카메라 화면을 실시간으로 보여줍니다.
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
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
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        // 비디오에서 현재 프레임을 캡처하여 canvas에 그리기
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // 캡처한 이미지를 base64로 변환
        const imageData = canvas.toDataURL("image/png");
        onCapture(imageData); // 캡처된 이미지 데이터를 상위 컴포넌트로 전달
      }
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black">
      {/* 비디오 프리뷰 화면 */}
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
        onTouchStart={captureImage}
        className="absolute bottom-10 bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg focus:outline-none z-10"
      >
        <span className="w-12 h-12 bg-red-500 rounded-full"></span>
      </button>

      {/* 숨겨진 캔버스 */}
      <canvas ref={canvasRef} className="hidden max-w-[600px] min-w-[320px]"/>
    </div>
  );
};

export default CameraCapture;
