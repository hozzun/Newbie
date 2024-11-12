import { useState, useEffect, useRef } from "react";
import CommuTradeItem from "../../components/commu/CommuTradeItem";

// 게시물 타입 정의
interface TradePost {
  id: number;
  title: string;
  contents: string;
  writer: string;
  createTimeStamp: string;
  price: number;
  location: string;
  viewCount: number;
  commentCount: number;
  imageUrl: string;
}

// 목업 데이터 생성 함수
const generateMockTradePosts = (startIndex: number, count: number): TradePost[] => {
  const locations = ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종"];

  return Array.from({ length: count }, (_, index) => ({
    id: startIndex + index,
    title: `중고 상품 ${startIndex + index}`,
    contents: `상품 설명입니다. 상태 좋은 중고 상품 판매합니다. ${startIndex + index}`,
    writer: `판매자${startIndex + index}`,
    createTimeStamp: new Date(Date.now() - index * 86400000).toLocaleDateString(),
    price: Math.floor(Math.random() * 500000) + 10000, // 10,000원 ~ 510,000원
    location: locations[Math.floor(Math.random() * locations.length)],
    viewCount: Math.floor(Math.random() * 100),
    commentCount: Math.floor(Math.random() * 20),
    imageUrl: `/api/placeholder/200/200`, // 실제 이미지 URL로 교체 필요
  }));
};

const CommuTrade = ({ searchQuery }: { searchQuery: string }) => {
  const [tradePosts, setTradePosts] = useState<TradePost[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // searchQuery 값이 변경될 때 API 요청
    if (searchQuery) {
      // API 호출 함수에 searchQuery를 전달하여 검색 데이터 가져오기
      loadPosts(searchQuery);
    }
  }, [searchQuery]);

  const loadPosts = async (query: string) => {
    console.log(query);
    // 검색을 통해 필터된 게시물을 불러오는 API 호출 로직
  };

  // 새로운 게시물 로드 함수
  const loadMorePosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      // 실제 API 호출 대신 목업 데이터 사용
      const newPosts = generateMockTradePosts(pageRef.current * 5, 5);

      // 더 이상 불러올 데이터가 없는 상황 시뮬레이션 (30개 이상)
      if (pageRef.current >= 5) {
        setHasMore(false);
        return;
      }

      setTradePosts(prev => [...prev, ...newPosts]);
      pageRef.current += 1;
    } catch (error) {
      console.error("Trade posts loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 },
    );

    observerRef.current = observer;
    return () => observer.disconnect();
  }, []);

  // 마지막 게시물 관찰
  useEffect(() => {
    const observer = observerRef.current;
    const lastElement = lastPostRef.current;

    if (observer && lastElement) {
      observer.observe(lastElement);
    }

    return () => {
      if (observer && lastElement) {
        observer.unobserve(lastElement);
      }
    };
  }, [tradePosts]);

  // 초기 데이터 로드
  useEffect(() => {
    loadMorePosts();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        {tradePosts.map((post, index) => (
          <div key={post.id} ref={index === tradePosts.length - 1 ? lastPostRef : null}>
            <CommuTradeItem
              title={post.title}
              contents={post.contents}
              writer={post.writer}
              createTimeStamp={post.createTimeStamp}
              price={post.price}
              location={post.location}
              viewCount={post.viewCount}
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
