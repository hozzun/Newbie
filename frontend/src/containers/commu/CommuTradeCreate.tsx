import { useState, useEffect } from "react";
import Button from "../../components/common/Button";
import CommuTradeCreateComponent from "../../components/commu/CommuTradeCreate";
import { BUTTON_VARIANTS } from "../../components/common/variants";

const CommuTradeCreate = () => {
  const [titleValue, setTitleValue] = useState("");
  const [priceValue, setPriceValue] = useState<number | null>(null); // 초기값을 null로 설정
  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [buttonVariant, setButtonVariant] = useState(BUTTON_VARIANTS.second);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clearTitle = () => setTitleValue("");
  const clearPrice = () => setPriceValue(null); // 초기화 시 null로 설정
  const clearTag = () => setTagValue("");

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

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // 태그 개수 및 글자수 제한 확인
      if (tags.length >= 5) {
        setErrorMessage("최대 5개의 태그만 추가할 수 있습니다.");
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
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= 1000) {
      setText(inputText);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages(prevImages => [...prevImages, ...newImages]);
    }
  };

  // 모든 필드가 채워졌는지 확인
  useEffect(() => {
    if (titleValue && priceValue !== null && text) {
      setButtonVariant(BUTTON_VARIANTS.primary);
    } else {
      setButtonVariant(BUTTON_VARIANTS.second);
    }
  }, [titleValue, priceValue, text]);

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
        onTitleChange={handleTitleChange}
        onPriceChange={handlePriceChange}
        onTagChange={handleTagChange}
        onTagKeyPress={handleTagKeyPress}
        onTextChange={handleTextChange}
        onImageChange={handleImageChange}
        onClearTitle={clearTitle}
        onClearPrice={clearPrice}
        onClearTag={clearTag}
      />

      <Button variant={buttonVariant} className="w-full">
        완료
      </Button>
    </div>
  );
};

export default CommuTradeCreate;
