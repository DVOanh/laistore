import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./orderStatus.css";
function OrderStatus() {
    const [order, setOrder] = useState([]);
    const token = localStorage.getItem("token");
    const { status_id } = useParams();
    useEffect(() => {
        let url = 'https://backend-production-f0ff.up.railway.app/order';
        if(status_id){
            url += `?status_id=${status_id}`;
        }
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                    return;
                }
                return res.json();
            })
            .then((data) => {
                console.log("Data order:", data);
                setOrder(data);
            });
    }, [status_id, token]);
    function renderAction(status) {
        switch (status) {
            case 6: // Chờ xác nhận
                return (
                    <div className="btn">
                        <button className="btnorder huydon">Hủy đơn</button>
                        <button className="btnorder xemchitiet">Xem chi tiết</button>
                    </div>
                );

            case 7: // Đã xác nhận
                return (
                    <div className="btn">
                        <button className="btnorder huydon">Hủy đơn</button>
                        <button className="btnorder xemchitiet">Xem chi tiết</button>
                    </div>
                );

            case 8: // Đang giao
                return (
                    <div className="btn">
                        <button className="btnorder theodoi">Theo dõi</button>
                        <button className="btnorder xemchitiet">Xem chi tiết</button>
                    </div>
                );

            case 9: // Hoàn thành
                return (
                    <div className="btn">
                        <button className="btnorder mualai">Mua lại</button>
                        <button className="btnorder danhgia">Đánh giá</button>
                    </div>
                );

            case 10: // Đã hủy
                return (
                    <div className="btn">
                        <button className="btnorder datlai">Đặt lại</button>
                    </div>
                );

            default:
                return null;
        }
    }
    return (
        <div className="order_list">
            {order.map((item) => (
                <div className="order_item">
                    <div className="order_product">
                        <img src={`/${item.image_url}`} className="image_order"/>
                        <div className="info_order">
                            <p className="productname_order">{item.product_name}</p>
                            <div className="phanloai">
                                <p>Phân loại: RAM {item.ram}</p>
                                <p>x{item.soluong_sp}</p>
                            </div>
                        </div>
                        
                    </div>
                    <p className="price_order">Tổng số tiền ({item.soluong_sp} sản phẩm): <span style={{fontWeight: "600"}}>{Number(item.tongtien).toLocaleString("vi-VN")}đ</span></p>
                    <div className="action_order">{renderAction(item.status_id)}</div>
                </div>
            ))}
        </div>
    );
}

export default OrderStatus;
