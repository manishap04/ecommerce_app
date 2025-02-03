import React from "react";
import axios from "axios";
import { useSearch } from "../../context/Search.js";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="d-flex align-items-center" onSubmit={handleSubmit} style={{ maxWidth: "400px", width: "100%" }}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search..."
        aria-label="Search"
        value={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        style={{ height: "38px", flex: 1, maxWidth: "150px", minWidth: "150px" }}
      />
    </form>
  );
};
