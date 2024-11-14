import { useState, useEffect } from 'react';
import axiosInstance from '../../util/axiosInstance';
import CommuFreeItem from "../../components/commu/CommuFreeItem";

interface Post {
  id: number;
  title: string;
  content: string;
  userName: string;
  createdAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

const MyBoard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  
  const getBoard = async () => {

    // TODO: userId 수정, 일반 게시글과 중고거래 게시글 설정
    const params = { userId: 5 }
  
    try {
      const response = await axiosInstance.get("/api-board/mypage/board", { params });
      setPosts(response.data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);


  return (
    <>
      {posts.map((post, index) => (
        <div key={post.id}>
          <CommuFreeItem
            title={post.title}
            contents={post.content}
            writer={post.userName}
            createTimeStamp={post.createdAt}
            viewCount={post.viewCount}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
          />
          {index < posts.length - 1 && <hr className="my-4 border-gray-200" />}
        </div>
      ))}
    </>
  );
};

export default MyBoard;
