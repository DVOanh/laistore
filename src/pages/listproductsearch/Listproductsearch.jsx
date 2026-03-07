import { useParams } from "react-router-dom";

function Listproductsearch(){
    const {product_id} = useParams();
    return(
        <h1>{`Product ID: ${product_id}`}</h1>
    )
}
export default Listproductsearch;