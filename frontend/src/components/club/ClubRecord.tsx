import { useState } from "react";
import { ClubRecord as ClubRecordData, ClubRecords } from "../../containers/club/ClubHome";
import AreaChart from "../common/AreaChart";
import BarChart from "../common/BarChart";
import LineChart, { ChartProps, ChartTypeProps } from "../common/LineChart";
import ClubRecordItem, { ClubRecordItemProps } from "./ClubRecordItem";

export interface ClubRecordProps {
  clubId: string | null;
  items: Array<ClubRecordItemProps> | null;
  data: ClubRecords | null;
}

const chartType: Record<string, ChartTypeProps> = {
  earnedRunAverage: {
    type: "line",
    minY: 0,
    maxY: 6.0,
  },
  strikeOuts: {
    type: "bar",
    minY: 0,
    maxY: 1500,
  },
  baseOnBalls: {
    type: "bar",
    minY: 0,
    maxY: 800,
  },
  walksPlusHitsPerInningPitched: {
    type: "area",
    minY: 0.5,
    maxY: 2.0,
  },
  battingAverage: {
    type: "line",
    minY: 0.2,
    maxY: 0.4,
  },
  runs: {
    type: "bar",
    minY: 0,
    maxY: 1000,
  },
  hits: {
    type: "bar",
    minY: 0,
    maxY: 1700,
  },
  homeRun: {
    type: "bar",
    minY: 0,
    maxY: 230,
  },
};

const ClubRecord = (props: ClubRecordProps) => {
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
    if (!props.data || !props.clubId) {
      return;
    }

    const chartProps: ChartProps<ClubRecordData> = {
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
    <div className="flex flex-col mt-2">
      {props.items ? (
        <div className="grid grid-cols-4 gap-3 w-full">
          {props.items.map(item => {
            const { key, ...itemProps } = item;

            return (
              <ClubRecordItem
                key={key}
                {...itemProps}
                onClick={() => handleVisibleGraph(item.key)}
                isSelected={selectedItem === key}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-base font-kbogothicmedium text-gray-700">구단 성적이 없습니다...😥</p>
      )}
      {props.data && isVisibleGraph && (
        <div className="mt-3 flex flex-col justify-center items-center w-full h-[260px] rounded-lg shadow-md bg-white py-6">
          {renderChart()}
        </div>
      )}
    </div>
  );
};

export default ClubRecord;
