import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import CommuTradeCreateComponent from "../../components/commu/CommuTradeCreate";
import { BUTTON_VARIANTS } from "../../components/common/variants";
import { createUsedBoard } from "../../api/boardApi";

const CommuTradeCreate = () => {
  const navigate = useNavigate();
  const [titleValue, setTitleValue] = useState("");
  const [priceValue, setPriceValue] = useState<number | null>(null);
  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [buttonVariant, setButtonVariant] = useState(BUTTON_VARIANTS.second);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [region, setRegion] = useState("");

  const clearTitle = () => setTitleValue("");
  const clearPrice = () => setPriceValue(null); // 초기화 시 null로 설정
  const clearTag = () => setTagValue("");
  const clearRegion = () => setRegion("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPriceValue(value ? parseFloat(value) : null); // 입력 값이 없으면 null로 설정
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagValue(e.target.value);
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(e.target.value);
  };

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // 태그 개수 및 글자수 제한 확인
      if (tags.length >= 5) {
        setErrorMessage("최대 5개의 태그만 추가할 수 있습니다.");
        return;
      }
      if (tags.includes(tagValue.trim())) {
        setErrorMessage("이미 추가된 태그입니다.");
        return;
      }
      if (tagValue.trim().length > 5) {
        setErrorMessage("태그는 최대 5글자까지 입력 가능합니다.");
        return;
      }
      if (tagValue.trim()) {
        setTags(prevTags => [...prevTags, tagValue.trim()]);
        setTagValue("");
      }
    }
  };
  const handleTagRemove = (tagToRemove: string) => {
    setTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
  };
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      if (images.length + newImages.length > 5) {
        setErrorMessage("이미지는 최대 5개까지 추가할 수 있습니다.");
        return;
      }
      setImages(prevImages => [...prevImages, ...newImages]);
    }
  };

  const handleImageRemove = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= 1000) {
      setText(inputText);
    }
  };

  // 모든 필드가 채워졌는지 확인
  useEffect(() => {
    if (titleValue && priceValue !== null && text && region) {
      setButtonVariant(BUTTON_VARIANTS.primary);
    } else {
      setButtonVariant(BUTTON_VARIANTS.second);
    }
  }, [titleValue, priceValue, text, region]);

  const base64ToBlob = (base64: string, mimeType: string): Blob => {
    const byteCharacters = atob(base64.replace(/^data:image\/\w+;base64,/, ""));
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    return new Blob([new Uint8Array(byteNumbers)], { type: mimeType });
  };

  const base64ToFile = (base64: string, fileName: string): File => {
    const blob = base64ToBlob(base64, "image/png");
    return new File([blob], fileName, { type: "image/png" });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // 게시글 정보를 JSON으로 변환하여 추가
      const boardData = {
        userId: 0, // 실제 사용자 ID로 교체 필요
        title: titleValue,
        content: text,
        tags: tags,
        price: priceValue || 0,
        region: region || "기본 지역",
      };

      formData.append(
        "usedBoardDto",
        new Blob([JSON.stringify(boardData)], {
          type: "application/json",
        }),
      );

      // 이미지 처리
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const image = images[i];

          // 이미지를 base64로 변환
          const reader = new FileReader();
          const imageBase64 = await new Promise<string>(resolve => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(image);
          });

          // base64를 File 객체로 변환
          const imageFile = base64ToFile(imageBase64, `image${i + 1}.png`);
          formData.append("imageFile", imageFile);
        }
      }

      // API 호출
      await createUsedBoard(formData);
      navigate("/commuhome");
    } catch (error) {
      setErrorMessage("게시글 작성에 실패했습니다.");
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div>
      <CommuTradeCreateComponent
        titleValue={titleValue}
        priceValue={priceValue}
        tagValue={tagValue}
        tags={tags}
        text={text}
        images={images}
        errorMessage={errorMessage}
        region={region}
        onRegionChange={handleRegionChange}
        onTitleChange={handleTitleChange}
        onPriceChange={handlePriceChange}
        onTagChange={handleTagChange}
        onTagKeyPress={handleTagKeyPress}
        onTagRemove={handleTagRemove}
        onTextChange={handleTextChange}
        onImageChange={handleImageChange}
        onImageRemove={handleImageRemove}
        onClearTitle={clearTitle}
        onClearPrice={clearPrice}
        onClearTag={clearTag}
        onClearRegion={clearRegion}
      />

      <Button
        variant={buttonVariant}
        className="w-full"
        onClick={handleSubmit}
        disabled={buttonVariant === BUTTON_VARIANTS.second}
      >
        완료
      </Button>
    </div>
  );
};

export default CommuTradeCreate;
