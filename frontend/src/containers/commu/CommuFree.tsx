import { useState, useEffect, useRef } from "react";
import CommuFreeItem from "../../components/commu/CommuFreeItem";
import { getGeneralBoard, GetGeneralBoardResponse } from "../../api/boardApi";

const CommuFree = ({ searchQuery }: { searchQuery: string }) => {
  const [freeBoards, setFreeBoards] = useState<GetGeneralBoardResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const lastBoardRef = useRef<HTMLDivElement | null>(null);

  // 게시물 로드 함수
  const loadBoards = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await getGeneralBoard();
      // response.data로 실제 데이터에 접근
      if (!response.data || response.data.length === 0) {
        setHasMore(false);
        return;
      }

      setFreeBoards(prev => [...prev, ...response.data]);
    } catch (error) {
      console.error("Free boards loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  // searchQuery가 변경될 때마다 게시물 다시 로드
  useEffect(() => {
    if (searchQuery) {
      console.log("Searching for:", searchQuery);
      // 검색 로직 추가 예정
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
  }, [loading, hasMore]);

  // 초기 데이터 로드
  useEffect(() => {
    loadBoards();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        {freeBoards.map((board, index) => (
          <div key={board.id} ref={index === freeBoards.length - 1 ? lastBoardRef : null}>
            <CommuFreeItem
              title={board.title}
              contents={board.content}
              writer={board.userName}
              createTimeStamp={new Date(board.createdAt).toLocaleDateString()}
              viewCount={board.viewCount}
              likeCount={board.likeCount}
              commentCount={board.commentCount}
            />
            {index < freeBoards.length - 1 && <hr className="my-4 border-gray-200" />}
          </div>
        ))}
        {loading && <div className="text-center py-4">로딩 중...</div>}
        {!hasMore && <div className="text-center py-4">더 이상 게시물이 없습니다.</div>}
      </div>
    </>
  );
};

export default CommuFree;
