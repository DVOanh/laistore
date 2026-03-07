import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import OrderStatus from "../../component/order_status/OrderStatus";
import { Outlet } from "react-router-dom";
import './order.css';

function Order() {
    const [order_status, setOrderStatus] = useState([]);
    const {status_id} = useParams();

    useEffect(() => {
        fetch('https://backend-production-63ce7.up.railway.app/order_status')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setOrderStatus(data);
            })
    }, []);
    return (
        <div className="status_container">
            <div className="status_list">
                <Link to={'/order'} className={`status ${!status_id ? "active" : ""}`}>Tất cả</Link>
                {order_status.map(item => (
                    <Link key={item.status_id} to={`/order/${item.status_id}`} className={String(status_id) === String(item.status_id) ? "status active" : "status"}>{item.status_name}</Link>
                ))}
            </div>
            <Outlet />
        </div>
    )
}
export default Order;
