import { useEffect, useState } from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DsspSearch from '../dsspsearch/DsspSearch';
function Header() {
    const [slgh, setSlgh] = useState(0);
    const [user, setUser] = useState(() => {
    
        const storedUser = localStorage.getItem('user');

        return storedUser ? JSON.parse(storedUser) : null;

    }
    );
    const navigate = useNavigate();

    function btnDangxuat() {
        if (!confirm('Ban co muon dang xuat ko')) {
            return;
        }
        else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            window.location.href = "/";
        }
    }

    useEffect(() => {
        if (!user?.user_id) return;
        fetch(`https://backend-viv4.onrender.com/cart/slgh/${user.user_id}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setSlgh(Number(data[0].slsp));
            });
    }, [user?.user_id]);

    console.log(slgh);
    const [keyword, setKeyword] = useState("");
    return (
        <header>
            <div className='head_container'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Link to={'/'} className='logo_link'>
                        <img src="/logo_laistore.png" alt="" style={{ width: '60px' }} />
                        <h1>Lai Store</h1>
                    </Link>

                </div>

                <form >
                    <div className='khoi_search'>
                        <input type="search" className='input_search' placeholder='Tìm kiếm sản phẩm' value={keyword} onChange={(e)=>{setKeyword(e.target.value)}}/>
                        <button className='btn_search'><img src="/search.png" alt=""/></button>
                    </div>
                    <DsspSearch kw={keyword}/>
                </form>

                <div style={{display: 'flex', gap: '20px', alignItems: 'center', height: "100%"}}>
                <Link to={`/giohang/${user?.user_id}`} style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="iconcart">
                            <img src="/shopping-cart.png" alt="" />
                            {slgh > 0 && (
                                <span className="cartcount">{slgh}</span>
                            )}
                        </div>
                    </Link>
                {user ? (
                    <div className='hihi'>
                        <Link to={`/profile/${user.user_id}`} className='user'>
                            <img src={`/${user.avatar}`} />
                            <h5>{user.username}</h5>
                            
                        </Link> 
                        <div className='dr_arrow'>
                            <div className='arrow'></div>
                            <ul className='thaotac'>
                                <li><Link to={`/profile/${user.user_id}`} className='btntaikhoan'>Tài khoản của tôi</Link></li>
                                <li><Link to='/order' className='btndonhang'>Đơn hàng</Link></li>
                                <li><div onClick={btnDangxuat} className='btndangxuat'>Đăng xuất</div></li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link to='/login' className='btndangnhap'>Đăng nhập</Link>
                    </>)
                }
                </div>
            </div>

        </header >
    )
}

export default Header;