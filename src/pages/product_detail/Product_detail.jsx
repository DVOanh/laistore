import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './product_detail.css';
import { Link } from 'react-router-dom';
import Loading from '../../component/loading/Loading';


function Product_detail() {
    const [product, setProduct] = useState(null);
    const [soluong, setSoluong] = useState(1);
    const [review, setReview] = useState([]);
    const [slstar, setSlStar] = useState([]);
    const nav = useNavigate();
    const token = localStorage.getItem('token');
    function btnCongSl() {
        setSoluong(soluong + 1);
    }

    function btnTruSl() {
        if (soluong > 1) {
            setSoluong(soluong - 1)
        }
    }
    
    function muangay(){
        const data = {
            product_variant_id:  product.id,
            soluong: soluong,
            image_url: product.image_url,
            product_name: product.product_name,
            price: product.price
        }
        nav(`/checkout/${product.id}`, {state: data});
    }

    function btnthemgiohang() {
        if(!token){
            nav('/login');
            return;
        }
        fetch('https://backend-production-f0ff.up.railway.app/cart/addcart', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ soluong: soluong, variant_id: product.id })
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                alert('Thêm giỏ hàng thành công');
                window.location.reload();
            });
    }

    const { id } = useParams();
    console.log(id);
    useEffect(() => {
        fetch(`https://backend-production-f0ff.up.railway.app/products/${id}`)
            .then(res => {

                return res.json();
            })
            .then(data => {
                console.log(data);
                setProduct(data);
            });
    }, [id]);

    useEffect(() => {
        fetch(`https://backend-production-f0ff.up.railway.app/review/${id}`)
            .then(res => { return res.json(); })
            .then(review => {
                console.log(review);
                setReview(review);
            })
    }, [id]);

    useEffect(() => {
        fetch(`https://backend-production-f0ff.up.railway.app/review/sl/${id}`)
            .then(res => { return res.json(); })
            .then(sl => {
                console.log(sl);
                setSlStar(sl);
            })
    }, [id]);

    if (!product) {
        return <Loading />
    }

    return (
        <div>
            <div className='main'>
                <div className='product_left'>
                    <div className='box_product_image'>
                        <img src={`/${product.image_url}`} className='product_image' />
                    </div>

                </div>
                <div className='product_right'>
                    <h1>{product.product_name}</h1>
                    <h3>{Number(product.price).toLocaleString('vi-VN')}đ</h3>
                    <div>
                        <button type='button' onClick={btnTruSl}>-</button>
                        <input type="number" min={1} value={soluong} onChange={(e) => { setSoluong(Number(e.target.value)) }} />
                        <button type='button' onClick={btnCongSl}>+</button>
                    </div>
                    <div>
                        <button type='button' onClick={btnthemgiohang}>Thêm Vào Giỏ Hàng</button>
                        <button type='button' onClick={muangay}>Mua Ngay</button>
                    </div>
                </div>
            </div>

            <div className='review'>
                <h1>ĐÁNH GIÁ SẢN PHẨM</h1>
                {
                    slstar.map(item => (
                        <p>{item.tbc + "⭐".repeat(item.tbc)}</p>
                    ))
                }
                {
                    review.map(item => (
                        <div className='review_item'>
                            <Link to={`/profile/${item.user_id}`} className='user_rv'>
                                <img src={`/${item.avatar}`} style={{ width: "40px", borderRadius: '50%', aspectRatio: '1/1', objectFit: 'cover' }} />
                                <h1>{item.username}</h1>
                                <p>{new Date(item.created_at).toLocaleString('vi-VN')}</p>
                            </Link>
                            <h1 className="star">{"⭐".repeat(Number(item.star))}</h1>
                            <p>{item.content}</p>

                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Product_detail;