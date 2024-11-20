import { useState } from "react";

interface ImgAddProps {
  imgUrl: string; // 부모에서 초기 이미지 URL을 받을 props
  onImageChange: (newImageUrl: string) => void; // 이미지 변경 시 부모 컴포넌트로 알릴 함수
}

const ImgAdd = (props: ImgAddProps) => {
  const [image, setImage] = useState<string>(props.imgUrl);

  // 이미지 선택 함수
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImageUrl = reader.result as string;
        setImage(newImageUrl);
        props.onImageChange(newImageUrl); // 부모 컴포넌트로 이미지 변경 알리기
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload" className="cursor-pointer">
        <div className="w-32 h-32 bg-gray-200 flex justify-center items-center rounded-full">
          {image ? (
            <img src={image} alt="Uploaded preview" className="w-full h-full object-cover rounded-full" />
          ) : (
            <span className="text-gray-500">이미지 업로드</span>
          )}
        </div>
      </label>
    </div>
  );
};

export default ImgAdd;
