import { useEffect, useState } from "react";
import { GetClubRanksRequest, getClubRanks } from "../../api/baseballApi";
import ClubHomeComponent from "../../components/club/ClubHome";
import ClubId, { getClubIdByNum } from "../../util/ClubId";
import axios from "axios";
import { ClubOverviewProps } from "../../components/club/ClubOverview";
import { registerCheerClub } from "../../api/clubApi";
import { useNavigate, useParams } from "react-router-dom";
import CustomError from "../../util/CustomError";
import { PlayerListProps } from "../../components/club/PlayerList";
import { GetPlayersRequest, getPlayers } from "../../api/playerApi";
import { PlayerItemProps } from "../player/PlayerList";

export interface ClubOverviewData {
  id: string;
  year: string;
  rank: number;
  gameCount: number;
  winCount: number;
  loseCount: number;
  drawCount: number;
  winRate: number;
}

export interface UpcomingGameData {
  stadium: string;
  day: string;
  teamId: string;
}

const ClubHome = () => {
  const nav = useNavigate();

  const { id } = useParams<{ id: string }>();

  const today = new Date();

  const [clubOverview, setClubOverview] = useState<ClubOverviewData | null>(null);
  const [isVisibleButton, setIsVisibleButton] = useState<boolean>(false);
  const [upcomingGame, setUpcomingGame] = useState<UpcomingGameData | null>(null);
  const [players, setPlayers] = useState<Array<PlayerItemProps> | null>(null);

  const fetchClubOverview = async () => {
    try {
      if (!id) {
        throw new CustomError("[ERROR] 구단 ID 없음 by club home");
      }

      const getClubOverviewRequest: GetClubRanksRequest = {
        year: today.getFullYear().toString(),
        teamId: ClubId[id],
      };
      const response = await getClubRanks(getClubOverviewRequest);
      const clubOverviewData: ClubOverviewData = {
        id: getClubIdByNum(response.data[0].teamId),
        year: response.data[0].year,
        rank: response.data[0].rank,
        gameCount: response.data[0].gameCount,
        winCount: response.data[0].winCount,
        loseCount: response.data[0].loseCount,
        drawCount: response.data[0].drawCount,
        winRate: parseFloat(response.data[0].winRate),
      };

      setClubOverview(clubOverviewData);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        console.log("[INFO] 구단 간단한 소개 정보 없음 by club home");
        setClubOverview(null);
      } else {
        console.error(e);
      }
    }
  };

  const fetchUpcomingGame = async () => {
    try {
      // TODO: GET - 예정된 경기 정보
      const upcomingGameData: UpcomingGameData = {
        stadium: "수원",
        day: "2024.10.01 (화) 17:00",
        teamId: getClubIdByNum(2),
      };

      setUpcomingGame(upcomingGameData);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        console.log("[INFO] 예정된 경기 없음  by club home");
        setClubOverview(null);
      } else {
        console.error(e);
      }
    }
  };

  const fetchPlayers = async () => {
    try {
      if (!id) {
        throw new CustomError("[ERROR] 구단 ID 없음 by club home");
      }

      const getPlayerListRequest: GetPlayersRequest = {
        teamId: ClubId[id],
        page: 0,
        sortBy: "likeCount",
      };
      const response = await getPlayers(getPlayerListRequest);
      const playerDats: Array<PlayerItemProps> = response.data.content.slice(0, 3).map(d => {
        return {
          id: d.id,
          imgUrl: "선수 사진 URL", // TODO: GET - 선수 사진 URL
          name: d.name,
          likeCount: d.likeCount,
          goDetail: () => nav(`/club/${id}/player/${d.id}`),
        };
      });

      setPlayers(playerDats);
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
    fetchClubOverview();
    fetchUpcomingGame();
    fetchPlayers();
  }, []);

  useEffect(() => {
    if (id) {
      // TODO: GET - 사용자 응원 구단 ID
      setIsVisibleButton(1 === ClubId[id]);
    } else {
      throw new CustomError("[ERROR] 구단 ID 없음 by club home");
    }
  }, []);

  const handleRegisterCheerClub = async () => {
    // TODO: GET - 사용자 응원 구단 ID
    // TODO: 응원 구단 등록 완료 시 stackbar 표시하기
    try {
      const response = await registerCheerClub({ teamId: 1 });

      if (response.status === 200) {
        alert("응원 구단 등록 성공");
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        console.log("[ERROR] 응원 구단 등록 실패 by club home");
        setClubOverview(null);
      } else {
        console.error(e);
      }
    }
  };

  const goMore = () => {
    nav(`/club/${id}/player`);
  };

  const clubOverviewProps: ClubOverviewProps = {
    clubOverviewData: clubOverview,
    isVisibleButton: isVisibleButton,
    handleRegisterCheerClub: handleRegisterCheerClub,
  };

  const playerListProps: PlayerListProps = {
    players: players,
    goMore: goMore,
  };

  return (
    <ClubHomeComponent
      clubOverviewProps={clubOverviewProps}
      upcomingGameProps={{ upcomingGameData: upcomingGame }}
      playerListProps={playerListProps}
    />
  );
};

export default ClubHome;
