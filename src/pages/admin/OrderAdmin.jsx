import { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";

function OrderAdmin() {
    const [orders, setOrders] = useState([]);
    const [viewmodal, setViewmodal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orderDetail, setOrderDetail] = useState(null);
    const [order_status, setOrder_status] = useState([]);
    const [selected_status_id, setSelected_Status_id] = useState("")
    const [vieworder, setVieworder] = useState(false);
    const [order_id_view, setOrder_id_view] = useState("");
    const [order_item, setOrder_item] = useState([]);
    useEffect(() => {
        document.title = "Quản lý đơn hàng";
    }, []);
    useEffect(() => {
        fetch("https://backend-viv4.onrender.com/admin/orders")
            .then(res => res.json())
            .then(data => {
                setOrders(data)
            })
    }, []);

    useEffect(() => {
        fetch("https://backend-viv4.onrender.com/order_status")
            .then(res => res.json())
            .then(data => {
                setOrder_status(data);
            });
    }, []);

    async function capnhatdonhang(order_id) {
        const res = await fetch(`https://backend-viv4.onrender.com/order/${order_id}`);
        const chitietdonhang = await res.json();
        setOrderDetail(chitietdonhang[0])
        setViewmodal(true);
        setSelectedOrderId(order_id)
        setSelected_Status_id(orderDetail[0].status_id)
    }

    function close() {
        setViewmodal(false)
        if (orderDetail) {
            setSelected_Status_id(orderDetail.status_id);
        }
    }

    function update_order() {
        fetch(`https://backend-viv4.onrender.com/order/update_order_admin/${selectedOrderId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status_id: selected_status_id
            })
        })
            .then(res => res.json())
            .then(data => {
                alert("Đã cập nhật đơn hàng");
                setOrders(prev =>
                    prev.map(item =>
                        item.order_id === selectedOrderId
                            ? {
                                ...item,
                                status_id: selected_status_id,
                                status_name: order_status.find(
                                    s => s.status_id === selected_status_id
                                )?.status_name
                            }
                            : item
                    )
                );
                setViewmodal(false)

            })
    }

    function xemdonhang(order_id) {
        setVieworder(true);
        setOrder_id_view(order_id);
        fetch(`https://backend-viv4.onrender.com/order/${order_id_view}`)
            .then(res => res.json())
            .then(data => {
                setOrder_item(data);
            });
    }
    console.log(order_id_view)

    function close_view_order() {
        setVieworder(false)
    }

    function xoadonhoanthanh(order_id){
        alert(order_id)
    }

    return (
        <div>
            {
                vieworder && (
                    <div className="overlay">
                        {
                            <div className="order-box">
                                <p>Mã đơn: {order_item[0]?.order_code}</p>
                                <p>Họ tên: {order_item[0]?.hoten}</p>
                                <p>SĐT: {order_item[0]?.sdt}</p>
                                <p>Địa chỉ: {order_item[0]?.diachi}</p>

                                <p>Ghi chú: {order_item[0]?.ghichu}</p>

                                <p>Phương thức thanh toán: {order_item[0]?.phuongthuc_thanhtoan}</p>

                                <p>Tổng tiền: {Number(order_item[0]?.tongtien || 0).toLocaleString("vi-VN")} đ</p>

                                <p>Ngày tạo: {order_item[0]?.created_at
                                    ? new Date(order_item[0].created_at).toLocaleString("vi-VN")
                                    : ""}
                                </p>

                                <p>Trạng thái ID: {order_item[0]?.status_id}</p>
                                <div className="btn-group">
                                    <button className="btn-save" onClick={update_order}>Lưu</button>
                                    <button className="btn-close" onClick={close_view_order}>Đóng</button>
                                </div>
                            </div>
                        }
                    </div>
                )
            }
            {
                viewmodal && (
                    <div className="overlay">
                        <div className="modalstatus">

                            <h3>Chi tiết đơn hàng</h3>

                            <div className="modal-info">
                                <p><b>Mã đơn:</b> {orderDetail.order_code}</p>
                                <p><b>Khách:</b> {orderDetail.hoten}</p>
                                <p><b>SĐT:</b> {orderDetail.sdt}</p>
                                <p><b>Địa chỉ:</b> {orderDetail.diachi}</p>
                                <p><b>Ghi chú:</b> {orderDetail.ghichu}</p>
                                <p><b>Tổng tiền:</b> {Number(orderDetail.tongtien).toLocaleString("vi-VN")}đ</p>
                            </div>

                            <div className="modal-action">
                                <br />
                                <br />
                                <b>Trạng thái đơn hàng</b>
                                <select
                                    value={selected_status_id}
                                    onChange={(e) => setSelected_Status_id(Number(e.target.value))}
                                >
                                    {
                                        order_status.map(item => (
                                            <option
                                                key={item.status_id}
                                                value={item.status_id}
                                            >
                                                {item.status_name}
                                            </option>
                                        ))
                                    }
                                </select>

                                <div className="btn-group">
                                    <button className="btn-save" onClick={update_order}>Lưu</button>
                                    <button className="btn-close" onClick={close}>Đóng</button>
                                </div>
                            </div>

                        </div>
                    </div>
                )
            }
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Ngày đặt</th>
                        <th>Tổng tiền</th>
                        <th>Tên người mua</th>
                        <th>Tổng item</th>
                        <th>Trạng thái đơn hàng</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(item => (
                            <tr key={item.order_id}>
                                <td className="order-code" style={{ color: "#006eff" }}>{item.order_code}</td>
                                <td>{new Date(item.created_at).toLocaleString("vi-VN")}</td>
                                <td className="order-total">
                                    {Number(item.tongtien).toLocaleString("vi-VN")}₫
                                </td>
                                <td>{item.hoten}</td>
                                <td>{item.slitem}</td>
                                <td>
                                    <span className={`status_admin status_admin-${item.status_id}`}>
                                        {item.status_name}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn-view" onClick={() => xemdonhang(item.order_id)}>Xem</button>
                                    {item.status_id !== 9 && item.status_id !== 10 && (
                                        <>
                                            <button
                                                className="btn-update"
                                                onClick={() => capnhatdonhang(item.order_id)} style={{ marginLeft: 10 }}
                                            >
                                                Cập nhật
                                            </button>

                                            <button
                                                className="btn-delete" style={{ marginLeft: 10 }}
                                            >
                                                Huỷ
                                            </button>
                                        </>
                                    )
                                    }
                                    {item.status_id === 9 && (
                                        <>
                                            <button
                                                className="btn-delete" style={{ marginLeft: 10 }} onClick={()=>xoadonhoanthanh(item.status_id)}
                                            >
                                                Xóa
                                            </button>
                                        </>
                                    )
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderAdmin;