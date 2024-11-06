import { useRef, useEffect } from "react";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void; // 이미지 전달
}

const CameraCapture = ({ onCapture }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 카메라 시작
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (error) {
      console.error("카메라에 접근할 수 없습니다:", error);
    }
  };

  // 화면 로드 시 카메라 자동 시작
  useEffect(() => {
    startCamera();
  }, []);

  // 캡처 버튼 눌렀을 때 이미지 저장
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );
        const imageData = canvasRef.current.toDataURL("image/png");

        // 캡처한 이미지를 onCapture로 전달
        onCapture(imageData);
      }
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black">
      {/* 비디오 전체 화면 차지 */}
      <video ref={videoRef} className="absolute w-full h-full object-cover" autoPlay />

      {/* 캡처 버튼 */}
      <button
        onClick={captureImage}
        className="absolute bottom-10 bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg focus:outline-none"
      >
        <span className="w-12 h-12 bg-red-500 rounded-full"></span>
      </button>

      {/* 가이드라인 프레임 */}
      <div className="absolute top-5 left-30 text-white text-lg font-semibold">
        가이드라인을 따라 촬영해주세요!
      </div>
      <div
        className="absolute top-16 left-20 w-20 h-20 border-4 border-white pointer-events-none"
        style={{
          clipPath: "polygon(0% 0%, 50% 0%, 0% 50%)",
        }}
      />
      <div
        className="absolute bottom-32 right-20 w-10 h-10 border-4 border-white pointer-events-none"
        style={{
          clipPath: "polygon(100% 100%, 0% 100%, 100% 0%)",
        }}
      />

      {/* 숨겨진 캔버스, 이미지를 캡처할 때만 사용 */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraCapture;
