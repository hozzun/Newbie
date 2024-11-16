import {
  AreaChart as AC,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartProps, clubColors } from "./LineChart";

const AreaChart = <T,>(props: ChartProps<T>) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AC
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
      </AC>
    </ResponsiveContainer>
  );
};

export default AreaChart;
