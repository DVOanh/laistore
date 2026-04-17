import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export function TopProductChart({ data }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3>Sản phẩm bán chạy</h3>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sold" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}