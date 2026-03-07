import Header from './component/header/Header';
import Product from './component/product/Product';
import Footer from './component/footer/Footer';
import Login from './pages/login/Login';
import Register from './pages/regester/Register';
import Product_detail from './pages/product_detail/Product_detail';
import Cart from './pages/cart/Cart';
import ProtectedRouter from './component/ProtectedRouter';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';
import Listproductsearch from './pages/listproductsearch/Listproductsearch';
import ScrollToTop from './component/scrolltoTop/ScrollToTop';
import Checkout from './pages/checkout/Checkout';
import Order from './pages/order/Order';
import OrderStatus from './component/order_status/OrderStatus';
import Dashboard from './pages/admin/Admin';
import AdminLayout from './layout/AdminLayout';
import MainLayout from './layout/MainLayout';

import MainAdmin from './pages/admin/MainAdmin';
import ProductAdmin from './pages/admin/ProductAdmin';
import OrderAdmin from './pages/admin/OrderAdmin';
import UserAdmin from './pages/admin/UserAdmin';
import Product_list_admin from './pages/admin/component_admin/Product_list_admin';
import Add_product_admin from './pages/admin/component_admin/Add_product_admin';
import Edit_product_admin from './pages/admin/component_admin/Edit_product_admin';
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/chitietsanpham/:id' element={<Product_detail />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/dsspsearch/:product_id' element={<Listproductsearch />} />
          <Route path='/order' element={<Order />}>
            <Route path="/order" element={<OrderStatus />} />
            <Route path=":status_id" element={<OrderStatus />} />
          </Route>

          <Route path='/giohang/:user_id' element={
            <ProtectedRouter>
              <Cart />
            </ProtectedRouter>
          } />
          <Route path='/checkout/:id' element={
            <ProtectedRouter>
              <Checkout />
            </ProtectedRouter>
          } />
        </Route>

        <Route path='/admin' element={<AdminLayout />}>
          
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<MainAdmin />} />
            <Route path='products' element={<ProductAdmin/>}>
              <Route index element={<Product_list_admin/>}/>
              <Route path='add' element={<Add_product_admin/>}/>
              <Route path='edit/:product_id' element={<Edit_product_admin/>}/>
            </Route>
            <Route path='orders' element={<OrderAdmin/>}/>
            <Route path='users' element={<UserAdmin/>}/>
          </Route>
        </Route>

      </Routes>

      <ToastContainer />
    </BrowserRouter>
  )
}

export default App;
