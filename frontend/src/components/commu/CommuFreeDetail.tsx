import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Like from "../../assets/icons/heart-solid.svg?react";
import View from "../../assets/icons/eye-solid.svg?react";
import Scrap from "../../assets/icons/bookmark-solid.svg?react";
import Pencil from "../../assets/icons/pencil-solid.svg?react";
import { getGeneralBoardDetail, GetGeneralBoardResponse } from "../../api/boardApi";
import { getGeneralComment, GetGeneralComment } from "../../api/boardApi";
import axiosInstance from "../../util/axiosInstance";
import ChatInput from "../../components/commu/ChatInput";

const CommuFreeDetail = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const nav = useNavigate();
  const [post, setPost] = useState<GetGeneralBoardResponse | null>(null);
  const [comments, setComments] = useState<GetGeneralComment[] | null>(null);
  const [good, setGood] = useState<boolean | null>(null);
  const [scrap, setScrap] = useState<boolean | null>(null);

  // 게시물 상세 로드 함수
  const loadBoards = async () => {
    try {
      const response = await getGeneralBoardDetail(numericId);
      setPost({
        ...response.data,
      });
      setGood(response.data.likedByUser);
      setScrap(response.data.scrapedByUser);
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
      setGood(!good);
      console.log(response.data); // TODO: API 완성되면 테스트
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const postScrap = async (boardId: number) => {
    const params = { boardId: boardId, boardType: "general" };

    try {
      const response = await axiosInstance.post("/api/v1/board/scrap", {
        params,
      });
      setScrap(!scrap);
      return response.data;
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    loadBoards();
    loadComments();
  }, []);

  const handlePostComment = (isSuccess: boolean) => {
    if (isSuccess) {
      // 댓글 전송이 성공하면 새 댓글 목록을 불러옴
      loadComments();
    }
    // 실패 시에는 아무 것도 하지 않음
  };

  return (
    <>
      {post && (
        <section className="font-kbogothiclight">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="mr-2">{post.profile}</div>
              <div>
                <div className="font-kbogothicmedium">{post.userName}</div>
                <div className="text-sm text-gray-300">{post.createdAt.substring(0, 10)}</div>
              </div>
            </div>
            <div className="flex items-center text-right gap-2">
              {scrap ? (
                <Scrap
                  className="w-4 h-4 cursor-pointer text-[#FFA600]"
                  onClick={() => postScrap(numericId)}
                />
              ) : (
                <Scrap
                  className="w-4 h-4 cursor-pointer text-gray-200"
                  onClick={() => postScrap(numericId)}
                />
              )}
            </div>
            <div className="flex items-center text-right gap-2">
              <Pencil
                className="w-4 h-4 text-success-200 cursor-pointer"
                onClick={() =>
                  nav(`/commuhome/freedetail/${numericId}/revise`, { state: { post } })
                }
              />
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
            <div className="flex border border-gray-300 px-2 rounded-lg items-center gap-1 hover:cursor-pointer">
              {good ? (
                <Like className="w-4 h-4 text-gray-200" onClick={() => postGood(numericId)} />
              ) : (
                <Like className="w-4 h-4 text-[#FF5168]" onClick={() => postGood(numericId)} />
              )}{" "}
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
                  <div className="text-sm text-gray-300">{comment.createdAt.substring(0, 10)}</div>
                </div>
              </div>
            </div>
            <div className="py-2 ml-16">{comment.content}</div>
          </section>
        ))}
      <ChatInput boardId={numericId} onPostComment={handlePostComment} />
    </>
  );
};

export default CommuFreeDetail;
