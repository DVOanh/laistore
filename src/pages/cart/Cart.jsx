import { useEffect, useState } from "react";
import Loading from "../../component/loading/Loading";
import './cart.css';
function Cart() {
    const [spgiohang, setSpgiohang] = useState(null);
    const [soluongsp, setSoluongsp] = useState();

    const [selected, setSelected] = useState([]);
    const token = localStorage.getItem('token');
    const [hienthongbao, setHienthongbao] = useState(false);
    const [user] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    useEffect(() => {
        fetch(`https://backend-viv4.onrender.com/cart/${user.user_id}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setSpgiohang(data);
                console.log(data);
            });
    }, [user.user_id]);



    useEffect(() => {
        console.log("selected mới:", selected);
    }, [selected]);

    let tongTien = 0;
    if (spgiohang) {
        spgiohang.forEach(item => {
            if (selected.includes(item.cart_id)) {
                tongTien += item.price * item.quantity;

            }
        });
    }
    console.log("Tong tien: " + tongTien)
    function deleteCart(cart_id) {
        fetch(`https://backend-viv4.onrender.com/cart/delete`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cart_id: cart_id
            })
        })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                setSpgiohang(prev =>
                    prev.filter(item => item.cart_id !== cart_id)
                );
            })
    }

    if (!spgiohang)
        return (
            <Loading />
        )

    function cartmuahang() {
        if (selected.length === 0) {
            setHienthongbao(true);
        }
        else {
            alert(`Bạn đã chọn ${selected.length} sản phẩm`);
        }
    }

    function anthongbao() {
        setHienthongbao(false)
    }

    return (
        <div className="cartcontainer">
            {/* overlay */}
            {hienthongbao && (
                <div className="overlay">
                    <div className="chuachonsp">
                        <div>Bạn chưa chọn sản phẩm nào để mua</div>
                        <button onClick={anthongbao}>OK</button>
                    </div>
                </div>
            )}
            <div className="cart_title">
                <h1>Sản Phẩm</h1>
                <h1></h1>
                <h1>Đơn Giá</h1>
                <h1>Số Lượng</h1>
                <h1>Số Tiền</h1>
                <h1>Thao Tác</h1>
            </div>
            {

                spgiohang.map(item => (
                    <div className="cartItem">
                        <div className="cart_sp">
                            <div>
                                <input type="checkbox" name="" id="" className="tickcheckbox"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelected([...selected, item.cart_id]);

                                        }
                                        else {
                                            setSelected(selected.filter(id => id !== item.cart_id));

                                        }

                                    }}
                                />
                            </div>
                            <img src={`/${item.image_url}`} style={{ width: '100px', aspectRatio: '1/1', objectFit: 'cover' }} />
                            <p>{item.product_name}</p>

                        </div>
                        <p className="phanloaicart">Phân loại hàng: <br />RAM: {item.ram} - Storage: {item.storage}</p>
                        <p>{Number(item.price).toLocaleString('vi-VN')}₫</p>
                        <div className="cart_sl">
                            <button>-</button>
                            <input type="text" value={item.quantity} />
                            <button>+</button>
                        </div>
                        <div className="thanhtien">{(Number(item.quantity) * Number(item.price)).toLocaleString('vi-VN')}₫</div>
                        <button className="btnxoacart" onClick={() => deleteCart(Number(item.cart_id))}>Xoá</button>
                    </div>
                ))
            }
            <div className="cart_bottom">
                <div className="cartmuahang">
                    <p>Tổng cộng ({selected.length} sản phẩm): <span style={{ color: "orangered", fontSize: "30px" }}>{selected.length === 0 ? "0₫" : tongTien?.toLocaleString("vi-VN") + "₫"}</span></p>
                    <button onClick={cartmuahang}>Mua Hàng</button>
                </div>
            </div>

        </div>
    )
}
export default Cart;    