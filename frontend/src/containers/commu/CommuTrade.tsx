import { useState, useEffect, useRef } from "react";
import CommuTradeItem from "../../components/commu/CommuTradeItem";
import { getUsedBoard, GetUsedBoardResponse } from "../../api/boardApi";

const CommuTrade = ({ searchQuery }: { searchQuery: string }) => {
  const [tradeBoards, setTradeBoards] = useState<GetUsedBoardResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const lastBoardRef = useRef<HTMLDivElement | null>(null);

  // 게시물 로드 함수
  const loadBoards = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await getUsedBoard();
      // response.data로 실제 데이터에 접근
      if (!response.data || response.data.length === 0) {
        setHasMore(false);
        return;
      }

      setTradeBoards(response.data);
      setHasMore(false);
    } catch (error) {
      console.error("Trade boards loading error:", error);
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
          loadBoards();
        }
      },
      { threshold: 0.1 },
    );

    const currentElement = lastBoardRef.current;
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
    loadBoards();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        {tradeBoards.map((board, index) => (
          <div key={board.id} ref={index === tradeBoards.length - 1 ? lastBoardRef : null}>
            <CommuTradeItem
              title={board.title}
              contents={board.content}
              writer={board.userName}
              createTimeStamp={new Date(board.createdAt).toLocaleDateString()}
              price={board.price}
              location={board.region}
              viewCount={board.likeCount}
              commentCount={board.commentCount}
              imageUrl={board.imageUrl}
            />
            {index < tradeBoards.length - 1 && <hr className="my-4 border-gray-200" />}
          </div>
        ))}
        {loading && <div className="text-center py-4">로딩 중...</div>}
        {!hasMore && <div className="text-center py-4">더 이상 게시물이 없습니다.</div>}
      </div>
    </>
  );
};

export default CommuTrade;
