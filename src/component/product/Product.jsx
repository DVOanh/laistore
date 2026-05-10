import { useState, useEffect } from 'react';
import './product.css';
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';

function Product() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [spdachon, setSpdachon] = useState([]);
  const [thongbao, setThongbao] = useState(false);
  const [openmodal, setOpenModal] = useState(false);
  const [dsspsosanh, setdsspsosanh] = useState([]);
  useEffect(() => {
    fetch('https://backend-viv4.onrender.com/products')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch("https://backend-viv4.onrender.com/variant/spsosanh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        variant_id: spdachon
      })
    })
      .then(res => res.json())
      .then(data => {
        setdsspsosanh(data);
      })
  })

  if (loading) {
    return <Loading />
  }

  function anthongbao() {
    setThongbao(false);
  }

  const sanPhamDaChon = data.filter(item =>
    spdachon.includes(item.variant_id)
  )

  function xoatatca() {
    setSpdachon([]);
  }

  function close_item(variantId) {
    setSpdachon(prev => prev.filter(id => id !== variantId));
  }

  function sosanhngay() {
    if (spdachon.length < 2) {
      alert("Vui lòng chọn thêm ít nhất 1 sản phẩm nữa để so sánh");
      return;
    }
    else {
      setOpenModal(true)
    }
  }

  function anmodal() {
    setOpenModal(false)
  }

  return (
    <div className='product_container'>
      <div className='tieudesp'>
        <p>SẢN PHẨM NỔI BẬT</p>
      </div>
      <div className='product_list'>

        {
          data.map(item => (
            <Link to={`/chitietsanpham/${item.product_id}?variantId=${item.variant_id}`} className='product_item' key={item.variant_id}>
              <img src={`/${item.image_url}`} />
              <h3 className='product_name'>{item.product_name}</h3>
              <p className='price'>{Number(item.price).toLocaleString('vi-VN')}₫</p>
              <p className='daban'>Đã bán {item.total_sold}</p>
              <div className='khoisosanh' onClick={(e) => { e.preventDefault(); e.stopPropagation() }}>
                <input type="checkbox" onClick={(e) => e.stopPropagation()} checked={spdachon.includes(item.variant_id)} onChange={(e) => {
                  if (e.target.checked) {
                    if (spdachon.length >= 3) {
                      setThongbao(true);
                      return;
                    }

                    setSpdachon((prev) => [...prev, item.variant_id])
                  }
                  else {
                    setSpdachon(prev => prev.filter(id => id !== item.variant_id))
                  }
                }} />
                <div className='thongbaochonsp'>Chọn sản phẩm này để so sánh</div>
                <p>So sánh</p>
              </div>
            </Link>
          ))
        }
        {
          thongbao && (
            <div className="overlay">
              <div className="quabasp">
                <div>Bạn chỉ được chọn 3 sản phẩm để so sánh</div>
                <button onClick={anthongbao}>OK</button>
              </div>
            </div>
          )
        }
        {
          spdachon.length >= 1 && (
            <div className='compare_bar'>
              <div className='compare_bar_item'>

                <div className='dsspdachon'>
                  {
                    sanPhamDaChon.map(item => (
                      <div className='item_compare'>

                        <img src={`/${item.image_url}`} />

                        <div>
                          <h3 className='product_name'>{item.product_name}</h3>
                          <p className='price'>{Number(item.price).toLocaleString('vi-VN')}₫</p>
                        </div>
                        <div className='closesp' onClick={() => close_item(item.variant_id)}>
                          <img src="/close.png" alt="" title="Xóa sp" />
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className='btnsosanh'>
                  <button className='xoatatca' onClick={xoatatca}>Xóa tất cả</button>
                  <button className='sosanhngay' onClick={sosanhngay}>So sánh ngay</button>
                  {
                    openmodal && (
                      <div className='thongtinsosanh_parent'>
                        <div className='thongtinsosanh_child'>
                          <table className='dsspsosanh' border={1}>

                            <tr>
                              <td className="title">Ảnh sản phẩm</td>
                              {dsspsosanh.map(item => (
                                <td key={item.variant_id}>
                                  <img src={`./${item.image_url}`} alt="" width={"100px"} />
                                </td>
                              ))}
                            </tr>

                            <tr>
                              <td className="title">Tên sản phẩm</td>
                              {dsspsosanh.map(item => (
                                <td key={item.variant_id}>{item.product_name}</td>
                              ))}
                            </tr>
                            <tr>
                              <td className="title">Mã máy</td>
                              {dsspsosanh.map(item => (
                                <td key={item.variant_id}>{item.sku}</td>
                              ))}
                            </tr>
                            <tr>
                              <td className="title">Giá</td>
                              {dsspsosanh.map(item => (
                                <td key={item.variant_id}>{Number(item.price).toLocaleString('vi-VN')}₫</td>
                              ))}
                            </tr>
                            <tr>
                              <td className="title">Đã bán</td>
                              {dsspsosanh.map(item => (
                                <td key={item.variant_id}>{item.sldaban}</td>
                              ))}
                            </tr>

                            <tr>
                              <td className="title">RAM</td>
                              {dsspsosanh.map(item => (
                                <td key={item.variant_id}>{item.ram}</td>
                              ))}
                            </tr>

                            <tr>
                              <td className="title">Storage</td>
                              {dsspsosanh.map(item => (
                                <td key={item.variant_id}>{item.storage}</td>
                              ))}
                            </tr>


                            <tr>
                              <td className="title">Mô tả</td>
                              {dsspsosanh.map(item => (
                                <td key={item.variant_id}>{item.description}</td>
                              ))}
                            </tr>

                          </table>
                          <div className='closesp' onClick={anmodal}>
                            <img src="/close.png" alt="" title="Đóng" />
                          </div>
                        </div>

                      </div>
                    )
                  }
                </div>
              </div>

            </div>
          )
        }
      </div>
    </div>
  )
}

export default Product;
