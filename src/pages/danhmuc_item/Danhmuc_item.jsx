import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../component/loading/Loading";
import './danhmuc_item.css';

function Danhmuc_item() {
    const { iddanhmuc } = useParams();
    const [productdanhmuc, setProductdanhmuc] = useState([]);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        fetch(`https://backend-viv4.onrender.com/products/danhmuc/${iddanhmuc}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProductdanhmuc(data);

                setLoading(false);
            });
    }, [iddanhmuc]);

    if (loading) {
        return <Loading />
    }
    if (!productdanhmuc.length) {
        return <p style={{display: "flex", justifyContent:"center", margin: "50px auto"}}>Không có dữ liệu</p>
    }
    // Lấy banner từ sản phẩm đầu tiên
    const bannerImage = productdanhmuc[0]?.banner_image;
    return (
        <div className="product_container">
            {bannerImage && <img src={`/${bannerImage}`} alt="Banner danh mục" className="banner_image" />}
            <div className="product_list">
                {
                    productdanhmuc.map(item => (
                        <Link to={`/chitietsanpham/${item.product_id}`} className='product_item' state={{ variantId: item.variant_id }}>
                            <img src={`/${item.image_url}`} />
                            <h3 className='product_name'>{item.product_name}</h3>
                            <p className='price'>{Number(item.min_price).toLocaleString('vi-VN')} đ</p>
                            <p className='daban'>Đã bán {item.sumsold}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )

}

export default Danhmuc_item;