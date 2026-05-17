import { NavLink, Outlet } from "react-router-dom";
import "./user.css"
function User(){
    function btnDangxuat() {
        if (!confirm('Ban co muon dang xuat ko')) {
            return;
        }
        else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            window.location.href = "/";
        }
    }
    return(
        <div className="user_container">
            <div></div>
            <nav className="nav_user">
                <NavLink to='account' className={({ isActive }) => 
                    isActive ? "user account active" : "user account"
                }><img src="../../../account.png" style={{width: 14, height: 14}}/> Tài Khoản Của Tôi</NavLink>
                <NavLink to='purchase' className={({ isActive }) => 
                    isActive ? "user account active" : "user account"
                }><img src="../../../donmua.png" style={{width: 14, height: 14}}/> Đơn Mua</NavLink>
                <button className="user btndangxuat" onClick={btnDangxuat}>↩ Đăng Xuất</button>

            </nav>
            <Outlet/>
        </div>
       
    )
}

export default User;