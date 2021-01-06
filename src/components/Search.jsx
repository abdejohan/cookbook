import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchList from "./SearchList";
import AdminList from "./AdminList";
import UserContext from "../context/UserContext";
import "../App.css";

const useStyles = makeStyles(() => ({
  contentContainer: {
    padding: "30px",
    backgroundColor: "white",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  searchContainer: {
    backgroundColor: "#C9DBBA",
    width: "56%",
    flexGrow: "2",
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    padding: "6px",
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
    fontSize: "1.1rem",
    borderRadius: "20px",
  },
  searchButton: {
    backgroundColor: "grey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "40px",
    color: "white",
    minHeight: "40px",
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
    <section className={`${classes.contentContainer}`}>
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
