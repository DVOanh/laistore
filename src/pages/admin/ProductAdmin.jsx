import { Outlet } from "react-router-dom";
import Product_list_admin from "./component_admin/Product_list_admin";
function ProductAdmin() {
    return (
        <div>
           <Outlet/>
        </div>
    )
}

export default ProductAdmin;