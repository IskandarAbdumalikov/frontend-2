import React from "react";
import { Link } from "react-router-dom";

const SearchResults = ({ data, setSearch, isError }) => {
  if (isError) {
    return (
      <div className="search-results">
        <Link>По данному запросу информации не найдено</Link>
      </div>
    );
  }

  return (
    <div className="search-results">
      {data?.map((item) => (
        <Link
          onClick={() => setSearch("")}
          to={`/product/${item.id}`}
          className="search-results__item"
          key={item.id}
        >
          <img src={item.images[0]} alt="" />
          <p>{item.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
