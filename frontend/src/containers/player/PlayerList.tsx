import { useEffect, useRef, useState } from "react";
import PlayerListComponent from "../../components/player/PlayerList";
import { useNavigate, useParams } from "react-router-dom";
import ClubId from "../../util/ClubId";
import CustomError from "../../util/CustomError";
import { GetPlayersRequest, getPlayers } from "../../api/playerApi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPlayer, setPlayerListItem } from "../../redux/playerSlice";
import { RootState } from "../../redux/store";

export interface PlayerItemProps {
  id: number;
  imgUrl: string;
  name: string;
  likeCount: number;
  goDetail: () => void;
}

export interface PlayerInfo {
  id: number;
  teamId: string;
  backNumber: number;
  name: string;
  position: string;
  birth: string;
  physical: string;
  likeCount: number;
}

const sortItem: Record<string, string> = {
  등번호순: "backNumber",
  좋아요순: "likeCount",
};

const PlayerList = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const playerListItem = useSelector((state: RootState) => state.player.playerListItem);

  const { id } = useParams<{ id: string }>();

  const [selectedPositionOption, setSelectedPositionOption] = useState<string>(
    playerListItem.position,
  );
  const [selectedSortOption, setSelectedSortOption] = useState<string>(playerListItem.sort);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [players, setPlayers] = useState<Array<PlayerItemProps> | null>(null);
  const isFirstRender = useRef<boolean>(true);
  const pgNo = useRef<number>(0);
  const observeRef = useRef(null);

  const goDetail = (playerInfo: PlayerInfo) => {
    dispatch(setPlayer(playerInfo));
    nav(`/club/${id}/player/${playerInfo.id}`);
  };

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
        const playerInfo: PlayerInfo = {
          id: d.id,
          teamId: id,
          backNumber: parseInt(d.backNumber),
          name: d.name,
          position: d.position,
          birth: d.birth,
          physical: d.physical,
          likeCount: d.likeCount,
        };

        return {
          id: d.id,
          imgUrl: "선수 사진 URL", // TODO: GET - 선수 사진 URL
          name: d.name,
          likeCount: d.likeCount,
          goDetail: () => goDetail(playerInfo),
        };
      });

      setPlayers(prevPlayerDatas => [...(prevPlayerDatas ?? []), ...playerDatas]);

      if (response.data.content.length < 30) {
        setHasMore(false);
      } else {
        setHasMore(true);
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
    return () => {
      dispatch(
        setPlayerListItem({
          position: selectedPositionOption,
          sort: selectedSortOption,
        }),
      );
    };
  }, [selectedPositionOption, selectedSortOption]);

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

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    fetchPlayerList();
  }, [selectedPositionOption, selectedSortOption]);

  const handleSelectPositionOption = (value: string) => {
    setSelectedPositionOption(value);

    setHasMore(false);
    setPlayers(null);
    pgNo.current = 0;
  };

  const handleSelectSortOption = (value: string) => {
    setSelectedSortOption(value);

    setHasMore(false);
    setPlayers(null);
    pgNo.current = 0;
  };

  return (
    <PlayerListComponent
      hasMore={hasMore}
      observeRef={observeRef}
      selectedPositionOption={selectedPositionOption}
      handleSelectPositionOption={handleSelectPositionOption}
      selectedSortOption={selectedSortOption}
      handleSelectSortOption={handleSelectSortOption}
      players={players}
    />
  );
};

export default PlayerList;
