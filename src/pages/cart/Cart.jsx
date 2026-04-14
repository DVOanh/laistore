import { useEffect, useState } from "react";
import Loading from "../../component/loading/Loading";
import './cart.css';
function Cart() {
    const [spgiohang, setSpgiohang] = useState(null);
    const [soluongsp, setSoluongsp] = useState();
    const [user] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    console.log('ID user: ' + user.user_id);
    useEffect(() => {
        fetch(`https://backend-viv4.onrender.com/cart/${user.user_id}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setSpgiohang(data);
            });
    }, [user.user_id]);
    if (!spgiohang)
        return (
            <Loading />
        )
    return (
        <div className="cartcontainer">
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
                                <input type="checkbox" name="" id="" className="tickcheckbox"/>
                            </div>
                            <img src={`/${item.image_url}`} style={{ width: '100px', aspectRatio: '1/1', objectFit: 'cover' }} />
                            <p>{item.product_name}</p>
                            
                        </div>
                        <p className="phanloaicart">Phân loại hàng: <br />RAM: {item.ram} - Storage: {item.storage}</p>
                        <p>{Number(item.price).toLocaleString('vi-VN')}₫</p>
                        <div className="cart_sl">
                            <button>-</button>
                            <input type="text" value={item.quantity}/>
                            <button>+</button>
                        </div>
                        <div className="thanhtien">{(Number(item.quantity) * Number(item.price)).toLocaleString('vi-VN')}₫</div>  
                        <button className="btnxoacart">Xoá</button>
                    </div>
                ))
            }
        </div>
    )
}
export default Cart;    