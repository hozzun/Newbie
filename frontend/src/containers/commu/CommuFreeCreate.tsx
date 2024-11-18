import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import CommuFreeCreateComponent from "../../components/commu/CommuFreeCreate";
import { BUTTON_VARIANTS } from "../../components/common/variants";
import { postGeneralBoard } from "../../api/boardApi";

const CommuFreeCreate = () => {
  const nav = useNavigate();

  const [titleValue, setTitleValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [buttonVariant, setButtonVariant] = useState(BUTTON_VARIANTS.second);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clearTitle = () => setTitleValue("");
  const clearTag = () => setTagValue("");
  const clearImage = () => setImage(null); // 이미지 초기화

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]); // 첫 번째 파일만 선택
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

    if (titleValue && text) {
      try {
        const formData = new FormData();
        formData.append(
          "generalBoardDto",
          JSON.stringify({
            userId: 5, // 실제로는 로그인된 사용자 ID를 사용
            userName: "김진우", // 실제로는 로그인된 사용자 이름을 사용
            title: titleValue,
            content: text,
            tags: tags,
          }),
        );

        if (image) {
          formData.append("imageFile", image);
          console.log(formData.get("imageFile"));
          console.log(formData.get("generalBoardDto"));
        }

        const response = await postGeneralBoard(formData);
        console.log(response);
        if (response.data) {
          nav(`/commuhome/freedetail/${response.data.id}`);
        }
      } catch (error) {
        setErrorMessage("게시글 작성에 실패했어요");
        console.error(error);
      }
    }
  };

  return (
    <div>
      <CommuFreeCreateComponent
        titleValue={titleValue}
        tagValue={tagValue}
        tags={tags}
        text={text}
        image={image}
        errorMessage={errorMessage}
        onTitleChange={handleTitleChange}
        onTagChange={handleTagChange}
        onTagKeyPress={handleTagKeyPress}
        onTagRemove={handleTagRemove}
        onTextChange={handleTextChange}
        onImageChange={handleImageChange}
        onClearTitle={clearTitle}
        onClearTag={clearTag}
        onClearImage={clearImage}
      />

      <Button variant={buttonVariant} className="w-full" onClick={handleSubmit}>
        완료
      </Button>
    </div>
  );
};

export default CommuFreeCreate;
