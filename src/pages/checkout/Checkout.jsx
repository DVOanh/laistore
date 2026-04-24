import { useEffect, useState } from "react";
import "./checkout.css";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../component/loading/Loading";

function Checkout() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [pttt, setPttt] = useState("cod");
    const [ghichu, setGhichu] = useState("");
    const [productbycart, setProductbycart] = useState([]);
    const location = useLocation();
    const cart_data = location.state;
    const quantities = cart_data?.soluongsp?.map(item => item.quantity);

    console.log(cart_data)
    const navigate = useNavigate();

    const storedUser = localStorage.getItem('user');
    const [user] = useState(() => {
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const product = location.state;
    const token = localStorage.getItem("token");
    if (!product) {
        navigate('/')
    }

    const tongtien = product.soluong * product.price;
    const tongtienCart = productbycart.reduce((total, item) => {
    return total + item.price * item.quantity;
}, 0);
    function dathang(e) {
        e.preventDefault();
        if (!name.trim() || !phone.trim() || !address.trim()) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        if (cart_data.type === "cart_muangay") {
            alert("Mua hang cua gio hang");
            return;
        }
        else {
            fetch('https://backend-viv4.onrender.com/order/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    console.log(data);
                    alert('Mua thanh cong');
                    navigate('/order')
                })
        }

    }

    useEffect(() => {
        if (!cart_data || cart_data.length === 0) return;
        fetch("https://backend-viv4.onrender.com/cart/product_cart_checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                cartIds: cart_data.cartIds
            })
        })
            .then(res => res.json())
            .then(data => {
                setProductbycart(data);
                console.log("data checkout:", data);
            })
    }, [token, cart_data])
    !productbycart && (
        <Loading />
    )
    return (

        <div className="checkoutContainer">

            <div className="infoproduct">
                {
                    cart_data.type === "cart_muangay"
                        ? <div>
                            <h1>Thông tin sản phẩm (tổng cộng {productbycart.length} sản phẩm)</h1>
                            <div className="checkout_title">
                                <h1>Ảnh sản phẩm</h1>
                                <h1>Tên sản phẩm</h1>
                                <h1>Số lượng</h1>
                                <h1>Giá</h1>
                            </div>
                            <div className="product_list_checkout">
                                {
                                    productbycart.map(item => (
                                        <div className="checkout_item">
                                            <div className="image_checkout">
                                                <img src={`/${item.image_url}`} alt="" />
                                            </div>
                                            <h5 className="name_checkout">{item.product_name}</h5>
                                            <p>{item.quantity}</p>
                                            <p className="price_checkout">{Number(item.price).toLocaleString("vi-VN")}₫</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        : <div>
                            <h1>Thông tin sản phẩm</h1>
                            <div className="checkout_title">
                                <h1>Ảnh sản phẩm</h1>
                                <h1>Tên sản phẩm</h1>
                                <h1>Số lượng</h1>
                                <h1>Giá</h1>
                            </div>

                            <div className="checkout_item">
                                <div className="image_checkout">
                                    <img src={`/${product.image_url}`} alt="" />
                                </div>
                                <h5 className="name_checkout">Tên sản phẩm: {product.product_name}</h5>
                                <p>1</p>
                                <p className="price_checkout">{Number(product.price).toLocaleString('vi-VN')}₫</p>
                                {/* <p>Tổng tiền: {Number(tongtien).toLocaleString('vi-VN')} đ</p> */}
                            </div>
                        </div>
                }



            </div>
            <div className="form">
                <div className="form_item_checkout">
                    <form onSubmit={dathang} className="phom">
                        <h1>Thông tin giao hàng</h1>
                        <label htmlFor="">Tên người nhận</label>
                        <input
                            type="text"
                            placeholder="Họ và tên"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <br />
                        <br />
                        <label htmlFor="">Số điện thoại</label>
                        <input
                            type="text"
                            placeholder="Số điện thoại"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                        />
                        <br />
                        <br />
                        <label htmlFor="">Địa chỉ</label>
                        <textarea
                            placeholder="Địa chỉ giao hàng"
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                        ></textarea>
                        <br />
                        <br />
                        <div>
                            <label htmlFor="">Ghi chú</label>
                            <input
                                type="text"
                                placeholder="Ghi chú"
                                value={ghichu}
                                onChange={(e) => {
                                    setGhichu(e.target.value);
                                }}
                            />
                        </div>
                        <h1 className="tieudepttt">Phương thức thanh toán</h1>
                        <div className="khoipttt">
                            <div>
                                <label>Thanh toán khi nhận hàng</label>
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
                                <label className="label_pttt">Thanh toán bằng chuyển khoản</label>
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
                            <div >
                                <label>Thanh toán bằng MOMO</label>
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

                        </div>
                    </form>
                </div>

                <div className="khoidathang">
                    <div className="khoitongtien">
                        Tổng tiền:
                        {
                            cart_data.type === "cart_muangay"
                                ? <span> {Number(tongtienCart).toLocaleString("vi-VN")}₫</span>
                                : <span> {Number(product.price).toLocaleString("vi-VN")}₫</span>
                        }
                    </div>
                    <button type="submit" className="btndathang" onClick={dathang}>Đặt Hàng</button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
