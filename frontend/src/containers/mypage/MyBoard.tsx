import { useState, useEffect } from 'react';
import axiosInstance from '../../util/axiosInstance';
import CommuFreeItem from "../../components/commu/CommuFreeItem";

interface Post {
  id: number;
  title: string;
  contents: string;
  writer: string;
  createTimeStamp: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

const MyBoard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  console.log(setPosts)
  
  
  const getScrap = async () => {
  
    try {
      const response = await axiosInstance.get("/api-board/scrap");
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
            title={post.title}
            contents={post.contents}
            writer={post.writer}
            createTimeStamp={post.createTimeStamp}
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
