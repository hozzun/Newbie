import { useState } from 'react';
import MyActiveLike from "../../components/mypage/MyActiveLike";
import MyActiveComment from "../../components/mypage/MyActiveComment";

interface LikeData {
  time: string;
  title: string;
  onClick: () => void;
}

interface CommentData {
  comment: string;
  time: string;
  onClick: () => void;
}

const MyActive = () => {
  const [likes, setLikes] = useState<LikeData[]>([
    {
      title: "기본 게시물 제목",
      time: new Date().toLocaleDateString(),
      onClick: () => console.log('삭제')
    },
  ]);
  const [comments, setComments] = useState<CommentData[]>([
    {
      comment: "기본 댓글",
      time: new Date().toLocaleDateString(),
      onClick: () => console.log('삭제')
    },
  ]);
  
  console.log(setLikes);
  console.log(setComments);

  return (
    <>
      {likes.map((like, index) => (
        <MyActiveLike
          key={index}
          time={like.time}
          title={like.title}
          onClick={like.onClick}
        />
      ))}
      {comments.map((comment, index) => (
        <MyActiveComment
          key={index}
          time={comment.time}
          comment={comment.comment}
          onClick={comment.onClick}
        />
      ))}
    </>
  );
};

export default MyActive;
