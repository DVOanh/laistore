import { useEffect, useState } from "react";

function OrderAdmin() {
    const [orders, setOrders] = useState([]);
    const [viewmodal, setViewmodal] = useState(false);
    useEffect(() => {
        document.title = "Quản lý đơn hàng";
    }, []);
    useEffect(() => {
        fetch("https://backend-viv4.onrender.com/admin/orders")
            .then(res => res.json())
            .then(data => {
                setOrders(data)
            })
    })

    function capnhatdonhang(){
        setViewmodal(true);
    }

    function close(){
        setViewmodal(false)
    }

    return (
        <div>
            {
                viewmodal && (
                    <div className="overlay">
                        <div className="modalstatus">Cập nhật trạng thái đơn</div>
                        <button onClick={close}>Đóng modal</button>
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
                                <td className="order-code" style={{color: "#006eff"}}>{item.order_code}</td>
                                <td>{new Date(item.created_at).toLocaleString("vi-VN")}</td>
                                <td className="order-total">
                                    {Number(item.tongtien).toLocaleString("vi-VN")}₫
                                </td>
                                <td>{item.hoten}</td>
                                <td>{item.slitem}</td>
                                <td>
                                    <span className={`status status-${item.status_id}`}>
                                        {item.status_name}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn-view">Xem</button>
                                    {item.status_id !== 9 && item.status_id !== 10 && (
                                        <>
                                            <button
                                                className="btn-update"
                                                onClick={capnhatdonhang}
                                            >
                                                Cập nhật
                                            </button>

                                            <button
                                                className="btn-delete"
                                            >
                                                Huỷ
                                            </button>
                                        </>
                                    )}
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