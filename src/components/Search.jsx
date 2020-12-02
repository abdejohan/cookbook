import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchList from "./SearchList";
import AdminList from "./AdminList";
import UserContext from "../context/UserContext";

const useStyles = makeStyles(() => ({
  searchContainer: {
    backgroundColor: "#C9DBBA",
    width: "76%",
    flexGrow: "2",
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    padding: "10px",
    borderRadius: "50px",
  },
  searchLabel: {
    display: "flex",
    justifyContent: "center",
    flexFlow: "column nowrap",
    width: "100%",
  },
  searchField: {
    marginLeft: "20px",
    backgroundColor: "#C9DBBA",
    display: "flex",
    border: "none",
    color: "#525252",
    minHeight: "35px",
    fontSize: "1.3rem",
    borderRadius: "30px",
  },
  searchButton: {
    backgroundColor: "grey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "50px",
    color: "white",
    minHeight: "50px",
    borderRadius: "30px",
  },
}));

const Search = () => {
  const [searchInput, setSearchInput] = useState(null);
  const classes = useStyles();
  const [role, setRole] = useState(null);
  const { userData } = useContext(UserContext);

  const handleClick = () => {
    const searchElement = document.getElementById("search");
    setSearchInput(searchElement.value);
  };

  useEffect(() => {
    if (userData.user) {
      setRole(userData.user.role);
    }
  }, [role, userData.user]);

  return (
    <section className={classes.contentContainer}>
      <div className={classes.searchContainer}>
        <label htmlFor="search" className={classes.searchLabel}>
          <input
            className={classes.searchField}
            id="search"
            type="text"
            placeholder="Search"
          />
        </label>
        <button
          onClick={handleClick}
          type="submit"
          className={classes.searchButton}
        >
          &rarr;
        </button>
      </div>
      {searchInput !== null && role !== "admin" && (
        <SearchList searchInput={searchInput} />
      )}
      {searchInput !== null && role === "admin" && (
        <AdminList searchInput={searchInput} />
      )}
      <hr className={classes.hr} />
    </section>
  );
};

export default Search;
