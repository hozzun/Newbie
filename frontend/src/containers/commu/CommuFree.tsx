import { useState, useEffect, useRef } from "react";
import CommuFreeItem from "../../components/commu/CommuFreeItem";

// 게시물 타입 정의
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

// 목업 데이터 생성 함수
const generateMockPosts = (startIndex: number, count: number): Post[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: startIndex + index,
    title: `게시물 제목 ${startIndex + index}`,
    contents: `이것은 게시물 ${startIndex + index}의 내용입니다. 자유롭게 작성된 내용이 들어갑니다.`,
    writer: `작성자${startIndex + index}`,
    createTimeStamp: new Date(Date.now() - index * 86400000).toLocaleDateString(),
    viewCount: Math.floor(Math.random() * 100),
    likeCount: Math.floor(Math.random() * 50),
    commentCount: Math.floor(Math.random() * 20),
  }));
};

const CommuFree = ({ searchQuery }: { searchQuery: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);
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
      const newPosts = generateMockPosts(pageRef.current * 10, 10);

      // 더 이상 불러올 데이터가 없는 상황 시뮬레이션 (50개 이상)
      if (pageRef.current >= 4) {
        setHasMore(false);
        return;
      }

      setPosts(prev => [...prev, ...newPosts]);
      pageRef.current += 1;
    } catch (error) {
      console.error("Posts loading error:", error);
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
  }, [posts]);

  // 초기 데이터 로드
  useEffect(() => {
    loadMorePosts();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        {posts.map((post, index) => (
          <div key={post.id} ref={index === posts.length - 1 ? lastPostRef : null}>
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
        {loading && <div className="text-center py-4">로딩 중...</div>}
        {!hasMore && <div className="text-center py-4">더 이상 게시물이 없습니다.</div>}
      </div>
    </>
  );
};

export default CommuFree;
