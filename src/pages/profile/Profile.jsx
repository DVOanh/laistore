import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from '../../component/loading/Loading';
import './profile.css';
import { jwtDecode } from "jwt-decode";
function Profile() {
    const [user_id, setUser_id] = useState(null);
    const [data, setData] = useState(null);
    useEffect(() => {
        // 1. Lấy token thô loằng ngoằng từ localStorage ra
        const token = localStorage.getItem('token');

        if (token) {
            try {
                // 2. Tiến hành giải mã (decode)
                const decoded = jwtDecode(token);

                // 3. Log thử ra xem bên trong có gì nhé
                console.log("Dữ liệu sau khi decode:", decoded);

                // 4. Lưu cái id vào state để xài ở Frontend
                // (Lưu ý: Tên biến phải trùng với tên bạn đặt lúc jwt.sign ở Backend, ví dụ: id)
                setUser_id(decoded.user_id);

            } catch (error) {
                console.error("Token bị lỗi hoặc không hợp lệ:", error);
            }
        }
    }, []);
    useEffect(() => {
        document.title = "trang ca nhan";
        const token = localStorage.getItem("token");
        console.log("TOKEN: " + token)
        fetch(`https://backend-viv4.onrender.com/user/byid`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Co loi');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(err => {
                console.error(err);
            });

    }, []);

    return (
        <div className="profile_container">
            {!data ? (<Loading />) : (<>
                <div className="tieude_profile">
                    <h1>Hồ Sơ Của Tôi</h1>
                    <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                </div>

                <div className="info_profile">
                    <div className="info_phai">
                        <h1>Các thông tin</h1>
                        <div className="info_phai_item">
                            <h3>Tên đăng nhập</h3>
                            <input type="text" value={data.username} />
                        </div>
                        <div className="info_phai_item">
                            <h3>Tên</h3>
                            <input type="text" value={data.fullname} />
                        </div>

                        <div className="info_phai_item">
                            <h3>Email</h3>
                            <input type="text" value={data.email} />
                        </div>

                        <div className="info_phai_item">
                            <h3>Số điện thoại</h3>
                            <input type="text" value={data.phone} />
                        </div>

                        <div className="info_phai_item">
                            <h3>Địa chỉ</h3>
                            <input type="text" value={data.address} />
                        </div>
                        <div className="info_phai_item">
                            <h3>Ngày tạo tài khoản</h3>
                            <p>{new Date(data.created_at).toLocaleDateString("vi-VN")}</p>
                        </div>
                    </div>
                    <div className="info_trai">
                        <div className="anh_nguoi_dung">
                            <img src={`/${data.avatar}`} />
                        </div>
                    </div>
                </div>
            </>)}
        </div>
    )
}

export default Profile;