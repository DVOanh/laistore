import React, { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
function Donhangtheotrangthai() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`https://backend-viv4.onrender.com/admin/sldontheotrangthai`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
    }, []);
    const STATUS_COLORS = {
        "Hoàn thành": "#149600", // Xanh lá
        "Chờ xác nhận": "#ffae00", // Vàng
        "Đang giao hàng": "#0088FE", // Xanh dương
        "Đã hủy": "#e00000", // Cam/Đỏ
    };
    // Hàm để render label phần trăm bên trong hoặc bên ngoài miếng bánh
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const RADIAN = Math.PI / 180;

        // Hệ số 0.5 giúp chữ nằm chính giữa độ dày của cung tròn
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    pointerEvents: 'none' // Tránh việc chữ đè lên tooltip khi di chuột
                }}
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    if (!data || data.length === 0) {
        return <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Đang tải dữ liệu...</div>;
    }
    return (
        <div
            style={{
                width: "100%",
                height: 400,
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
        >
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
                Tỷ Lệ Trạng Thái Đơn Hàng
            </h3>
            <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        innerRadius={65} // Thu nhỏ lỗ một chút
                        outerRadius={120} // Thu nhỏ vòng ngoài một chút để chữ không bị tràn
                        paddingAngle={3}
                        dataKey="total_orders"
                        nameKey="status_name" // QUAN TRỌNG: Để hiện tên trạng thái ở Legend
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={STATUS_COLORS[entry.status_name] || "#8884d8"}
                            />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} đơn hàng`, "Số lượng"]} />
                    {/* Legend sẽ tự động lấy nameKey="status" để hiển thị */}
                    <Legend iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
export default Donhangtheotrangthai;
