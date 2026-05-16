import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Product_list_admin() {
    const nav = useNavigate();
    const [product, setProduct] = useState([]);
    function del_product_admin(product_id) {
        if (confirm('Bạn muốn xóa sản phẩm này?')) {
            fetch(`https://backend-viv4.onrender.com/products/product_admin/${product_id}`, {
                method: 'DELETE',

            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    // alert(data.message);
                    setProduct(prev => prev.filter(p => p.product_id !== product_id));
                });
        }
        return;
    }
    useEffect(() => {
        fetch('https://backend-viv4.onrender.com/products/product_admin')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setProduct(data);
            })
    }, []);

    return (
        <div className="table-container">
            <div className="tieude_pd_admin">
                <h1>Sản phẩm</h1>
                <button className="btnthem" onClick={() => nav('add')}>Thêm sản phẩm</button>
            </div>
            <br />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ảnh sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá thấp nhất</th>
                        <th>Tổng tồn kho</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.map(item => (
                            <tr>
                                <td>{item.product_id}</td>
                                <td><img src={`/${item.image_url}`} alt="" className="product_image_admin" /></td>
                                <td>{item.product_name}</td>
                                <td>{Number(item.min_price).toLocaleString('vi-VN')}đ</td>
                                <td>{item.total_stock}</td>
                                <td >
                                    <button onClick={() => nav(`edit/${item.product_id}`)} className="btn-update">Sửa</button>
                                    <button onClick={() => del_product_admin(item.product_id)} type="button" className="btn-delete" style={{ marginLeft: 10 }}>Xóa</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Product_list_admin;