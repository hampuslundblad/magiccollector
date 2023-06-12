import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export type PriceChartProps = {
  priceHistory : [{
    price: string,
    date: string,
  }]
}

const fallback  = [
  { date: "01/01-22", price: "400" },
  { date: "01/01-22", price: "500" },
  { date: "01/01-22", price: "800" },
  { date: "01/01-22", price: "300" },
  { date: "01/01-22", price: "400" },
];

const PriceChart = ({priceHistory} : PriceChartProps) => {
  let data = priceHistory ? priceHistory : fallback
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="price" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default PriceChart;
