import { useState } from 'react';
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
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "기본 게시물 제목",
      contents: "이것은 기본 게시물의 내용입니다. 여기에 설명이 들어갑니다.",
      writer: "관리자",
      createTimeStamp: new Date().toLocaleDateString(),
      viewCount: 10,
      likeCount: 5,
      commentCount: 2,
    },
  ]);
  console.log(setPosts)

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
