import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Add_product_admin(){
    const [preview, setPreview] = useState("");
    //select tu 2 bang
    const [brand, setBrand] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    //value
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [mota, setMota] = useState("");
    const [danhmuc, setDanhmuc] = useState("");
    const [nhanhieu, setNhanhieu] = useState("");


    
    function handleImage(e){
        const file = e.target.files[0];
        const fileName = file.name;
        setImage(fileName);
        console.log("Ten anh: "+fileName);
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
    }

    function themsanpham(e){
        e.preventDefault();
        fetch("http://localhost:3000/products/insert_pr_admin", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                product_name: name,
                mota: mota,
                danhmuc: danhmuc,
                nhanhieu: nhanhieu,
                anh: image
            })
        })
        .then(res=>res.json())
        .then(data=>{
            alert(data.message);
            navigate('/admin/dashboard/products');
        })
    }

    useEffect(()=>{
        fetch ('http://localhost:3000/categories')
        .then(res=>res.json())
        .then(data=>{
            setCategories(data);
        })
    }, []);

    useEffect(()=>{
        fetch ('http://localhost:3000/brand')
        .then(res=>res.json())
        .then(data=>{
            setBrand(data);
        })
    }, []);

    return(
        <div>
            
            <form className="form_themsp" onSubmit={themsanpham}>
                <h1 className="title_addproduct">Nhập thông tin sản phẩm</h1>
                <label htmlFor="">Tên sản phẩm</label>
                <input type="text" placeholder="Mời bạn nhập tên sản phẩm" value={name} onChange={e=> setName(e.target.value)}/>
                <label htmlFor="">Ảnh sản phẩm</label>
                
                {
                    preview && (
                        <img src={preview} alt="" width={"100px"}/>
                    )
                }
                <input type="file" onChange={handleImage}/>
                
                <label htmlFor="">Chọn danh mục</label>
                
                <select value={danhmuc} onChange={e=>setDanhmuc(e.target.value)}>
                    {
                        categories.map(cate=>(
                            <option value={cate.danhmuc_id}>{cate.name}</option>
                        ))
                    }
                </select>
                
                <label htmlFor="">Chọn tên nhãn hàng</label>
               
                <select value={nhanhieu} onChange={e=>setNhanhieu(e.target.value)}>
                    {
                        brand.map(br=>(
                            <option value={br.id}>{br.name}</option>
                        ))
                    }
                </select>
                
                <label htmlFor="">Mô tả</label>
                
                <textarea type="text" placeholder="Nhập mô tả" value={mota} onChange={e=>setMota(e.target.value)}/>
               
                <button className="btn_themsp_admin" type="submit">Thêm sản phẩm</button>
            </form>
        </div>
    )
}

export default Add_product_admin;