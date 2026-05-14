import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Legend
} from "recharts";

function Doanhthuthuonghieu() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`https://backend-viv4.onrender.com/admin/spbanchay`)
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
    }, []);
    return (
        <div style={{ width: '100%', height: 400, backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>5 sản phẩm bán chạy nhất</h3>
            <BarChart
                layout="vertical"
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis type="number" tick={{ fill: "#666", fontSize: 12 }} />

                <YAxis
                    type="category"
                    dataKey="product_name"
                    width={150}
                    tick={{ fill: "#333", fontSize: 13 }}
                />

                <Tooltip />

                <Bar dataKey="total_sold" fill="#8884d8" radius={[0, 10, 10, 0]} />
            </BarChart>
        </div>
    )
}

export default Doanhthuthuonghieu;