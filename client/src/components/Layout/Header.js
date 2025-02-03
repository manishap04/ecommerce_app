import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { SearchInput } from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const navigate=useNavigate()
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#f97316" }}>
        <div className="container-fluid">
          {/* Application Name */}
          <NavLink className="navbar-brand text-white" to="/">
            <img
              src="https://static.vecteezy.com/system/resources/previews/016/471/452/non_2x/abstract-modern-ecommerce-logo-ecommerce-logo-design-shop-logo-design-template-creative-ecommerce-logo-vector.jpg"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top m-2"
            />
            Ecommerce-app
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <SearchInput />
              {/* Nav Links */}
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/about">
                  About Us
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle text-white"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </NavLink>
                <ul className="dropdown-menu ">
                  <li>
                    <NavLink className="dropdown-item" to={"/categories"}>
                      All Categories
                    </NavLink>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white" to="/register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle text-white"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                      <li>
                        <NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role===1 ? "admin" : "user"}`}>
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <NavLink to="/cart" className="nav-link text-white">
                    Cart({cart?.length})
                </NavLink>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
