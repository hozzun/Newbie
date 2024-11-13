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
import { PlayerInfo, PlayerItemProps } from "../player/PlayerList";
import { useDispatch } from "react-redux";
import { clearPlayerListItem, setPlayer } from "../../redux/playerSlice";
import { ClubRankHistoryProps } from "../../components/club/ClubRankHistory";

export interface ClubRank {
  year: string;
  rank: number;
}

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
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();

  const today = new Date();

  const [clubRankHistory, setClubRankHistory] = useState<Array<ClubRank> | null>(null);
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
        teamId: ClubId[id],
      };
      const response = await getClubRanks(getClubOverviewRequest);
      const clubRankHistoryData: Array<ClubRank> = response.data.map(d => {
        if (d.year === today.getFullYear().toString()) {
          console.log(d.year);
          const clubOverviewData: ClubOverviewData = {
            id: getClubIdByNum(d.teamId),
            year: d.year,
            rank: d.rank,
            gameCount: d.gameCount,
            winCount: d.winCount,
            loseCount: d.loseCount,
            drawCount: d.drawCount,
            winRate: parseFloat(d.winRate),
          };

          setClubOverview(clubOverviewData);
        }

        return {
          year: d.year,
          rank: d.rank,
        };
      });

      clubRankHistoryData.sort((a, b) => parseInt(a.year) - parseInt(b.year));

      setClubRankHistory(clubRankHistoryData);
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

  const goDetail = (playerInfo: PlayerInfo) => {
    dispatch(setPlayer(playerInfo));
    nav(`/club/${id}/player/${playerInfo.id}`);
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

    dispatch(clearPlayerListItem());
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

  const clubRanknHistoryProps: ClubRankHistoryProps = {
    clubId: id,
    clubRankHistoryData: clubRankHistory,
  };

  return (
    <ClubHomeComponent
      clubOverviewProps={clubOverviewProps}
      upcomingGameProps={{ upcomingGameData: upcomingGame }}
      playerListProps={playerListProps}
      clubRankHistoryProps={clubRanknHistoryProps}
    />
  );
};

export default ClubHome;
