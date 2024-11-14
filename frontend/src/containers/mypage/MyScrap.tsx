import { useState, useEffect } from 'react';
import CommuFreeItem from "../../components/commu/CommuFreeItem";
import axiosInstance from '../../util/axiosInstance';

interface Post {
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
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      boardTitle: "기본 제목",
      content: "기본 내용",
      username: "김미량",
      imageUrl: "",
      createdAt: "2024.11.13",
      viewCount: 10,
      likeCount: 5,
      commentCount: 2
    }
  ]);

  const getScrap = async () => {
    
    const params = {
      userId: 5
    }

    try {
      const response = await axiosInstance.get("/api-board/scrap", { params });
      setPosts(response.data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    getScrap();
  }, []);

  return (
    <>
      {posts.map((post, index) => (
        <div key={post.id}>
          <CommuFreeItem
            title={post.boardTitle}
            contents={post.content}
            writer={post.username}
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
