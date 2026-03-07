import Product from "../../component/product/Product"; 
import Banner from '../../component/banner/Banner';

import Footer from "../../component/footer/Footer";
import './home.css';
function Home(){
    return(
        <div className="container">
            <div className="banner">
                <Banner/>
            </div>
            <Product/>
        </div>
    )
}

export default Home;