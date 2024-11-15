import {
  LineChart as LC,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface ChatTypeProps {
  type: string;
  minY: number;
  maxY: number;
}

export interface ChartProps<T> extends ChatTypeProps {
  data: Array<T>;
  clubId: string;
}

export const clubColors: Record<string, string> = {
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

const LineChart = <T,>(props: ChartProps<T>) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LC
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
      </LC>
    </ResponsiveContainer>
  );
};

export default LineChart;
