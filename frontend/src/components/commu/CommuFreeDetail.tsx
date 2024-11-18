import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Like from "../../assets/icons/heart-solid.svg?react";
import Comment from "../../assets/icons/comment-solid.svg?react";
import View from "../../assets/icons/eye-solid.svg?react";
import Scrap from "../../assets/icons/bookmark-solid.svg?react";
import Siren from "../../assets/icons/exclamation-solid.svg?react";
import { getGeneralBoardDetail, GetGeneralBoardResponse } from "../../api/boardApi";
import { getGeneralComment, GetGeneralComment } from "../../api/boardApi";
import axiosInstance from "../../util/axiosInstance";

interface PostDetail extends GetGeneralBoardResponse {
  userImage?: string;
}

const CommuFreeDetail = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const [post, setPost] = useState<PostDetail | null>(null);
  const [comments, setComments] = useState<GetGeneralComment[] | null>(null);

  // 게시물 상세 로드 함수
  const loadBoards = async () => {
    try {
      const response = await getGeneralBoardDetail(numericId);
      setPost({
        ...response.data,
      });
    } catch (error) {
      console.error("Free boards loading error:", error);
    }
  };

  const loadComments = async () => {
    try {
      const response = await getGeneralComment(numericId);
      setComments(response.data);
    } catch (error) {
      console.error("Free boards loading error:", error);
    }
  };

  const postGood = async (boardId: number) => {
    const params = { boardId: boardId };

    try {
      const response = await axiosInstance.post(`/api/v1/board/general-board/${boardId}/like`, {
        params,
      });
      console.log("좋아요", response.data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    loadBoards();
    loadComments();
  }, []);

  return (
    <>
      {post && (
        <section className="font-kbogothiclight">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="mr-2">{post.userImage}</div>
              <div>
                <div className="font-kbogothicmedium">{post.userName}</div>
                <div className="text-sm text-gray-300">{post.createdAt.substring(0, 10)}</div>
              </div>
            </div>
            <div className="flex items-center text-right gap-2">
              <Scrap className="w-4 h-4 cursor-pointer text-[#FFA600]" />
              <Siren className="w-4 h-4 cursor-pointer text-[#FF5168]" />
            </div>
          </div>
          <div className="font-kbogothicmedium py-4">{post.title}</div>
          {post.imageUrl && <img src={post.imageUrl} alt="게시글 이미지" className="py-4" />}
          <div className="py-4">{post.content}</div>
          <div className="flex justify-end gap-1 items-center mb-2">
            <View className="w-4 h-4" />
            <div className="text-xs">{post.viewCount}명이 봤어요.</div>
          </div>
          <div className="flex justify-end gap-1 items-center mb-2">
            <div className="flex border border-gray-300 px-2 rounded-lg items-center gap-1">
              <Like
                className="w-4 h-4 text-[#FF5168] hover:cursor-pointer"
                onClick={() => postGood(numericId)}
              />{" "}
              {post.likeCount}
            </div>
          </div>
          {post.tags.map((tag, index) => (
            <div
              key={index}
              className="mb-2 inline-block px-2 py-1 text-sm font-kbogothiclight border border-green-900 rounded-lg mr-2"
            >
              {tag}
            </div>
          ))}
          <div className="border-b-2 text-gray-100 mb-2"></div>
          <div className="font-kbogothicmedium pt-2 pb-4">댓글 {post.commentCount}</div>
        </section>
      )}

      {comments &&
        comments.length > 0 &&
        comments.map((comment, index) => (
          <section key={index} className="font-kbogothiclight">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="mr-2">유저사진</div>
                <div>
                  <div className="font-kbogothicmedium">{comment.userName}</div>
                  <div className="text-sm text-gray-300">{comment.createdAt}</div>
                </div>
              </div>
            </div>
            <div className="py-2 ml-16">{comment.content}</div>
            <div className="flex justify-between items-center ml-16">
              <div className="flex items-center">
                <Comment className="w-4 h-4 text-[#7FAAFF] mr-2" />
                <div>답글 쓰기</div>
              </div>
              <div className="text-right text-gray-300 cursor-pointer">신고하기</div>
            </div>
          </section>
        ))}
    </>
  );
};

export default CommuFreeDetail;
