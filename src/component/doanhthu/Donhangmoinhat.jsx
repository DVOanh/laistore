import { useEffect, useState } from "react";
function Doanhthu() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`https://backend-viv4.onrender.com/admin/donhangmoinhat`)
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
    }, []);
    return (

        <div className="table-container">
            <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>Danh sách đơn hàng cần xác nhận</h3>
            {data.length === 0 ? (
                <p>Hôm nay chưa có đơn nào cả</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Khách hàng</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Ngày tạo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td style={{ color: '#3182ce', fontWeight: 'bold' }}>{item.order_code}</td>
                                <td>{item.hoten}</td>
                                <td>{Number(item.tongtien).toLocaleString()}đ</td>
                                <td>
                                    {/* Thêm một span để làm badge cho trạng thái */}
                                    <span className={`status-badge ${item.status_id === 1 ? 'status-done' : 'status-pending'}`}>
                                        {item.status_name}
                                    </span>
                                </td>
                                <td>{new Date(item.created_at).toLocaleDateString("vi-VN")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            )}
        </div>
    )
}

export default Doanhthu;