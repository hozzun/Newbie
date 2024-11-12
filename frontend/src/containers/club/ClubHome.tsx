import { useEffect, useState } from "react";
import { GetClubRanksRequest, getClubRanks } from "../../api/baseballApi";
import ClubHomeComponent from "../../components/club/ClubHome";
import { getClubIdByNum } from "../../util/ClubId";
import axios from "axios";
import { ClubOverviewProps } from "../../components/club/ClubOverview";

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

const ClubHome = () => {
  const today = new Date();

  const [clubOverview, setClubOverview] = useState<ClubOverviewData | null>(null);

  const fetchClubOverview = async () => {
    try {
      const getClubOverviewRequest: GetClubRanksRequest = {
        year: today.getFullYear().toString(),
        teamId: 1, // TODO: GET - 사용자 응원 구단 ID
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
        console.log("[ERROR] 구단 간단한 소개 정보 없음 by club home");
        setClubOverview(null);
      } else {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    fetchClubOverview();
  }, []);

  const handleRegisterCheerClub = () => {
    // TODO: PATCH - 해당 구단 응원 구단으로 등록
    console.log("해당 구단 응원 구단으로 등록");
  };

  const clubOverviewProps: ClubOverviewProps = {
    clubOverviewData: clubOverview,
    isVisibleButton: true,
    handleRegisterCheerClub: handleRegisterCheerClub,
  };

  return <ClubHomeComponent clubOverviewProps={clubOverviewProps} />;
};

export default ClubHome;
