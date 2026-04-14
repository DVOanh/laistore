import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './product_detail.css';
import { Link, NavLink } from 'react-router-dom';
import Loading from '../../component/loading/Loading';
// import { jwtDecode } from 'jwt-decode';


function Product_detail() {
    const [product, setProduct] = useState(null);
    const [soluong, setSoluong] = useState(1);
    const [review, setReview] = useState([]);
    const [slstar, setSlStar] = useState([]);
    const nav = useNavigate();
    const token = localStorage.getItem('token');
    const [motasp, setMotasp] = useState([]);
    const [thongso, setThongso] = useState([]);
    const [thongtinmay, setThongtinmay] = useState([]);

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const variant_id = query.get("variantId");
    const [selectedVariant, setSelectedVariant] = useState(variant_id);

    // const [slgh, setSlgh] = useState(0);
    // const decode = jwtDecode(token);

    function btnCongSl() {
        setSoluong(soluong + 1);
    }

    function btnTruSl() {
        if (soluong > 1) {
            setSoluong(soluong - 1)
        }
    }

    function muangay() {
        const data = {
            product_variant_id: selectedVariantData.id,
            soluong: soluong,
            image_url: product.image_url,
            product_name: product.product_name,
            price: selectedVariantData.price
        }
        nav(`/checkout/${selectedVariantData.id}`, { state: data });
    }

    // const fetchSlCart = () => {
    //     if (!decode?.id) return;
    //     fetch(`https://backend-viv4.onrender.com/cart/slgh/${decode.id}`)
    //         .then(res => {
    //             return res.json();
    //         })
    //         .then(data => {
    //             setSlgh(Number(data[0].slsp));
    //         });
    // }

    function btnthemgiohang() {
        if (!token) {
            nav('/login');
            return;
        }
        if (confirm("Bạn chắc chắn muốn thêm vào giỏ hàng?")) {
            fetch('https://backend-viv4.onrender.com/cart/addcart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ soluong: soluong, variant_id: selectedVariant })
            })
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                    window.location.reload();
                });
        }
    }

    const { id } = useParams();
    console.log(id);
    useEffect(() => {
        fetch(`https://backend-viv4.onrender.com/products/${id}`)
            .then(res => {

                return res.json();
            })
            .then(data => {
                console.log(data);
                setProduct(data);
            });

    }, [id]);

    const selectedVariantData = thongtinmay.find(
        v => v.id === selectedVariant
    );
    useEffect(() => {
        fetch(`https://backend-viv4.onrender.com/variant/${id}`)
            .then(res => {

                return res.json();
            })
            .then(data => {
                console.log(data);
                setThongtinmay(data);
            });
    }, [id]);

    useEffect(() => {
        fetch(`https://backend-viv4.onrender.com/review/${id}`)
            .then(res => { return res.json(); })
            .then(review => {
                console.log(review);
                setReview(review);
            })
    }, [id]);

    useEffect(() => {
        fetch(`https://backend-viv4.onrender.com/review/sl/${id}`)
            .then(res => { return res.json(); })
            .then(sl => {
                console.log(sl);
                setSlStar(sl);
            })
    }, [id]);

    useEffect(() => {
        fetch(`https://backend-viv4.onrender.com/thongso/${id}`)
            .then(res => res.json())
            .then(data => {
                return setThongso(data);
            })
    }, [id]);

    useEffect(() => {
        fetch(`https://backend-viv4.onrender.com/motasp/${id}`)
            .then(res => res.json())
            .then(data => {
                return setMotasp(data);
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

                    <div className='product_right_item'>
                        <h1 className='tensp'>{product.product_name}</h1>
                        <div className='giasp'><h3>
                            {Number(selectedVariantData?.price).toLocaleString('vi-VN')}đ
                        </h3></div>
                        <div className='khoisl'>
                            <p>Số lượng </p>
                            <button type='button' onClick={btnTruSl} className='btntru'>-</button>
                            <input min={1} value={soluong} className='inputsl' onChange={(e) => { setSoluong(Number(e.target.value)) }} />
                            <button type='button' onClick={btnCongSl} className='btncong'>+</button>
                        </div>
                        <div className='thongtinmay'>
                            <p>Phân loại </p>
                            {thongtinmay.map(item => (
                                <div
                                    className={
                                        selectedVariant === item.id
                                            ? "thongtinmayitem sld"
                                            : "thongtinmayitem"
                                    }
                                    onClick={() => {
                                        setSelectedVariant(item.id);


                                    }}

                                >
                                    {item.ram} - {item.storage}
                                </div>
                            ))}
                        </div>
                        <div>
                            <p>Màu sắc </p>
                            <div>
                                
                            </div>
                        </div>
                        <div className='khoibtn'>
                            <button type='button' onClick={btnthemgiohang} className='btnthemgiohang'><img src="/shopping-cart-add.png" alt="" className='iconthemgiohang'/>Thêm Vào Giỏ Hàng</button>
                            <button type='button' onClick={muangay} className='btnmuangay'>Mua Ngay</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='thongsokythuat'>
                <h1>THÔNG SỐ KỸ THUẬT</h1>
                {
                    thongso.map(item => (
                        <div className='thongso_container'>
                            <div className='thong_so_item'><span className='tieude_thongso'>Màn hình:</span><p> {item.man_hinh}</p></div>
                            <br />
                            <div className='thong_so_item'><span className='tieude_thongso'>CPU:</span><p> {item.cpu}</p></div>
                            <br />
                            <div className='thong_so_item'><span className='tieude_thongso'>RAM:</span><p> {item.ram}</p></div>
                            <br />
                            <div className='thong_so_item'><span className='tieude_thongso'>Bộ nhớ:</span><p> {item.bo_nho}</p></div>
                            <br />
                            <div className='thong_so_item'><span className='tieude_thongso'>Camera:</span><p> {item.camera}</p></div>
                            <br />
                            <div className='thong_so_item'><span className='tieude_thongso'>Pin:</span><p> {item.pin}</p></div>
                            <br />
                            <div className='thong_so_item'><span className='tieude_thongso'>Hệ điều hành:</span><p> {item.he_dieu_hanh}</p></div>
                        </div>
                    ))
                }
            </div>

            <div className='mota'>
                <h1>MÔ TẢ SẢN PHẨM</h1>
                {
                    motasp.map(item => (
                        <p style={{ whiteSpace: 'pre-line', marginTop: "15px", lineHeight: '30px' }}>{item.description}</p>
                    ))
                }
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
                                <div className='uname_time'>
                                    <h1>{item.username}</h1>
                                    <h1 className="star">{"⭐".repeat(Number(item.star))}</h1>

                                </div>
                            </Link>
                            <div className='inforeview'>
                                <p>{new Date(item.created_at).toLocaleString('vi-VN')}</p>
                                <p>{item.content}</p>
                            </div>

                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Product_detail;