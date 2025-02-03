import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price*item.quantity;
      });
      return total;
    } catch (error) {
      console.log(error);
      return "Rs.0.00";
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    const existing=cart.findIndex((item)=> item._id==pid);
    let updatedCart;
    if(existing!=-1){
      if(cart[existing].quantity>1){
      updatedCart = cart.map((item, index) =>
        index === existing ? { ...item, quantity: item.quantity - 1 } : item
      );}
      else{
        updatedCart = cart.filter((item) => item._id !== pid);
      }
    }
    setCart(updatedCart)
  };
  
  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const orderData={cart, user: auth?.user?._id,total:totalPrice()};
      const {data}=await axios.post("/api/v1/product/make-order",orderData)
      if(data?.success){
        localStorage.removeItem("cart");
        setCart([]);
        toast.success("order placed successfully!");
        navigate("/dashboard/user/orders");
      }else{
        toast.error(data?.message || "order could not be placed");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <Layout>
      <div className="container mt-4">
        <h2 className="text-center mb-4">
          {auth?.user ? `Hello, ${auth.user.name}!` : "Hello, Guest!"}
        </h2>
        <p className="text-center text-muted">
          {cart?.length
            ? `You have ${cart.length} items in your cart`
            : "Your cart is empty"}
        </p>

        <div className="row">
          {/* Cart Items */}
          <div className="col-md-8">
            {cart.length > 0 ? (
              cart.map((p) => (
                <div className="card mb-3 shadow-sm p-3" key={p._id}>
                  <div className="row g-0">
                    <div className="col-md-4 text-center">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="img-fluid rounded"
                        alt={p.name}
                        style={{ maxHeight: "130px", objectFit: "cover" }}
                      />
                    </div>
                    <div className="col-md-5">
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-title">{p.quantity}</p>
                        <p className="fw-bold">Price: {p.price}</p>
                      </div>
                    </div>
                    <div className="col-md-3 d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h5 className="text-center text-muted">Your cart is empty</h5>
            )}
          </div>

          {/* Cart Summary */}
          <div className="col-md-4 mb-2">
            <div className="card p-3 shadow-sm">
            <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="m-2">
                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                    >
                     Make Payment
                    </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
