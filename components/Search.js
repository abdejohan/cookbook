import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchList from "./SearchList";
import AdminList from "./AdminList";
import UserContext from "../context/UserContext";

const useStyles = makeStyles(() => ({
  contentContainer: {
    padding: "30px 0px",
    backgroundColor: "white",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  searchContainer: {
    backgroundColor: "#C9DBBA",
    width: "100%",
    minWidth: "300px",
    flexGrow: "2",
    display: "flex",
    justifyContent: "center",
    padding: "6px",
    borderRadius: "50px",
  },
  searchLabel: {
    display: "flex",
    justifyContent: "center",
    flexFlow: "column nowrap",
    flexGrow: "2",
  },
  searchField: {
    lineHeight: "33px",
    margin: "0px 6px",
    backgroundColor: "#C9DBBA",
    paddingLeft: "10px",
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
    width: "40px",
    color: "white",
    height: "40px",
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
