import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ClubRank } from "../../containers/club/ClubHome";

export interface ClubRankHistoryProps {
  clubId: string | undefined;
  clubRankHistoryData: Array<ClubRank> | null;
}

interface RankHistoryProps {
  clubId: string | undefined;
  data: Array<ClubRank>;
}

const clubColors: Record<string, string> = {
  kia: "#333333",
  samsung: "#074CA1",
  lg: "#C60C30",
  doosan: "#00234B",
  kt: "#231F20",
  ssg: "#D2323F",
  lotte: "#032C64",
  hanwha: "#FF6600",
  nc: "#063E7D",
  kiwoom: "#6F263D",
};

const NoRankHistory = () => {
  return (
    <div className="mt-3 flex flex-col justify-center items-center w-full rounded-lg shadow-md bg-white aspect-[2.5/1]">
      역대 시즌 순위가 없습니다...😥
    </div>
  );
};

const YesRankHistory = (props: RankHistoryProps) => {
  return (
    <div className="mt-3 flex flex-col justify-center items-center w-full h-[260px] rounded-lg shadow-md bg-white py-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={props.data}
          margin={{
            top: 10,
            right: 40,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis domain={[1, 10]} reversed={true} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="rank"
            stroke={clubColors[props.clubId ? props.clubId : "#1E633F"]}
            fill={clubColors[props.clubId ? props.clubId : "#1E633F"]}
            baseValue={10}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const ClubRankHistory = (props: ClubRankHistoryProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full mt-8">
      <div className="flex justify-start w-full">
        <p className="text-2xl font-kbogothicbold text-gray-700">역대 시즌 순위</p>
      </div>
      {props.clubRankHistoryData ? (
        <YesRankHistory clubId={props.clubId} data={props.clubRankHistoryData} />
      ) : (
        <NoRankHistory />
      )}
    </div>
  );
};

export default ClubRankHistory;
