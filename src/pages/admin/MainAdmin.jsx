import { useEffect, useState } from "react";

function MainAdmin() {

    const [tongdoanhthu, setTongdoanhthu] = useState(null);
    const [tongnguoidung, setTongnguoidung] = useState(null);

    useEffect(() => {
        fetch('https://backend-viv4.onrender.com/admin/tongdoanhthu')
            .then(res => res.json())
            .then(data => {
                setTongdoanhthu(data[0]);
            })
    }, []);

    useEffect(()=>{
        fetch('https://backend-viv4.onrender.com/user/tongnguoidung')
        .then(res => res.json())
            .then(data => {
                setTongnguoidung(data[0]);
            })
    })

    useEffect(() => {
        document.title = "Admin Dashboard - Lai Store";
    }, []);



    return (
        <div className="dashboard_i">
            <div className="card">
                💰 Tổng doanh thu:
                <span>{Number(tongdoanhthu?.total_revenue || 0).toLocaleString('vi-VN')} đ</span>
            </div>

            <div className="card">
                📦 Tổng đơn hàng:
                <span>0</span>
            </div>

            <div className="card">
                👤 Tổng người dùng:
                <span>{Number(tongnguoidung?.tongnguoidung || 0)}</span>
            </div>

            <div className="card">
                🛒 Tổng sản phẩm đã bán:
                <span>0</span>
            </div>
        </div>
    )
}
export default MainAdmin;