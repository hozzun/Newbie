import { useState, useEffect } from "react";
import CommuFreeItem from "../../components/commu/CommuFreeItem";
import axiosInstance from "../../util/axiosInstance";
import { useNavigate } from "react-router-dom";

interface Scrap {
  id: number;
  boardId: number;
  boardTitle: string;
  boardType: string;
  content: string;
  username: string;
  imageUrl: string;
  createdAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

const MyScrap = () => {
  const nav = useNavigate();
  const [scraps, setScraps] = useState<Scrap[]>([]);

  const getScrap = async () => {

    try {
      const response = await axiosInstance.get("/api-board/scrap");
      setScraps(response.data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    getScrap();
  }, []);

  const goScrap = (scrap: Scrap) => {
    if (scrap.boardType === "general") {
      nav(`/commuhome/freedetail/${scrap.boardId}`);
    } else {
      nav(`/commuhome/tradedetail/${scrap.boardId}`);
    }
  };

  return (
    <>
      {scraps.length > 0 ? (
        scraps.map((scrap, index) => (
          <div key={scrap.id} onClick={() => goScrap(scrap)}>
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
        ))
      ) : (
        <p className="font-kbogothicmedium flex justify-center items-center text-gray-600">
          아직 스크랩한 게시물이 없습니다.
        </p>
      )}
    </>
  );
};

export default MyScrap;
