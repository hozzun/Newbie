import { useState, useEffect } from "react";
import HomeComponent from "../../components/home/Home";
import {
  Game,
  GameSituation,
  GameAboutCheeringClub,
  TodayGameProps,
} from "../../components/home/TodayGame";
import { ImageCardProps } from "../../components/home/ImageCard";
import { ClubRankProps } from "../../components/home/ClubRank";
import { ClubRankItemProps } from "../../components/home/ClubRankItem";

const Home = () => {
  const [hasCheeringClub, setHasCheeringClub] = useState<boolean>(false);
  const [todayGame, setTodayGame] = useState<GameAboutCheeringClub>();
  const [photoCardImage, setPhotoCardImage] = useState<string | null>(null);
  const [watchedGameImage, setWatchedGameImage] = useState<string | null>(null);
  const [clubRanks, setClubRanks] = useState<Array<ClubRankItemProps> | null>(null);

  const fetchTodayGame = async () => {
    try {
      // TODO: GET - 응원 구단 여부
      const hasCheeringClubData: boolean = true;
      setHasCheeringClub(hasCheeringClubData);

      if (hasCheeringClubData) {
        // TODO: GET - 응원 구단에 맞는 오늘의 경기
        const gameData: Game = {
          time: "17:00",
          place: "광주스타디움",
          clubs: [
            {
              id: "samsung",
              player: "이재익",
            },
            {
              id: "kia",
              player: "곽도규",
            },
          ],
        };

        // TODO: GET - 경기 진행 상황
        const gameSituationData: GameSituation = {
          isPlaying: true,
          scores: {
            samsung: 2,
            kia: 1,
          },
        };

        const todayGameData: GameAboutCheeringClub = {
          game: gameData,
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
      //TODO: GET - 구단 랭킹
      const clubRanksData: Array<ClubRankItemProps> = [
        {
          id: "kia",
          rank: 1,
          gameCount: 144,
          winCount: 87,
          drawCount: 2,
          loseCount: 55,
          gameDifference: 0,
          rankDifference: 0,
        },
        {
          id: "samsung",
          rank: 2,
          gameCount: 144,
          winCount: 78,
          drawCount: 2,
          loseCount: 64,
          gameDifference: 9,
          rankDifference: 1,
        },
        {
          id: "lg",
          rank: 3,
          gameCount: 144,
          winCount: 76,
          drawCount: 2,
          loseCount: 66,
          gameDifference: 11,
          rankDifference: -1,
        },
        {
          id: "doosan",
          rank: 4,
          gameCount: 144,
          winCount: 74,
          drawCount: 2,
          loseCount: 68,
          gameDifference: 13,
          rankDifference: 0,
        },
        {
          id: "kt",
          rank: 5,
          gameCount: 144,
          winCount: 72,
          drawCount: 2,
          loseCount: 70,
          gameDifference: 15,
          rankDifference: 0,
        },
        {
          id: "ssg",
          rank: 6,
          gameCount: 144,
          winCount: 72,
          drawCount: 2,
          loseCount: 70,
          gameDifference: 15,
          rankDifference: -1,
        },
        {
          id: "lotte",
          rank: 7,
          gameCount: 144,
          winCount: 66,
          drawCount: 4,
          loseCount: 74,
          gameDifference: 20,
          rankDifference: 0,
        },
        {
          id: "hanhwa",
          rank: 8,
          gameCount: 144,
          winCount: 66,
          drawCount: 2,
          loseCount: 76,
          gameDifference: 21,
          rankDifference: 1,
        },
        {
          id: "nc",
          rank: 9,
          gameCount: 144,
          winCount: 61,
          drawCount: 2,
          loseCount: 81,
          gameDifference: 26,
          rankDifference: -1,
        },
        {
          id: "kiwoom",
          rank: 10,
          gameCount: 144,
          winCount: 58,
          drawCount: 0,
          loseCount: 86,
          gameDifference: 30,
          rankDifference: 0,
        },
      ];

      setClubRanks(clubRanksData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTodayGame();
    fetchImage();
    fetchClubRanks();
  }, []);

  const goGameScheduleMore = () => {
    // TODO: MOVE - 경기 일정 페이지
    console.log("경기 일정 페이지로 이동");
  };

  const goPhotoCardMore = () => {
    // TODO: MOVE - 나의 포토카드 페이지
    console.log("나의 포토카드 페이지로 이동");
  };

  const goWatchedGameMore = () => {
    // TODO: MOVE - 나의 직관경기 페이지
    console.log("나의 직관경기 페이지로 이동");
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

  return (
    <HomeComponent
      todayGameProps={todayGameProps}
      imageCardProps={imageCardProps}
      clubRankProps={clubRankProps}
    />
  );
};

export default Home;
