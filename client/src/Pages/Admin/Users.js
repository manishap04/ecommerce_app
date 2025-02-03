import React, { useState, useEffect } from "react";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);

  // Get all products
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/get-users");
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
     <Layout>
          <div className="container-fluid m-3 p-3 dashboard">
            <div className="row">
              <div className="col-md-3">
                <AdminMenu/>
              </div>
              <div className="col-md-9">
              <h1 className="text-center mb-4">All Users List</h1>
          <div className="d-flex flex-wrap justify-content-center">
            {users?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link text-decoration-none"
              >
                <div 
                  className="card m-3 shadow-sm" 
                  style={{ width: "18rem", height: "15rem", borderRadius: "10px", overflow: "hidden", transition: "0.3s" }}
                >
                  <div className="card-body text-center bg-light" style={{ height: "2rem" }}>
                    <h5 className="card-title text-dark fw-bold">{p.name}</h5>
                    <p className="card-text text-secondary" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.email}</p>
                    <p className="card-text text-secondary" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.address}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
              </div>
              </div>
            </div>
        </Layout>
  )
}
