import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import Loading from '../../component/loading/Loading';
import './profile.css';
function Profile(){

    const {id} = useParams();
    console.log("User id la : "+id);
    const [data, setData] = useState(null);
    useEffect(()=>{
        document.title="trang ca nhan";
        fetch(`https://backend-viv4.onrender.com/user/${id}`)
        .then(res =>{
            if (!res.ok){
             throw new Error('Co loi');   
            }
            return res.json();
        })
        .then(data=>{
            setData(data);
        })
        .catch(err => {
        console.error(err);
    });

    }, [id]);
    if(!data)
        return <Loading/>
    return(
        <div className="profile_container">
            <div className="tieude_profile">
                <h1>Hồ Sơ Của Tôi</h1>
                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>
            
            <div className="info_profile">
                <div className="info_trai">
                    <h1>{data.username}</h1>
                    <div className="anh_nguoi_dung">
                        <img src={`/${data.avatar}`}/>
                    </div>
                </div>
                <div className="info_phai">
                    <h1>Các thông tin</h1>
                    <div className="info_phai_item">                      
                        <h3>Tên</h3>
                        <input type="text" value={data.fullname}/>
                   </div>

                    <div className="info_phai_item">
                        <h3>Email</h3>
                        <input type="text" value={data.email}/>
                    </div>

                    <div className="info_phai_item">
                        <h3>Số điện thoại</h3>
                        <input type="text" value={data.phone}/>
                    </div>

                    <div className="info_phai_item">
                        <h3>Địa chỉ</h3>
                        <input type="text" value={data.address}/>
                    </div>
                    <div className="info_phai_item">
                        <h3>Ngày tạo tài khoản</h3>
                        <p>{new Date(data.created_at).toLocaleDateString("vi-VN")}</p>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}

export default Profile;