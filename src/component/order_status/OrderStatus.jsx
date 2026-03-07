import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./orderStatus.css";
function OrderStatus() {
    const [order, setOrder] = useState([]);
    const token = localStorage.getItem("token");
    const { status_id } = useParams();
    useEffect(() => {
        let url = 'https://backend-production-63ce7.up.railway.app/order';
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
                    <>
                        <button>Hủy đơn</button>
                        <button>Xem chi tiết</button>
                    </>
                );

            case 7: // Đã xác nhận
                return (
                    <>
                        <button>Hủy đơn</button>
                        <button>Xem chi tiết</button>
                    </>
                );

            case 8: // Đang giao
                return (
                    <>
                        <button>Theo dõi</button>
                        <button>Xem chi tiết</button>
                    </>
                );

            case 9: // Hoàn thành
                return (
                    <>
                        <button>Mua lại</button>
                        <button>Đánh giá</button>
                    </>
                );

            case 10: // Đã hủy
                return (
                    <>
                        <button>Đặt lại</button>
                    </>
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
                        <div>
                            <p className="productname_order">{item.product_name}</p>
                            <p>RAM {item.ram}</p>
                            <p>x{item.soluong_sp}</p>
                        </div>
                        <h1 className="price_order">{Number(item.tongtien).toLocaleString("vi-VN")} đ</h1>
                    </div>
                    <div className="action_order">{renderAction(item.status_id)}</div>
                </div>
            ))}
        </div>
    );
}

export default OrderStatus;
