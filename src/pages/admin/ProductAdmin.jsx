import { Outlet } from "react-router-dom";
import Product_list_admin from "./component_admin/Product_list_admin";
import { useEffect } from "react";
function ProductAdmin() {
    useEffect(() => {
                document.title = "Quản lý sản phẩm";
            }, []);
    return (
        <div>
           <Outlet/>
        </div>
    )
}

export default ProductAdmin;