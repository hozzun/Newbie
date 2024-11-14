import { useState, useEffect, useRef } from "react";
import CommuTradeItem from "../../components/commu/CommuTradeItem";
import { getUsedBoard } from "../../api/boardApi";

// GetUsedBoardResponse를 확장하여 추가 필드 정의
interface TradePost {
  id: number;
  userId: number;
  userName: string;
  title: string;
  content: string;
  price: number;
  region: string;
  imageUrl: string;
  createdAt: string;
  tags: string[];
  likeCount: number;
  commentCount: number;
  scrapCount: number;
}

const CommuTrade = ({ searchQuery }: { searchQuery: string }) => {
  const [tradePosts, setTradePosts] = useState<TradePost[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const lastPostRef = useRef<HTMLDivElement | null>(null);

  // 게시물 로드 함수
  const loadPosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await getUsedBoard();
      // response.data로 실제 데이터에 접근
      if (!response.data || response.data.length === 0) {
        setHasMore(false);
        return;
      }

      setTradePosts(response.data);
      setHasMore(false);
    } catch (error) {
      console.error("Trade posts loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  // searchQuery가 변경될 때마다 게시물 다시 로드
  useEffect(() => {
    if (searchQuery) {
      console.log("Searching for:", searchQuery);
      // 나중에 검색 기능 구현 시 여기에 추가
    }
  }, [searchQuery]);

  // 무한 스크롤 observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading) {
          loadPosts();
        }
      },
      { threshold: 0.1 },
    );

    const currentElement = lastPostRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [loading, hasMore]); // 의존성 배열 수정

  // 초기 데이터 로드
  useEffect(() => {
    loadPosts();
  }, []);

  console.log(tradePosts);

  return (
    <>
      <div className="flex flex-col gap-4">
        {tradePosts.map((post, index) => (
          <div key={post.id} ref={index === tradePosts.length - 1 ? lastPostRef : null}>
            <CommuTradeItem
              title={post.title}
              contents={post.content}
              writer={post.userName}
              createTimeStamp={new Date(post.createdAt).toLocaleDateString()}
              price={post.price}
              location={post.region}
              viewCount={post.likeCount}
              commentCount={post.commentCount}
              imageUrl={post.imageUrl}
            />
            {index < tradePosts.length - 1 && <hr className="my-4 border-gray-200" />}
          </div>
        ))}
        {loading && <div className="text-center py-4">로딩 중...</div>}
        {!hasMore && <div className="text-center py-4">더 이상 게시물이 없습니다.</div>}
      </div>
    </>
  );
};

export default CommuTrade;
