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
import { GetWeatherRequest, GetWeatherResponse, getWeather } from "../../api/weatherApi";

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

interface GeoPoint {
  logitude: number;
  latitude: number;
}

const stadiums: Record<string, GeoPoint> = {
  잠실: {
    logitude: 37.512011,
    latitude: 127.071619,
  },
  고척: {
    logitude: 37.498229,
    latitude: 126.866836,
  },
  문학: {
    logitude: 37.436962,
    latitude: 126.693254,
  },
  수원: {
    logitude: 37.299585,
    latitude: 127.009526,
  },
  청주: {
    logitude: 36.638676,
    latitude: 127.470008,
  },
  대전: {
    logitude: 36.316982,
    latitude: 127.429025,
  },
  광주: {
    logitude: 35.168194,
    latitude: 126.889385,
  },
  대구: {
    logitude: 35.84104,
    latitude: 128.681774,
  },
  포항: {
    logitude: 36.007952,
    latitude: 129.359549,
  },
  울산: {
    logitude: 35.532037,
    latitude: 129.265693,
  },
  창원: {
    logitude: 35.222439,
    latitude: 128.582573,
  },
  사직: {
    logitude: 35.193742,
    latitude: 129.061572,
  },
};

const pty: Record<number, string> = {
  1: "🌧 비",
  2: "🌨 비/눈",
  3: "🌨 눈",
  4: "⛈ 소나기",
};

const sky: Record<number, string> = {
  1: "☀ 맑음",
  2: "🌥 구름많음",
  3: "☁ 흐림",
};

const validateTeamId = (teamId: string | undefined) => {
  if (!teamId) {
    throw new CustomError("[ERROR] 구단 ID 변환 과정 by HOME");
  }

  return teamId;
};

const getFcstTime = (): string => {
  const today = new Date();

  const hours = today.getHours() + 1;

  return `${hours.toString().padStart(2, "0")}00`;
};

const calculateWeather = (items: Array<GetWeatherResponse>): string => {
  let ptyItem = null;
  let skyItem = null;

  const targetTime = getFcstTime();
  for (const item of items) {
    if (item.fcstTime === targetTime) {
      if (item.category === "PTY") {
        ptyItem = item;
      } else if (item.category === "SKY") {
        skyItem = item;
      }
    }
  }

  if (ptyItem && parseInt(ptyItem.fcstValue) > 0) {
    return pty[parseInt(ptyItem.fcstValue)];
  } else if (skyItem) {
    return sky[parseInt(skyItem.fcstValue)];
  } else {
    throw new CustomError("[ERROR] 날씨 데이터 토대로 계산 by HOME");
  }
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
          month: (today.getMonth() + 1).toString().padStart(2, "0"),
          day: today.getDate().toString().padStart(2, "0"),
          teamId: 1, // TODO: 나의 응원 구단 ID 구하기
        };
        const responseAbotGetGames = await getGames(getGamesRequest);
        const homeTeamId = validateTeamId(getClubIdByNum(responseAbotGetGames.data.homeTeamId));
        const awayTeamId = validateTeamId(getClubIdByNum(responseAbotGetGames.data.awayTeamId));
        const gameInfoData: GameInfo = {
          day: responseAbotGetGames.data.date,
          time: responseAbotGetGames.data.time,
          place: responseAbotGetGames.data.stadium,
          clubs: [
            {
              id: homeTeamId,
              player: responseAbotGetGames.data.homeStartingPitcher,
            },
            {
              id: awayTeamId,
              player: responseAbotGetGames.data.awayStartingPitcher,
            },
          ],
        };

        const getWeatherRequest: GetWeatherRequest = {
          nx: stadiums[gameInfoData.place].logitude,
          ny: stadiums[gameInfoData.place].latitude,
        };
        const responseAboutWeather = await getWeather(getWeatherRequest);
        const items = responseAboutWeather.data.response.body.items.item;
        gameInfoData.weather = calculateWeather(items);

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
