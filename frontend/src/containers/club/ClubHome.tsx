import { useEffect, useState } from "react";
import {
  GetClubRanksRequest,
  getClubHitterRecord,
  getClubPitcherRecord,
  getClubRanks,
  getClubRecordRequest,
} from "../../api/baseballApi";
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
import { ClubCarouselProps } from "../../components/common/ClubCarousel";
import { ClubRecordItemProps } from "../../components/club/ClubRecordItem";

export interface ClubRank {
  year: string;
  rank: number;
}

export interface ClubRecord {
  year: number;
  value: number;
}

export interface ClubRecords {
  earnedRunAverage: Array<ClubRecord>;
  strikeOuts: Array<ClubRecord>;
  baseOnBalls: Array<ClubRecord>;
  walksPlusHitsPerInningPitched: Array<ClubRecord>;
  battingAverage: Array<ClubRecord>;
  runs: Array<ClubRecord>;
  hits: Array<ClubRecord>;
  homeRun: Array<ClubRecord>;
  [key: string]: Array<ClubRecord>;
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

interface ClubPitcherRecord {
  year: number;
  earnedRunAverage: number; // 평균자책점
  strikeOuts: number; // 삼진
  baseOnBalls: number; // 볼넷
  walksPlusHitsPerInningPitched: number; // 이닝당 출루율
}

interface ClubHitterRecord {
  year: number;
  battingAverage: number; // 타율
  runs: number; // 득점
  hits: number; // 안타
  homeRun: number; // 홈런
}

export interface UpcomingGameData {
  stadium: string;
  day: string;
  teamId: string;
}

const clubRecordLabel: Record<string, string> = {
  earnedRunAverage: "평균자책점",
  strikeOuts: "삼진",
  baseOnBalls: "볼넷",
  walksPlusHitsPerInningPitched: "이닝당 출루율",
  battingAverage: "타율",
  runs: "득점",
  hits: "안타",
  homeRun: "홈런",
};

const ClubHome = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();

  const today = new Date();

  const [clubRecord, setClubRecord] = useState<ClubRecords | null>(null);
  const [clubRecordItems, setClubRecordItems] = useState<Array<ClubRecordItemProps> | null>(null);
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

  const fetchClubRecord = async () => {
    try {
      if (!id) {
        throw new CustomError("[ERROR] 구단 ID 없음 by club home");
      }

      const pitcherResponse = await getClubPitcherRecord({ teamId: ClubId[id] });
      const pitcherRecordData: Array<ClubPitcherRecord> = pitcherResponse.data.map(d => {
        return {
          year: parseInt(d.year),
          earnedRunAverage: parseFloat(d.era).toFixed(2),
          strikeOuts: d.so,
          baseOnBalls: d.bb,
          walksPlusHitsPerInningPitched: parseFloat(d.whip).toFixed(2),
        };
      });

      pitcherRecordData.sort((a, b) => a.year - b.year);

      const hitterResponse = await getClubHitterRecord({ teamId: ClubId[id] });
      const hitterRecordData: Array<ClubHitterRecord> = hitterResponse.data.map(d => {
        return {
          year: parseInt(d.year),
          battingAverage: parseFloat(d.avg).toFixed(3),
          runs: d.r,
          hits: d.h,
          homeRun: d.homerun,
        };
      });

      hitterRecordData.sort((a, b) => a.year - b.year);

      const maxYear = pitcherRecordData[pitcherRecordData.length - 1].year;
      const clubRecordDatas: ClubRecords = {
        earnedRunAverage: [],
        strikeOuts: [],
        baseOnBalls: [],
        walksPlusHitsPerInningPitched: [],
        battingAverage: [],
        runs: [],
        hits: [],
        homeRun: [],
      };
      for (let index = 0; index < pitcherRecordData.length; index++) {
        const pRecord = pitcherRecordData[index];
        const hRecord = hitterRecordData[index];

        const year = pRecord.year;

        Object.entries(pRecord).forEach(([key, value]) => {
          if (key === "year") {
            return;
          }

          if (clubRecordDatas[key]) {
            clubRecordDatas[key].push({ year, value });
          } else {
            clubRecordDatas[key] = [{ year, value }];
          }
        });

        Object.entries(hRecord).forEach(([key, value]) => {
          if (key === "year") {
            return;
          }

          if (clubRecordDatas[key]) {
            clubRecordDatas[key].push({ year, value });
          } else {
            clubRecordDatas[key] = [{ year, value }];
          }
        });

        if (year === maxYear) {
          const clubRecordItemDatas: Array<ClubRecordItemProps> = [];
          Object.entries(hRecord).forEach(([key, value]) => {
            if (key === "year") {
              return;
            }

            clubRecordItemDatas.push({ label: clubRecordLabel[key], value });
          });
          Object.entries(pRecord).forEach(([key, value]) => {
            if (key === "year") {
              return;
            }

            clubRecordItemDatas.push({ label: clubRecordLabel[key], value });
          });

          setClubRecordItems(clubRecordItemDatas);
        }
      }
      setClubRecord(clubRecordDatas);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        console.log("[INFO] 구단 성적 없음  by club home");
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
        setUpcomingGame(null);
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
          backNumber: d.backNumber,
          name: d.name,
          position: d.position,
          birth: d.birth,
          physical: d.physical,
          likeCount: d.likeCount,
          imageUrl: d.imageUrl,
        };

        return {
          id: d.id,
          imgUrl: d.imageUrl,
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
    fetchClubRecord();
    fetchUpcomingGame();
    fetchPlayers();

    dispatch(clearPlayerListItem());
  }, [id]);

  useEffect(() => {
    if (id) {
      // TODO: GET - 사용자 응원 구단 ID
      setIsVisibleButton(1 !== ClubId[id]);
    } else {
      throw new CustomError("[ERROR] 구단 ID 없음 by club home");
    }
  }, [id]);

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

  const goOtherClub = (value: string) => {
    nav(`/club/${value}`);
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

  const clubCarouselProps: ClubCarouselProps = {
    selectedItem: id ? id : "",
    handleClickItem: goOtherClub,
  };

  return (
    <ClubHomeComponent
      clubOverviewProps={clubOverviewProps}
      clubRecordItems={clubRecordItems}
      upcomingGameProps={{ upcomingGameData: upcomingGame }}
      playerListProps={playerListProps}
      clubRankHistoryProps={clubRanknHistoryProps}
      clubCarouselProps={clubCarouselProps}
    />
  );
};

export default ClubHome;
