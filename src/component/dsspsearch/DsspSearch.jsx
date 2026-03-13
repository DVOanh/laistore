import { useState, useEffect } from "react";
import './dsspsearch.css';
import {Link} from 'react-router-dom';
function DsspSearch({ kw }) {
    const [dssp, setDssp] = useState([]);

    useEffect(() => {
        fetch(`backend-production-f0ff.up.railway.app/products/search-suggest?keyword=${kw}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setDssp(data);
            })
    }, [kw]);
    if (!dssp.length) return null;
    return (
        <div className="searchlist">
            {dssp.map(item => (
                <Link to={`/dsspsearch/${item.product_id}`} className="searchItem" key={item.product_id}>
                    {item.product_name}
                </Link>
            ))}
        </div>
    )
}

export default DsspSearch;