import { useState, useEffect } from 'react';
import CommuFreeItem from "../../components/commu/CommuFreeItem";
import axiosInstance from '../../util/axiosInstance';

interface Scrap {
  id: number;
  boardTitle: string;
  content: string;
  username: string;
  imageUrl: string;
  createdAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

const MyBoard = () => {
  const [scraps, setScraps] = useState<Scrap[]>([]);

  const getScrap = async () => {
    
    const params = {
      userId: 5
    }

    try {
      const response = await axiosInstance.get("/api-board/scrap", { params });
      setScraps(response.data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    getScrap();
  }, []);

  return (
    <>
      {scraps.map((scrap, index) => (
        // TODO: Navigate 설정
        <div key={scrap.id} onClick={() => console.log("해당 스크랩 페이지로 이동")}>
          <CommuFreeItem
            title={scrap.boardTitle}
            contents={scrap.content}
            writer={scrap.username}
            createTimeStamp={scrap.createdAt}
            viewCount={scrap.viewCount}
            likeCount={scrap.likeCount}
            commentCount={scrap.commentCount}
          />
          {index < scraps.length - 1 && <hr className="my-4 border-gray-200" />}
        </div>
      ))}
    </>
  );
};

export default MyBoard;
