import Product from "../../component/product/Product";
import Banner from '../../component/banner/Banner';

import Footer from "../../component/footer/Footer";
import './home.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Home() {
    const [danhmuc, setDanhmuc] = useState([]);
    useEffect(() => {
        fetch('https://backend-viv4.onrender.com/categories')
            .then(res => res.json())
            .then(data => setDanhmuc(data));
    }, []);
    return (
        <div className="container">
            <div className="banner_danhmuc">
                <div className="banner">
                    <Banner />
                </div>
                <div className="danhmuccontainer">
                    <h1 className="tieude_danhmuc">DANH MỤC</h1>
                    <div className="danhmuclist">
                        
                            {
                                danhmuc.map(item=>(
                                    <Link to={`/categories/${item.danhmuc_id}`} className="danhmucitem" >
                                        
                                        <div className="anhdanhmuc">
                                            <img src={`/${item.image_url}`} alt=""/>
                                        </div>
                                        
                                        <div className="tendanhmuc">{item.name}</div>
                                    </Link>
                                ))
                            }
                        </div>
                </div>
            </div>
            <Product />
        </div>
    )
}

export default Home;