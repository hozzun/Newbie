import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Carousel from "../common/Carousel";
import PlayerRecordItem, { PlayerRecordItemProps } from "./PlayerRecordItem";
import { HitterRecords, PitcherRecords, PlayerRecordData } from "../../containers/player/Player";
import { useState } from "react";

interface PlayerRecordProps {
  clubId: string;
  label: string;
  items: Array<PlayerRecordItemProps> | null;
  data: PitcherRecords | HitterRecords | null;
}

interface ChatTypeProps {
  type: string;
  minY: number;
  maxY: number;
}

interface ChartProps extends ChatTypeProps {
  data: Array<PlayerRecordData>;
  clubId: string;
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

const chartType: Record<string, ChatTypeProps> = {
  earnedRunAverage: {
    type: "line",
    minY: 0,
    maxY: 150,
  },
  win: {
    type: "bar",
    minY: 0,
    maxY: 20,
  },
  lose: {
    type: "bar",
    minY: 0,
    maxY: 14,
  },
  save: {
    type: "bar",
    minY: 0,
    maxY: 44,
  },
  hold: {
    type: "bar",
    minY: 0,
    maxY: 38,
  },
  winningPercentage: {
    type: "area",
    minY: 0,
    maxY: 1,
  },
  hitsAllowed: {
    type: "bar",
    minY: 0,
    maxY: 210,
  },
  homeRunsAllowed: {
    type: "bar",
    minY: 0,
    maxY: 28,
  },
  baseOnBalls: {
    type: "bar",
    minY: 0,
    maxY: 100,
  },
  hitByPitch: {
    type: "bar",
    minY: 0,
    maxY: 22,
  },
  strikeOuts: {
    type: "bar",
    minY: 0,
    maxY: 224,
  },
  earnedRun: {
    type: "line",
    minY: 0,
    maxY: 92,
  },
  walksPlusHitsPerInningPitched: {
    type: "line",
    minY: 0,
    maxY: 15,
  },
  battingAverage: {
    type: "line",
    minY: 0,
    maxY: 1,
  },
  game: {
    type: "bar",
    minY: 0,
    maxY: 144,
  },
  plateAppearance: {
    type: "bar",
    minY: 0,
    maxY: 670,
  },
  atBat: {
    type: "bar",
    minY: 0,
    maxY: 589,
  },
  runs: {
    type: "bar",
    minY: 0,
    maxY: 143,
  },
  hits: {
    type: "bar",
    minY: 0,
    maxY: 202,
  },
  double: {
    type: "bar",
    minY: 0,
    maxY: 46,
  },
  triple: {
    type: "bar",
    minY: 0,
    maxY: 11,
  },
  homeRun: {
    type: "bar",
    minY: 0,
    maxY: 47,
  },
  totalBases: {
    type: "bar",
    minY: 0,
    maxY: 374,
  },
  runsBattedIn: {
    type: "area",
    minY: 0,
    maxY: 135,
  },
  sacrificeHit: {
    type: "bar",
    minY: 0,
    maxY: 24,
  },
  sacrificeFly: {
    type: "bar",
    minY: 0,
    maxY: 13,
  },
};

const PlayerAreaChart = (props: ChartProps) => {
  return (
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
        <YAxis domain={[props.minY, props.maxY]} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          stroke={clubColors[props.clubId ? props.clubId : "#1E633F"]}
          fill={clubColors[props.clubId ? props.clubId : "#1E633F"]}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const PlayerBarChart = (props: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={props.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis domain={[props.minY, props.maxY]} />
        <Tooltip />
        <Bar dataKey="value" fill={clubColors[props.clubId ? props.clubId : "#1E633F"]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const PlayerLineChart = (props: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
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
        <YAxis domain={[props.minY, props.maxY]} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke={clubColors[props.clubId ? props.clubId : "#1E633F"]}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const PlayerRecord = (props: PlayerRecordProps) => {
  const [isVisibleGraph, setIsVisibleGraph] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>();
  const [dataKey, setDataKey] = useState<string>("");

  const handleVisibleGraph = (key: string) => {
    if (dataKey === "" || dataKey === key || (!isVisibleGraph && dataKey !== key)) {
      setIsVisibleGraph(!isVisibleGraph);
    }

    setSelectedItem(key);
    setDataKey(key);
  };

  const renderChart = () => {
    if (!props.data || dataKey === "inningsPitched") {
      return;
    }

    const chartProps: ChartProps = {
      type: chartType[dataKey].type,
      data: props.data[dataKey],
      clubId: props.clubId,
      minY: chartType[dataKey].minY,
      maxY: chartType[dataKey].maxY,
    };

    switch (chartType[dataKey].type) {
      case "bar":
        return <PlayerBarChart {...chartProps} />;
      case "area":
        return <PlayerAreaChart {...chartProps} />;
      case "line":
        return <PlayerLineChart {...chartProps} />;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-8">
      <div className="flex justify-start w-full mb-3">
        <p className="text-2xl font-kbogothicbold text-gray-700">{props.label}</p>
      </div>
      {props.items ? (
        <Carousel
          itemCount={4}
          items={props.items}
          renderItem={item => (
            <PlayerRecordItem
              {...item}
              onClick={() => handleVisibleGraph(item.key)}
              isSelected={selectedItem === item.key}
            />
          )}
        />
      ) : (
        <p className="text-base font-kbogothiclight text-gray-700">이번 시즌 성적이 없습니다...</p>
      )}
      {props.data && isVisibleGraph && (
        <div className="mt-3 flex flex-col justify-center items-center w-full h-[260px] rounded-lg shadow-md bg-white py-6">
          {renderChart()}
        </div>
      )}
    </div>
  );
};

export default PlayerRecord;
