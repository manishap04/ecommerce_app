import React from "react";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/Auth";

export const AdminDashboard = () => {
    const [auth] = useAuth();

    return (
        <Layout>
            <div className="container mt-4">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-md-3">
                        <div className="bg-light p-3 rounded shadow">
                            <AdminMenu />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-md-9">
                    <div className="card-body p-3">
                                <div className="mb-3">
                                    <strong className="text-secondary">Admin Name:</strong>
                                    <span className="ms-2">{auth?.user?.name}</span>
                                </div>
                                <div className="mb-3">
                                    <strong className="text-secondary">Admin Email:</strong>
                                    <span className="ms-2">{auth?.user?.email}</span>
                                </div>
                                <div>
                                    <strong className="text-secondary">Admin Contact:</strong>
                                    <span className="ms-2">{auth?.user?.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Layout>
    );
};
