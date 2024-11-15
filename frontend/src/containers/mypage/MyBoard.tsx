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
    const params = { userId: 5 };

    try {
      const response = await axiosInstance.get("/api-board/mypage/board", { params });

      const allPosts = [
        ...response.data.generalBoards, 
        ...response.data.usedBoards
      ];

      // createdAt 기준으로 내림차순 정렬
      const sortedPosts = allPosts.sort((a: Post, b: Post) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setPosts(sortedPosts);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          // TODO: Navigate 설정
          <div key={post.id} onClick={() => console.log("해당 게시글 페이지로 이동")}>
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
        ))
      ) : (
        <p className='font-kbogothicmedium flex justify-center items-center text-gray-600'>아직 작성한 게시글이 없습니다.</p>
      )}
    </>
  );
};

export default MyBoard;
