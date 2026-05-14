import { useEffect, useState } from "react";
import Doanhthu from "../../component/doanhthu/Doanhthu";
import Doanhthuthuonghieu from "../../component/doanhthu/Doanhthuthuonghieu";
import Donhangtheotrangthai from "../../component/doanhthu/Donhangtheotrangthai";
import Sanphambanchay from "../../component/doanhthu/Sanphambanchay";
function MainAdmin() {

    const [tongdoanhthu, setTongdoanhthu] = useState(null);
    const [tongnguoidung, setTongnguoidung] = useState(null);
    const [tongdonhang, setTongdonhang] = useState(null);
    const [tongdaban, setTongdaban] = useState(null);

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
    }, []);

    useEffect(()=>{
        fetch('https://backend-viv4.onrender.com/admin/tongdonhang')
        .then(res => res.json())
            .then(data => {
                setTongdonhang(data[0]);
            })
    }, []);

    useEffect(()=>{
        fetch('https://backend-viv4.onrender.com/admin/tongdaban')
        .then(res => res.json())
            .then(data => {
                setTongdaban(data[0]);
            })
    }, []);

    useEffect(() => {
        document.title = "Admin Dashboard - Lai Store";
    }, []);



    return (
        <div>
            <div className="dashboard_i">
                <div className="card">
                    💰 Tổng doanh thu:
                    <span>{Number(tongdoanhthu?.total_revenue || 0).toLocaleString('vi-VN')} đ</span>
                </div>
    
                <div className="card">
                    📦 Tổng đơn hàng:
                    <span>{Number(tongdonhang?.total_orders || 0)}</span>
                </div>
    
                <div className="card">
                    👤 Tổng người dùng:
                    <span>{Number(tongnguoidung?.tongnguoidung || 0)}</span>
                </div>
    
                <div className="card">
                    🛒 Tổng sản phẩm đã bán:
                    <span>{Number(tongdaban?.tongdaban || 0)}</span>
                </div>
            </div>
            <div className="charts_list">
                <Doanhthu/>
                <Doanhthuthuonghieu/>
            </div>
            <br />
            <div className="charts_list">
                <Donhangtheotrangthai/>
                <Sanphambanchay/>
            </div>
        </div>
    )
}
export default MainAdmin;