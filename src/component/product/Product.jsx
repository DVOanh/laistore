import { useState, useEffect } from 'react';
import './product.css';
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';

function Product() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('https://backend-viv4.onrender.com/products')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setData(data);
        setLoading(false);
      });
  }, []);



  if (loading) {
    return <Loading />
  }
  return (
    <div className='product_container'>
      <div className='tieudesp'>
        <p>SẢN PHẨM NỔI BẬT</p>
      </div>
      <div className='product_list'>

        {
          data.map(item => (
            <Link to={`/chitietsanpham/${item.product_id}?variantId=${item.variant_id}`} className='product_item' key={item.product_id}>
              <img src={`/${item.image_url}`} />
              <h3 className='product_name'>{item.product_name}</h3>
              <p className='price'>{Number(item.price).toLocaleString('vi-VN')}₫</p>
              <p className='daban'>Đã bán {item.total_sold}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Product;
