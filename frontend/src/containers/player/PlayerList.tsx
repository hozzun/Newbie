import { useEffect, useRef, useState } from "react";
import PlayerListComponent from "../../components/player/PlayerList";
import { useParams } from "react-router-dom";
import ClubId from "../../util/ClubId";
import CustomError from "../../util/CustomError";
import { GetPlayersRequest, getPlayers } from "../../api/playerApi";
import axios from "axios";

export interface PlayerItemProps {
  id: number;
  imgUrl: string;
  name: string;
  likeCount: number;
}

const sortItem: Record<string, string> = {
  등번호순: "backNumber",
  좋아요순: "likeCount",
};

const PlayerList = () => {
  const { id } = useParams<{ id: string }>();

  const [selectedPositionOption, setSelectedPositionOption] = useState<string>("");
  const [selectedSortOption, setSelectedSortOption] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [players, setPlayers] = useState<Array<PlayerItemProps> | null>(null);
  const pgNo = useRef<number>(0);
  const observeRef = useRef(null);

  const fetchPlayerList = async () => {
    try {
      if (!id) {
        throw new CustomError("[ERROR] 구단 ID 없음 by club home");
      }

      const getPlayerListRequest: GetPlayersRequest = {
        teamId: ClubId[id],
        page: pgNo.current,
      };
      if (selectedPositionOption !== "") {
        getPlayerListRequest.position = selectedPositionOption;
      }
      if (selectedSortOption !== "" && Object.keys(sortItem).includes(selectedSortOption)) {
        getPlayerListRequest.sortBy = sortItem[selectedSortOption];
      }
      const response = await getPlayers(getPlayerListRequest);
      const playerDatas: Array<PlayerItemProps> = response.data.content.map(d => {
        return {
          id: d.id,
          imgUrl: "선수 사진 URL", // TODO: GET - 선수 사진 URL
          name: d.name,
          likeCount: d.likeCount,
        };
      });

      setPlayers(prevPlayerDatas => [...(prevPlayerDatas ?? []), ...playerDatas]);

      if (response.data.content.length < 30) {
        setHasMore(false);
      } else {
        pgNo.current += 1;
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        console.log("[INFO] 선수 정보 없음 by player list");
        setPlayers([]);
      } else {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPlayerList();
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
    setSelectedSortOption(value);
  };

  return (
    <PlayerListComponent
      hasMore={hasMore}
      observeRef={observeRef}
      selectedSortOption={selectedSortOption}
      handleSelectSortOption={handleSelectSortOption}
      players={players}
    />
  );
};

export default PlayerList;
