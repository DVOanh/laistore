import { useState, useEffect } from 'react';
import './product.css';
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';

function Product() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('https://backend-production-f0ff.up.railway.app/products')
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
            <Link to={`/chitietsanpham/${item.product_id}`} className='product_item'>
              <img src={`/${item.image_url}`} />
              <h3 className='product_name'>{item.product_name}</h3>
              <p className='price'>{Number(item.min_price).toLocaleString('vi-VN')} đ</p>
              
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Product;
