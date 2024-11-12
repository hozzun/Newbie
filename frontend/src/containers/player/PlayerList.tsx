import { useEffect, useRef, useState } from "react";
import PlayerListComponent from "../../components/player/PlayerList";

const PlayerList = () => {
  const [hasMore, setHasMore] = useState<boolean>(true);
  const paNo = useRef<number>(0);
  const observeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          // TODO: GET - 선수 리스트
          console.log("선수 리스트 더 가져오기");
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    );

    if (observeRef.current) {
      observer.observe(observeRef.current);
    }

    return () => {
      if (observeRef.current) {
        observer.unobserve(observeRef.current);
      }
    };
  }, [observeRef.current, hasMore]);

  const handleSelectSortOption = (value: string) => {
    // TODO: GET - 선수 리스트 with 정렬 기준
    console.log(`선수 리스트 가져오기 with 정렬 기준: ${value}`);
  };

  return (
    <PlayerListComponent
      hasMore={hasMore}
      observeRef={observeRef}
      handleSelectSortOption={handleSelectSortOption}
    />
  );
};

export default PlayerList;
