import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function Doanhthu() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`https://backend-viv4.onrender.com/order/doanhthu7ngay`)
            .then(res => res.json())
            .then(data => {
                setData(data);
                
            })
    }, []);
    return (
        <div style={{ width: '100%', height: '400px', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h4>Doanh thu các ngày gần nhất</h4>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="date"
                        tickFormatter={(tick) => {
                            const date = new Date(tick);
                            return date
                                ? `${date.getDate()}/${date.getMonth() + 1}`
                                : tick;
                        }}
                        interval={0}
                    />
                    <YAxis
                        tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
                        width={60}
                        domain={['auto', 'auto']} // Để biểu đồ tự căn chỉnh theo số lớn nhất
                    />
                    <Tooltip
                        // 1. Sửa định dạng ngày trên đầu Tooltip
                        labelFormatter={(label) => {
                            const date = new Date(label);
                            return `Ngày: ${date.getDate()}/${date.getMonth() + 1}`;
                        }}
                        // 2. Sửa định dạng số tiền bên trong Tooltip
                        formatter={(value) => {
                            return [new Intl.NumberFormat('vi-VN').format(value) + ' đ', "Doanh thu"];
                        }}
                        // Thêm style cho đẹp và dễ nhìn hơn
                        contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.2}
                        strokeWidth={3}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Doanhthu;