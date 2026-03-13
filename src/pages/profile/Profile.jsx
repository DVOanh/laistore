import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import Loading from '../../component/loading/Loading';
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
        <>
            <img src={`/${data.avatar}`}/>
            <h1>{data.username}</h1>
        </>
    )
}

export default Profile;