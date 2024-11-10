import { useState, useEffect } from "react";
import HomeComponent from "../../components/home/Home";
import { TodayGameProps } from "../../components/home/TodayGame";
import { ImageCardProps } from "../../components/home/ImageCard";
import { ClubRankProps } from "../../components/home/ClubRank";
import { HighlightProps } from "../../components/home/Highlight";
import { CardStoreItemProps } from "../../components/home/CardStoreItem";
import { CardStoreProps } from "../../components/home/CardStore";
import { GameProps, GameSituation } from "../../components/home/Game";
import { useNavigate } from "react-router-dom";
import { GetGamesRequest, getClubRanks, getGames } from "../../api/baseballApi";
import { getClubIdByNum } from "../../util/ClubId";
import CustomError from "../../util/CustomError";

export interface ClubProps {
  id: string;
  player?: string;
}

export interface GameInfo {
  day: string;
  time: string;
  place: string;
  clubs: Array<ClubProps>;
  weather?: string;
}

export interface ClubRankItemProps {
  id: string;
  rank: number;
  gameCount: number;
  winCount: number;
  drawCount: number;
  loseCount: number;
  gameDifference: number;
  rankDifference: number;
}

const validateTeamId = (teamId: string | undefined) => {
  if (!teamId) {
    throw new CustomError("[ERROR] 구단 ID 변환 과정 by HOME");
  }

  return teamId;
};

// 더미 데이터
// const gameSituationData: GameSituation = {
//   isPlaying: true,
//   scores: {
//     samsung: 2,
//     kia: 1,
//   },
// };
// ---

const Home = () => {
  const nav = useNavigate();

  const today = new Date();

  const [hasCheeringClub, setHasCheeringClub] = useState<boolean>(false);
  const [todayGame, setTodayGame] = useState<GameProps>();
  const [photoCardImage, setPhotoCardImage] = useState<string | null>(null);
  const [watchedGameImage, setWatchedGameImage] = useState<string | null>(null);
  const [clubRanks, setClubRanks] = useState<Array<ClubRankItemProps> | null>(null);
  const [highlightUrl, setHighlightUrl] = useState<string | null>(null);
  const [cards, setCards] = useState<Array<CardStoreItemProps> | null>(null);

  const fetchTodayGame = async () => {
    try {
      // TODO: GET - 응원 구단 여부
      const hasCheeringClubData: boolean = true;
      setHasCheeringClub(hasCheeringClubData);

      if (hasCheeringClubData) {
        // TODO: GET - 응원 구단에 맞는 오늘의 경기
        const getGamesRequest: GetGamesRequest = {
          year: today.getFullYear().toString(),
          month: today.getMonth().toString() + 1,
          day: today.getDate().toString(),
          teamId: 1, // TODO: 나의 응원 구단 ID 구하기
        };

        const response = await getGames(getGamesRequest);
        const homeTeamId = validateTeamId(getClubIdByNum(response.data.homeTeamId));
        const awayTeamId = validateTeamId(getClubIdByNum(response.data.awayTeamId));
        const gameInfoData: GameInfo = {
          day: response.data.date,
          time: response.data.time,
          place: response.data.stadium,
          clubs: [
            {
              id: homeTeamId,
              player: response.data.homeStartingPitcher,
            },
            {
              id: awayTeamId,
              player: response.data.awayStartingPitcher,
            },
          ],
        };

        // TODO: GET - 날씨 정보
        gameInfoData.weather = "☀ 맑음";

        // TODO: GET - 경기 진행 상황
        const gameSituationData: GameSituation = {
          isPlaying: true,
          scores: {
            samsung: 2,
            kia: 1,
          },
        };

        const todayGameData: GameProps = {
          gameInfo: gameInfoData,
          gameSituation: gameSituationData,
        };
        setTodayGame(todayGameData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchImage = async () => {
    try {
      // TODO: GET - 최신 나의 포토카드 이미지 url
      const photoCardImageData: string | null = null;
      setPhotoCardImage(photoCardImageData);

      // TODO: GET - 최신 나의 직관경기 이미지 url
      const watchedGameImageData: string | null = "/src/assets/images/직관경기사진.jpeg";
      setWatchedGameImage(watchedGameImageData);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchClubRanks = async () => {
    try {
      const response = await getClubRanks({ year: today.getFullYear().toString() });
      const clubRanksData: Array<ClubRankItemProps> = response.data.map(d => ({
        id: validateTeamId(getClubIdByNum(d.teamId)),
        rank: d.rank,
        gameCount: d.gameCount,
        winCount: d.winCount,
        drawCount: d.drawCount,
        loseCount: d.loseCount,
        gameDifference: Number(d.gameDiff),
        rankDifference: d.rankChange,
      }));

      setClubRanks(clubRanksData);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchHighlightUrl = async () => {
    try {
      // TODO: GET - 하이라이트 영상 TOP 1
      const highlightUrlData: string = "highlight video url";

      setHighlightUrl(highlightUrlData);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCards = async () => {
    try {
      // TODO: GET - 선수 포토카드 TOP 3
      // TODO: MOVE - 선수 포토카드마다 스토어 상세 페이지
      const cardsData: Array<CardStoreItemProps> = [
        {
          id: 1,
          url: "/src/assets/images/직관경기사진.jpeg",
          goDetail: () => console.log("1 직관경기사진으로 이동"),
        },
        {
          id: 2,
          url: "/src/assets/images/직관경기사진.jpeg",
          goDetail: () => console.log("2 직관경기사진으로 이동"),
        },
        {
          id: 3,
          url: "/src/assets/images/직관경기사진.jpeg",
          goDetail: () => console.log("3 직관경기사진으로 이동"),
        },
      ];

      setCards(cardsData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTodayGame();
    fetchImage();
    fetchClubRanks();
    fetchHighlightUrl();
    fetchCards();
  }, []);

  const goGameScheduleMore = () => {
    nav("/game/schedule");
  };

  const goPhotoCardMore = () => {
    // TODO: MOVE - 나의 포토카드 페이지
    console.log("나의 포토카드 페이지로 이동");
  };

  const goWatchedGameMore = () => {
    // TODO: MOVE - 나의 직관경기 페이지
    console.log("나의 직관경기 페이지로 이동");
  };

  const goCardStoreMore = () => {
    nav("/cardstore");
  };

  const todayGameProps: TodayGameProps = {
    hasCheeringClub,
    todayGame,
    goMore: goGameScheduleMore,
  };

  const imageCardProps: ImageCardProps = {
    photoCardImage,
    watchedGameImage,
    goPhotoCardMore,
    goWatchedGameMore,
  };

  const clubRankProps: ClubRankProps = {
    clubRankItems: clubRanks,
  };

  const highlightProps: HighlightProps = {
    url: highlightUrl,
  };

  const cardStoreProps: CardStoreProps = {
    cardStoreItems: cards,
    goMore: goCardStoreMore,
  };

  return (
    <HomeComponent
      todayGameProps={todayGameProps}
      imageCardProps={imageCardProps}
      clubRankProps={clubRankProps}
      highlightProps={highlightProps}
      cardStoreProps={cardStoreProps}
    />
  );
};

export default Home;
