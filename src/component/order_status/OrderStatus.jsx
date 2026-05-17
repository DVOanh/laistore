import { useEffect, useState } from "react";
import { useParams, useNavigate, data } from "react-router-dom";
import "./orderStatus.css";
import Loading from "../loading/Loading";
import { jwtDecode } from "jwt-decode";
function OrderStatus() {
    const [order, setOrder] = useState([]);
    const [order_item, setOrder_item] = useState([]);
    const token = localStorage.getItem("token");
    const { status_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [modalDanhgia, setModaldanhgia] = useState(false);
    const decode = jwtDecode(token);
    const navigate = useNavigate();
    function fetchOrder() {

        setLoading(true);
        let url = 'https://backend-viv4.onrender.com/order';

        if (status_id) {
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
                setLoading(false);
            });

    }
    useEffect(() => {
        fetchOrder();
    }, [status_id, token]);


    function trangthaidonhang(status) {
        switch (status) {
            case 6:
                return (<h1 className="status_name choxacnhan">Chờ xác nhận</h1>);
            case 7:
                return (<h1 className="status_name daxacnhan">Đã xác nhận</h1>);
            case 8:
                return (<h1 className="status_name danggiao">Đang giao</h1>);
            case 9:
                return (<h1 className="status_name hoanthanh">Hoàn thành</h1>);
            case 10:
                return (<h1 className="status_name dahuy">Đã hủy</h1>);
        }
    }

    function xemchitiet(order_item_id) {
        navigate(`/order_item/${order_item_id}`);
    }

    function openModalDanhgia(order_id) {
        fetch(`https://backend-viv4.onrender.com/order/order_item/${order_id}`)
            .then(res => res.json())
            .then(data => {
                setOrder_item(data)
            })
        setModaldanhgia(true)
    }

    function huydon(order_item_id, order_id, soluong_sp, variant_id) {
        if (confirm("Bạn có chắc chắn hủy đơn hàng này")) {
            fetch("https://backend-viv4.onrender.com/order/huydon", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    order_item_id: order_item_id,
                    order_id: order_id,
                    soluong_sp: soluong_sp,
                    variant_id: variant_id
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    alert(data.message);
                    fetchOrder();
                })
        }

    }

    function renderAction(status, order_item_id, order_id, soluong_sp, variant_id) {
        switch (status) {
            case 6: // Chờ xác nhận
                return (
                    <div className="btn">
                        <button className="btnorder huydon" onClick={() => huydon(order_item_id, order_id, soluong_sp, variant_id)}>Hủy đơn</button>
                        <button className="btnorder xemchitiet" onClick={() => xemchitiet(order_item_id)}>Xem chi tiết</button>
                    </div>
                );

            case 7: // Đã xác nhận
                return (
                    <div className="btn">
                        <button className="btnorder mualai">Mua lại</button>
                        <button className="btnorder xemchitiet" onClick={() => xemchitiet(order_item_id)}>Xem chi tiết</button>
                    </div>
                );

            case 8: // Đang giao
                return (
                    <div className="btn">
                        <button className="btnorder theodoi">Theo dõi</button>
                        <button className="btnorder xemchitiet" onClick={() => xemchitiet(order_item_id)}>Xem chi tiết</button>
                    </div>
                );

            case 9: // Hoàn thành
                return (
                    <div className="btn">
                        <button className="btnorder mualai">Mua lại</button>
                        <button className="btnorder danhgia" onClick={() => openModalDanhgia(order_id)}>Đánh giá</button>
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
            {
                modalDanhgia && (
                    <div className="overlay">
                        <div className="modaldanhgia">
                            <button className="close-btn" onClick={() => setModaldanhgia(false)}>
                                ✕
                            </button>
                            {order_item.map(item => (
                                <div key={item.order_item_id} className="item">

                                    <img src={`/${item.image_url}`} width={60} />

                                    <div>
                                        <p>{item.product_name}</p>
                                        <p>Số lượng: {item.soluong_sp}</p>
                                        <p>Giá: {Number(item.price).toLocaleString("vi-VN")}đ</p>
                                    </div>

                                    <button onClick={() => review(item.order_item_id)}>
                                        Đánh giá
                                    </button>

                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
            {loading ?
                (<Loading />)
                :
                !order || order.length === 0 ?
                    (
                        <div className="kocodonhang">
                            <div className="no_order"><img src="/no_order.jpg" alt="" /></div>
                            <p>Chưa có đơn hàng</p>
                        </div>
                    )
                    :
                    order.map((item) => (
                        <div className="order_item">
                            <div className="tentrangthaidonhang">{trangthaidonhang(item.status_id)}</div>
                            <div className="order_product">
                                <img src={`/${item.image_url}`} className="image_order" />
                                <div className="info_order">
                                    <p className="productname_order">{item.product_name}</p>
                                    <div className="phanloai">
                                        <p>Phân loại: RAM {item.ram}, Storage {item.storage}</p>
                                        <p>x{item.soluong_sp}</p>
                                    </div>
                                </div>

                            </div>
                            <p className="price_order">Tổng số tiền ({item.soluong_sp} sản phẩm): <span style={{ fontWeight: "600" }}>{Number(item.tongtien).toLocaleString("vi-VN")}đ</span></p>
                            <div className="action_order">{renderAction(item.status_id, item.order_item_id, item.order_id, item.soluong_sp, item.variant_id)}</div>
                        </div>
                    ))}
        </div>
    );
}

export default OrderStatus;
