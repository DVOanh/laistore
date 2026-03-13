import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
function Edit_product_admin() {
    //select tu 2 bang
    const [brand, setBrand] = useState([]);
    const [categories, setCategories] = useState([]);
    const [variant, setVariant] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('backend-production-f0ff.up.railway.app/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            })
    }, []);

    useEffect(() => {
        fetch('backend-production-f0ff.up.railway.app/brand')
            .then(res => res.json())
            .then(data => {
                setBrand(data);
            })
    }, []);

    const [product, setProduct] = useState({});
    const [sanpham, setSanpham] = useState([]);
    const { product_id } = useParams();
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");
    //Modal
    //Modal
    const [modalStatus, setModalStatus] = useState(false);
    useEffect(() => {
        fetch(`backend-production-f0ff.up.railway.app/admin/product/${product_id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data[0]);
                setImage(data[0].image_url);
            });
    }, [product_id]);

    function editproduct(e) {
        e.preventDefault();
        if (confirm('Bạn chắc chắn muốn sửa?')) {
            fetch(`backend-production-f0ff.up.railway.app/admin/productedit/${product_id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: product.product_name,
                    mota: product.description,
                    danhmuc_id: product.danhmuc_id,
                    brand_id: product.brand_id,
                    anh: image
                })
            })
                .then(res => res.json())
                .then(data => {
                    alert(data.message);
                    navigate('/admin/dashboard/products')
                });
        }
    }

    function handleImage(e) {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const fileName = file.name;
        setImage(fileName);
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
    }

    useEffect(() => {
        fetch("backend-production-f0ff.up.railway.app/admin/variant")
            .then(res => res.json())
            .then(data => {
                setVariant(data);
            });
    }, []);

    useEffect(() => {
        fetch("backend-production-f0ff.up.railway.app/admin/get_product")
            .then(res => res.json())
            .then(data => {
                setSanpham(data);
            })
    }, [])

    function btnsetModal() {
        setModalStatus(true);
    }

    function hidenModal() {
        setModalStatus(false)
    }

    const [pricebt, setPricebt] = useState(0);
    const [stockbt, setStockbt] = useState(0);
    const [storagebt, setStoragebt] = useState("");
    const [rambt, setRambt] = useState("");
    const [skubt, setSkubt] = useState("");
    function thembienthe(){
        fetch (`backend-production-f0ff.up.railway.app/admin/insert_variant/${product_id}`, {
            method: 'POST',
            headers: {
                'Content-Type' : "application/json"
            },
            body: JSON.stringify({
                price: pricebt,
                stock: stockbt,
                storage: storagebt,
                ram: rambt,
                sku: skubt
            })
        })
        .then(res=>res.json())
        .then(data=>{
            alert(data.message);
            setModalStatus(false)
        })
    }

    function btnxoabt(){
        alert ('xoa');
    }
    const [productbt, setProductbt] = useState("");
    return (
        <div>
            <form onSubmit={editproduct} className="form_edit_product">
                <h1>SỬA THÔNG TIN SẢN PHẨM</h1>

                <label htmlFor="">Tên sản phẩm</label>
                <br />
                <input type="text" value={product.product_name || ""} onChange={e => setProduct({ ...product, product_name: e.target.value })} />
                <br />
                <label htmlFor="">Ảnh sản phẩm</label>
                <br />
                {
                    preview ? <img src={preview} width={"100px"} /> : <img src={`/${product.image_url} `} width={"100px"} />

                }

                <br />
                <input type="file" onChange={handleImage} />

                <br />
                <label htmlFor="">Danh mục</label>
                <br />
                <select value={Number(product?.danhmuc_id) || ""}>

                    {
                        categories.map(cate => (
                            <option key={cate.danhmuc_id} value={Number(cate.danhmuc_id)} >{cate.name}</option>
                        ))
                    }
                </select>
                <br />
                <label htmlFor="">Nhãn hiệu</label>
                <br />
                <select value={product.brand_id}>
                    {
                        brand.map(br => (
                            <option key={br.id} value={Number(br.id)} >{br.name}</option>
                        ))
                    }
                </select>
                <br />
                <label htmlFor="">Mô tả</label>
                <br />
                <textarea value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })}></textarea>
                <br />
                <button type="submit">Cập nhật</button>
            </form>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "15px" }}><h1 className="h1_title">DANH SÁCH BIẾN THỂ</h1><button type="button" onClick={btnsetModal} className="btn_thembt">Thêm biến thể</button></div>
                <table className="product_table">
                    <tr className="title">
                        <th>Product ID</th>
                        <th>Ảnh sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Storage</th>
                        <th>RAM</th>
                        <th>Giá</th>
                        <th>Kho</th>
                        <th>Thao tác</th>
                    </tr>

                    {
                        variant.map(v => (
                            <tr>
                                <td>{v.product_id}</td>
                                <td><img src={`/${v.image_url}`} alt="" width={"100px"} /></td>
                                <td>{v.product_name}</td>
                                <td>{v.storage}</td>
                                <td>{v.ram}</td>
                                <td>{Number(v.price).toLocaleString('vi-VN')}đ</td>
                                <td>{v.stock}</td>
                                <td>
                                    <button className="btn_edit">Sửa</button>
                                    <button className="btn_delete" onClick={btnxoabt}>Xóa</button>
                                </td>
                            </tr>
                        ))
                    }

                </table>
            </div>
            {
                modalStatus && (
                    <div className="modal_container">
                        <div className="modal">
                            <form className="form_themsp">
                                <h1>NHẬP THÔNG TIN BIẾN THỂ</h1>
                                <label htmlFor="">Tên sản phẩm</label>

                                <select value={productbt} onChange={(e)=>setProductbt(e.target.value)}>
                                    {
                                        sanpham.map(sp => (
                                            <option key={sp.product_id} value={sp.product_id}>{sp.product_name}</option>
                                        ))
                                    }
                                </select>

                                <label htmlFor="">Giá sản phẩm</label>

                                <input type="number" placeholder="Nhập giá sản phẩm" value={pricebt} onChange={(e)=>setPricebt(e.target.value)}/>

                                <label htmlFor="">Kho</label>

                                <input type="number" placeholder="Nhập số lượng kho" value={stockbt} onChange={(e)=>setStockbt(e.target.value)}/>

                                <label htmlFor="">Storage</label>

                                <select name="storage" value={storagebt} onChange={(e)=>setStoragebt(e.target.value)}>
                                    <option value="128GB">128GB</option>
                                    <option value="256GB">256GB</option>
                                    <option value="512GB">512GB</option>
                                    <option value="1TB">1TB</option>
                                </select>

                                <label htmlFor="">RAM</label>

                                <select name="ram" value={rambt} onChange={(e)=>setRambt(e.target.value)}>
                                    <option value="4GB">4GB</option>
                                    <option value="6GB">6GB</option>
                                    <option value="8GB">8GB</option>
                                    <option value="12GB">12GB</option>
                                    <option value="16GB">16GB</option>
                                </select>
                                <label htmlFor="">Mã định danh sản phẩm</label>

                                <input type="text" placeholder="Nhập mã định danh sản phẩm" value={skubt} onChange={(e)=>setSkubt(e.target.value)}/>
                            </form>
                            <div style={{ display: 'flex', justifyContent: 'right', gap: '10px' }}>
                                <button onClick={hidenModal} className="btn_huy">Hủy</button>

                                <button className="btn_thembt" type="button" onClick={thembienthe}>Thêm</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Edit_product_admin;