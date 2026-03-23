import Product from "../../component/product/Product";
import Banner from '../../component/banner/Banner';

import Footer from "../../component/footer/Footer";
import './home.css';
import { useState, useEffect } from "react";
function Home() {
    const [danhmuc, setDanhmuc] = useState([]);
    useEffect(() => {
        fetch('https://backend-production-f0ff.up.railway.app/categories')
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
                                    <div className="danhmucitem">{item.name}</div>
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