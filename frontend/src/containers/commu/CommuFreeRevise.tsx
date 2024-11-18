import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import CommuFreeReviseComponent from "../../components/commu/CommuFreeRevise";
import { BUTTON_VARIANTS } from "../../components/common/variants";
import axiosInstance from "../../util/axiosInstance";
import { useLocation } from 'react-router-dom';

const CommuFreeRevise = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { id, title, imageUrl, content, tags } = location.state || {};

  const [titleValue, setTitleValue] = useState(title);
  const [tagValue, setTagValue] = useState("");
  const [Tags, setTags] = useState<string[]>(tags);
  const [text, setText] = useState(content);
  const [buttonVariant, setButtonVariant] = useState(BUTTON_VARIANTS.second);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clearTitle = () => setTitleValue("");
  const clearTag = () => setTagValue("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagValue(e.target.value);
  };

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
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

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= 1000) {
      setText(inputText);
    }
  };

  // 모든 필드가 채워졌는지 확인
  useEffect(() => {
    if (titleValue !== null && text) {
      setButtonVariant(BUTTON_VARIANTS.primary);
    } else {
      setButtonVariant(BUTTON_VARIANTS.second);
    }
  }, [titleValue, text]);

  // api 호출 및 데이터 제출
  const handleSubmit = async () => {

    const reviseBody = {
      title: titleValue,
      content: text,
      tags: tags
    };

    try {
      const response = await axiosInstance.put(`/api/v1/board/general-board/${id}`, reviseBody);
      nav(`/commuhome/freedetail/${id}`)
      return response.data
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };
  

  return (
    <div>
      <CommuFreeReviseComponent
        titleValue={titleValue}
        tagValue={tagValue}
        tags={Tags}
        text={text}
        image={imageUrl}
        errorMessage={errorMessage}
        onTitleChange={handleTitleChange}
        onTagChange={handleTagChange}
        onTagKeyPress={handleTagKeyPress}
        onTagRemove={handleTagRemove}
        onTextChange={handleTextChange}
        onClearTitle={clearTitle}
        onClearTag={clearTag}
      />

      <Button variant={buttonVariant} className="w-full" onClick={handleSubmit}>
        완료
      </Button>
    </div>
  );
};

export default CommuFreeRevise;
