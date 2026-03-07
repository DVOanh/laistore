import { useEffect, useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";
import './admin.css';
function Dashboard() {

    const [thunho, setThunho] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:3000/admin/dashboard', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }, []);


    return (

        <div className="admin_container">
            <div className={`dashboard ${thunho ? "thunho" : ""}`}>
                <div className="dashboard_title">
                    <Link to={'/admin/dashboard'} className={`link_logo_admin ${thunho ? "anlogo" : ""}`}><img src="/logo_laistore.png" alt="" style={{width: '40px'}} className="logo_admin"/></Link>
                    <img src="/sidebar.png" alt="" className="sidebar" onClick={()=>setThunho(!thunho)}/>
                </div>
                <ul className={`dashboard_item_list ${thunho ? "an" : ""}`}>
                    <li><NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "dashboard_item active" : "dashboard_item"} end>Trang chủ</NavLink></li>
                    <li><NavLink to="/admin/dashboard/products" className={({ isActive }) => isActive ? "dashboard_item active" : "dashboard_item"}>Quản lý sản phẩm</NavLink></li>
                    <li><NavLink to="/admin/dashboard/orders" className={({ isActive }) => isActive ? "dashboard_item active" : "dashboard_item"}>Quản lý đơn hàng</NavLink></li>
                    <li><NavLink to="/admin/dashboard/users" className={({ isActive }) => isActive ? "dashboard_item active" : "dashboard_item"}>Quản lý người dùng</NavLink></li>
                </ul>
            </div>
            <div className="admin_main">
                <HeaderAdmin />
                <Outlet />
            </div>
        </div>
    );
}

export default Dashboard;