import {
  BarChart as BC,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartProps, clubColors } from "./LineChart";

const BarChart = <T,>(props: ChartProps<T>) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BC data={props.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis domain={[props.minY, props.maxY]} />
        <Tooltip />
        <Bar dataKey="value" fill={clubColors[props.clubId ? props.clubId : "#1E633F"]} />
      </BC>
    </ResponsiveContainer>
  );
};

export default BarChart;
