import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [phone,setphone]=useState("")
    const [address,setaddress]=useState("")
    const [question,setquestion]=useState("")
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const res=await axios.post('/api/v1/auth/register',{name,email,phone,password,address,question})
            if(res.data.success){
                toast.success(res.data.message)
                navigate('/login')
            }
        } catch (err) {
            console.log(err)
            toast.error("Something went wrong")
        }
    }
  return (
    <Layout>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: '80vh',
          backgroundColor: '#f8f9fa',
        }}
      >
        <div
          className="shadow-lg p-5 bg-white rounded"
          style={{ width: '100%', maxWidth: '500px' }}
        >
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="mb-3">
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter your username"
                required
                value={name}
                onChange={(e)=>setname(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
              />
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e)=>setemail(e.target.value)}
              />
            </div>

            {/* Phone Number Field */}
            <div className="mb-3">
              <input
                type="tel"
                id="phone"
                className="form-control"
                placeholder="Enter your phone number"
                pattern="[0-9]{10}"
                required
                value={phone}
                onChange={(e)=>setphone(e.target.value)}
              />
            </div>

            {/* Address Field */}
            <div className="mb-3">
              <textarea
                id="address"
                className="form-control"
                placeholder="Enter your address"
                rows="3"
                required
                value={address}
                onChange={(e)=>setaddress(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-3">
              <textarea
                id="question"
                className="form-control"
                placeholder="what is favourite sports?"
                rows="2"
                required
                value={question}
                onChange={(e)=>setquestion(e.target.value)}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-success w-100">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
