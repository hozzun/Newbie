import { useState, useEffect } from 'react';
import axiosInstance from '../../util/axiosInstance';
import MyActiveLike from "../../components/mypage/MyActiveLike";
import MyActiveComment from "../../components/mypage/MyActiveComment";

interface LikeData {
  boardId: number;
  createdAt: string;
  title: string;
  onClick: () => void; // TODO: 클릭하면 삭제하는 API 연결
}

interface CommentData {
  boardId: number;
  content: string;
  createdAt: string;
  onClick: () => void;
}

const MyActive = () => {
  const [likes, setLikes] = useState<LikeData[]>([]);
  const [comments, setComments] = useState<CommentData[]>([]);

  const getActivity = async () => {

    // TODO: userId 수정
    const userId = 5
    const params = { userId: userId }
  
    try {
      const response = await axiosInstance.get(`/api-board/user-activity/${userId}`, { params });
      if (response.data.type === 'like') {
        setLikes(response.data)
      } else if (response.data.type === 'comment') {
        setComments(response.data)
      }
      
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };
  
    useEffect(() => {
      getActivity();
    }, []);

  return (
    <>
      <div onClick={() => console.log("클릭")}>
        {likes.map((like) => (
          <MyActiveLike
            key={like.boardId}
            time={like.createdAt}
            title={like.title}
            onClick={like.onClick}
          />
        ))}
      </div>
      <div onClick={() => console.log("클릭")}>
        {comments.map((comment) => (
          <MyActiveComment
            key={comment.boardId}
            time={comment.createdAt}
            comment={comment.content}
            onClick={comment.onClick}
          />
        ))}
      </div>
    </>
  );
};

export default MyActive;
