import { useState } from "react";
import "./checkout.css";
import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [pttt, setPttt] = useState("cod");
    const [ghichu, setGhichu] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const storedUser = localStorage.getItem('user');
    const [user] = useState(()=>{
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const product = location.state;

    if(!product){
        navigate('/')
    }
    const tongtien = product.soluong * product.price;
    function dathang(e) {
        e.preventDefault();
        if (!name.trim() || !phone.trim() || !address.trim()) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        fetch('https://backend-viv4.onrender.com/order/checkout', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                user_id: user.user_id,
                variant_id: product.product_variant_id,
                quantity: product.soluong,
                price: product.price,
                total: tongtien,
                hoten: name,
                phone: phone,
                address: address,
                pttt: pttt,
                ghichu: ghichu
            })
        })
        .then(res=>{
            return res.json()
        })
        .then(data =>{
            console.log(data);
            alert('Mua thanh cong');
            navigate('/order')
        })
    }

    return (

        <div className="checkoutContainer">
            
            <div className="infoproduct">
                <h1>Thong tin sản phẩm</h1>
                <div>So luong: {product.soluong}</div>
                <div style={{width: '50%'}}><img src={`/${product.image_url}`} alt="" style={{width: '100%'}}/></div>
                <p>{product.product_name}</p>
                <p>Đơn giá: {Number(product.price).toLocaleString('vi-VN')}</p>
                <p>Tổng tiền: {Number(tongtien).toLocaleString('vi-VN')} đ</p>
                <h1>{user.user_id}</h1>
            </div>
            <div className="form">
                <form onSubmit={dathang}>
                    <h1>Thông tin giao hàng</h1>
                    <input
                        type="text"
                        placeholder="Họ và tên"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <br />
                    <input
                        type="text"
                        placeholder="Số điện thoại"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                    />
                    <br />
                    <textarea
                        placeholder="Địa chỉ giao hàng"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                    ></textarea>
                    <h1>Phương thức thanh toán</h1>
                    <div style={{ backgroundColor: "gray" }}>
                        <div>
                            Thanh toán khi nhận hàng
                            <input
                                type="radio"
                                value={"cod"}
                                name="pttt"
                                checked={pttt === "cod"}
                                onChange={(e) => {
                                    setPttt(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            Thanh toán bằng chuyển khoản
                            <input
                                type="radio"
                                value={"bank"}
                                name="pttt"
                                checked={pttt === "bank"}
                                onChange={(e) => {
                                    setPttt(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            Thanh toán bằng MOMO
                            <input
                                type="radio"
                                value={"momo"}
                                name="pttt"
                                checked={pttt === "momo"}
                                onChange={(e) => {
                                    setPttt(e.target.value);
                                }}
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Ghi chú"
                            value={ghichu}
                            onChange={(e) => {
                                setGhichu(e.target.value);
                            }}
                        />
                    </div>
                    <button type="submit">Đặt Hàng</button>
                </form>
            </div>
        </div>
    );
}

export default Checkout;
