import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './chitietdonhang.css';

function Chitietdonhang() {
    const [chitietdonhang, setChitietdonhang] = useState([]);
    const { order_item_id } = useParams();
    const token = localStorage.getItem("token");
    useEffect(() => {
        fetch(`https://backend-viv4.onrender.com/order_status/chitietdonhang/${order_item_id}`)
            .then(res => res.json())
            .then(data => {
                setChitietdonhang(data);
            })
    }, [order_item_id]);
    return (
        <div className="chitietdonhang_container">
            <h1 className="chitietdonhang">Chi tiết đơn hàng</h1>
            {chitietdonhang.map(item=>(
                <div className="chitietdonhang_main">
                    <div className="chitietdonhang_left">
                        <div className="madon">
                            <div>Đơn hàng: <span className="madon_item">{item.order_code}</span></div>
                            <div>{new Date(item.created_at).toLocaleString("vi-VN")}</div>
                        </div>
                        <div className="ctsp_left_item">
                            <div className="ctdh_khachhang">
                                <div>Khách hàng</div>
                                <div></div>
                            </div>
                            <div className="ctdh_nguoinhan">
                                <div>Người nhận</div>
                                <div className="thongtinuserdh">
                                    <p>{item.hoten}</p>
                                    <p>{item.sdt}</p>
                                    <p>{item.diachi}</p>
                                </div>
                            </div>
                        </div>
                        <div >
                            <div className="tieudectdh">
                                <div>Sản phẩm</div>
                                <div>Số lượng</div>
                                <div>Đơn giá</div>
                                <div>Tổng tiền</div>
                            </div>
                            <div className="spctdh">
                                <div><img src={`/${item.image_url}`} alt="" style={{maxWidth: "100px", aspectRatio: 1/1, border: "1px solid gray"}}/>{item.product_name}</div>
                                <div>{item.soluong_sp}</div>
                                <div>{Number(item.price).toLocaleString()} đ</div>
                                <div className="tongtien">{Number(item.tongtien).toLocaleString()}đ</div>
                            </div>
                        </div>
                    </div>
                    <div className="chitietdonhang_right"></div>
                </div>
            ))}
        </div>
    )
}
export default Chitietdonhang;