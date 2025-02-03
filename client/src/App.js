import './App.css';
import { Routes, Route } from "react-router-dom";
import { HomePage } from './Pages/HomePage.js';
import { About } from './Pages/About.js';
import { PageNotFound } from './Pages/PageNotFound.js';
import { Register } from './Pages/Auth/Register.js';
import { Login } from './Pages/Auth/Login.js';
import { Dashboard } from './Pages/user/Dashboard.js';
import { Private } from "./components/Routes/Private.js"
import ForgotPasssword from './Pages/Auth/forgotpassword.js';
import { AdminRoute } from './components/Routes/AdminRoute.js';
import { AdminDashboard } from './Pages/Admin/AdminDashboard.js';
import { CreateCategory } from './Pages/Admin/CreateCategory.js';
import { CreateProduct } from './Pages/Admin/CreateProduct.js';
import { Users } from './Pages/Admin/Users.js';
import { Profile } from './Pages/user/Profile.js';
import { Orders } from './Pages/user/Orders.js';
import { Products } from './Pages/Admin/Products.js';
import { UpdateProduct } from './Pages/Admin/UpdateProduct.js';
import { ProductDetails } from './Pages/ProductDetails.js';
import {Categories} from "./Pages/Categories.js";
import { CategoryProduct } from './Pages/CategoryProduct.js';
import { CartPage } from './Pages/CartPage.js';
import { AdminOrders } from './Pages/Admin/AdminOrders.js';

function App() {
  return (
    <>
    <Routes>
      <Route  path="/" element={<HomePage/>} />
      <Route  path="/cart" element={<CartPage/>} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/category/:slug" element={<CategoryProduct />} />
      <Route  path="/register" element={<Register/>} />
      <Route  path="/login" element={<Login/>} />
      <Route  path="/dashboard" element={<Private/>} >
        <Route  path="user" element={<Dashboard/>} />
        <Route  path="user/profile" element={<Profile/>} />
        <Route  path="user/orders" element={<Orders/>} />
      </Route>
      <Route  path="/dashboard" element={<AdminRoute/>} >
        <Route  path="admin" element={<AdminDashboard/>} />
        <Route  path="admin/create-category" element={<CreateCategory/>} />
        <Route  path="admin/create-product" element={<CreateProduct/>} />
        <Route  path="admin/product/:slug" element={<UpdateProduct/>} />
        <Route  path="admin/products" element={<Products/>} />
        <Route  path="admin/users" element={<Users/>} />
        <Route  path="admin/orders" element={<AdminOrders/>} />
      </Route>
      <Route  path="/forgot-password" element={<ForgotPasssword/>} />      
      <Route  path="/about" element={<About/>} />
      <Route  path="*" element={<PageNotFound/>} />
    </Routes>
    </>
  );
}

export default App;
