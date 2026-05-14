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
        fetch(`https://backend-viv4.onrender.com/admin/doanhthuthuonghieu`)
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
    }, []);
    return (
        <div style={{ width: '100%', height: 400, backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Doanh Thu Theo Thương Hiệu</h3>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart 
                    data={data} 
                    margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    
                    {/* dataKey phải trùng với tên cột trong SQL của bạn (ví dụ: brand_name) */}
                    <XAxis dataKey="brand_name" /> 
                    
                    <YAxis tickFormatter={(value) => `${(value / 1000000).toLocaleString()}M`} />
                    
                    <Tooltip 
                        formatter={(value) => Number(value).toLocaleString("vi-VN")+"đ"} 
                        cursor={{ fill: '#f5f5f5' }} 
                    />
                    <Legend />
                    
                    {/* dataKey trùng với tên cột doanh thu trong SQL (ví dụ: total_revenue) */}
                    <Bar dataKey="total_revenue" name="Doanh thu" radius={[4, 4, 0, 0]} barSize={40}>
                        {data.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'][index % 5]} 
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Doanhthuthuonghieu;