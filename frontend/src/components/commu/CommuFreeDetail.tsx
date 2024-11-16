import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Like from "../../assets/icons/heart-solid.svg?react";
import Comment from "../../assets/icons/comment-solid.svg?react";
import View from "../../assets/icons/eye-solid.svg?react";
import Scrap from "../../assets/icons/bookmark-solid.svg?react";
import Siren from "../../assets/icons/exclamation-solid.svg?react";
import { PostGeneralBoardResponse } from "../../api/boardApi";

interface PostDetail extends PostGeneralBoardResponse {
  userImage?: string;
}

const CommuFreeDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API 구현 후 실제 데이터를 불러오는 로직 추가
    // 현재는 더미 데이터로 표시
    const dummyData: PostDetail = {
      id: 1,
      userId: 1,
      title: "타이거즈 굿즈 판매",
      content: "응원하는 구단을 바꾸어서 팔아요..\n정말 고이 모셔놓고 만지지 않아서 깨끗해요",
      imageUrl: "",
      createdAt: new Date(Date.now() - 13 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 13 * 60 * 1000).toISOString(),
      tags: ["태그1"],
      commentCount: 1,
      likeCount: 4,
      scrapCount: 0,
      viewCount: 12,
      userImage: "유저사진", // 실제로는 이미지 URL이 들어갈 것입니다
    };

    setPost(dummyData);
    setLoading(false);
  }, [id]);

  if (loading || !post) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <section className="font-kbogothiclight">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2">{post.userImage}</div>
            <div>
              <div className="font-kbogothicmedium">개복이</div>
              <div className="text-sm text-gray-300">
                {new Date(post.createdAt).getMinutes()}분 전
              </div>
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
            <Like className="w-4 h-4 text-[#FF5168]" /> {post.likeCount}
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
      </section>

      {/* 댓글 섹션은 현재 더미 데이터로 유지 */}
      <section className="font-kbogothiclight">
        <div className="font-kbogothicmedium pt-2 pb-4">댓글 1</div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2">유저사진</div>
            <div>
              <div className="font-kbogothicmedium">천재칼치</div>
              <div className="text-sm text-gray-300">13분 전</div>
            </div>
          </div>
        </div>
        <div className="py-2 ml-16">
          오늘은 이 글을 읽으면서 많은 동기부여를 받았어요. 고맙습니다!
        </div>
        <div className="flex justify-between items-center ml-16">
          <div className="flex items-center">
            <Comment className="w-4 h-4 text-[#7FAAFF] mr-2" />
            <div>답글 쓰기</div>
          </div>
          <div className="text-right text-gray-300 cursor-pointer">신고하기</div>
        </div>
      </section>
    </>
  );
};

export default CommuFreeDetail;
