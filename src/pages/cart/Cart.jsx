import { useEffect, useState } from "react";
import Loading from "../../component/loading/Loading";
import './cart.css';
function Cart() {
    const [spgiohang, setSpgiohang] = useState(null);
    const [user] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    console.log('ID user: ' + user.user_id);
    useEffect(() => {
        fetch(`https://backend-production-f0ff.up.railway.app/cart/${user.user_id}`)
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
            <div style={{ position: 'sticky', top: '70px', backgroundColor: 'white', padding: '20px', boxShadow: '0 1px 1px  gray' }}>
                <h1>Tieu de</h1>
            </div>
            {

                spgiohang.map(item => (
                    <div className="cartItem">
                        <img src={`/${item.image_url}`} style={{ width: '100px', aspectRatio: '1/1', objectFit: 'cover' }} />
                        <h1>Số lượng {item.quantity}</h1>
                        <p>{item.product_name}</p>
                    </div>
                ))
            }
        </div>
    )
}
export default Cart;    