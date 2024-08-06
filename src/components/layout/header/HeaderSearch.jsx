import React from "react";
import { CiSearch } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import SearchResults from "./SearchResults";

const HeaderSearch = ({ setShowSearch, setSearch, search, data }) => {
  return (
    <div className="search__as-nike">
      <form action="" className="input">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search"
          type="text"
        />
        {search ? (
          <button type="button" onClick={() => setSearch("")}>
            <MdCancel />
          </button>
        ) : (
          <></>
        )}
        <button>
          <CiSearch />
        </button>
      </form>
      <button onClick={() => setShowSearch(false)} className="cancel-btn">
        cancel
      </button>
      {search?.trim() ? <SearchResults data={data} setSearch={setSearch} /> : <></>}
    </div>
  );
};

export default HeaderSearch;
