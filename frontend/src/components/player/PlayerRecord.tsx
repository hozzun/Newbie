import Carousel from "../common/Carousel";
import PlayerRecordItem, { PlayerRecordItemProps } from "./PlayerRecordItem";
import { HitterRecords, PitcherRecords, PlayerRecordData } from "../../containers/player/Player";
import { useState } from "react";
import LineChart, { ChartProps, ChatTypeProps } from "../common/LineChart";
import BarChart from "../common/BarChart";
import AreaChart from "../common/AreaChart";

interface PlayerRecordProps {
  clubId: string;
  label: string;
  items: Array<PlayerRecordItemProps> | null;
  data: PitcherRecords | HitterRecords | null;
}

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

    const chartProps: ChartProps<PlayerRecordData> = {
      type: chartType[dataKey].type,
      data: props.data[dataKey],
      clubId: props.clubId,
      minY: chartType[dataKey].minY,
      maxY: chartType[dataKey].maxY,
    };

    switch (chartType[dataKey].type) {
      case "bar":
        return <BarChart {...chartProps} />;
      case "area":
        return <AreaChart {...chartProps} />;
      case "line":
        return <LineChart {...chartProps} />;
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
