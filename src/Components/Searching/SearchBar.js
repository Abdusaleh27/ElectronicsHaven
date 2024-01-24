import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ currentQuery }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    query !== "" && query && navigate(`/search/${query + "&page=1"}`);
  };
  useEffect(() => {
    currentQuery && setQuery(currentQuery);
  }, [currentQuery]);
  const handleChange = async (e) => {
    let { value } = e.target;
    setQuery(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row my-3">
        <div className="mb-3 col-sm-7 col-lg-6 col-xl-4">
          <input
            type="text"
            className=""
            id="search-bar"
            aria-describedby="searchBar"
            placeholder={`Search for products`}
            value={query}
            onChange={handleChange}
          />
        </div>

        <div className="d-grid col-sm-auto d-sm-block">
          <button type="submit" className="btn-primary">
            Search
          </button>
          <br />
          <br />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
