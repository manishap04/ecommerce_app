import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [question,setquestion] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        question,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot Password - Ecommerce APP"}>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
          <form onSubmit={handleSubmit}>
            <h4 className="text-center mb-4 text-primary">RESET PASSWORD</h4>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your Email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="securityAnswer" className="form-label">
                Security Question: Favorite Sport Name
              </label>
              <input
                type="text"
                value={question}
                onChange={(e) => setquestion(e.target.value)}
                className="form-control"
                id="securityAnswer"
                placeholder="Enter Your Favorite Sport"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your New Password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              RESET
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
