import { useState, useEffect } from "react";
import axiosInstance from "../../util/axiosInstance";
import CommuFreeItem from "../../components/commu/CommuFreeItem";
import { useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  content: string;
  userName: string;
  createdAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  type?: "general" | "used";
}

const MyBoard = () => {
  const nav = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  const getBoard = async () => {

    try {
      const response = await axiosInstance.get("/api/v1/board/mypage/board");

      const allPosts = [
        ...response.data.generalBoards.map((post: Post) => ({ ...post, type: "general" })),
        ...response.data.usedBoards.map((post: Post) => ({ ...post, type: "used" })),
      ];

      // createdAt 기준으로 내림차순 정렬
      const sortedPosts = allPosts.sort(
        (a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setPosts(sortedPosts);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  const goPost = (post: Post) => {
    if (post.type === "general") {
      nav(`/commuhome/freedetail/${post.id}`);
    } else {
      nav(`/commuhome/tradedetail/${post.id}`);
    }
  };

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={post.id} onClick={() => goPost(post)}>
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
        <p className="font-kbogothicmedium flex justify-center items-center text-gray-600">
          아직 작성한 게시글이 없습니다.
        </p>
      )}
    </>
  );
};

export default MyBoard;
