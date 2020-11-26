/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link, Route, useRouteMatch } from "react-router-dom";
import UserContext from "../context/UserContext";
import SearchList from "./SearchList";
import Note from "./Note";

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    backgroundColor: "white",
    width: "100%",
  },
  newUserInfo: {
    backgroundColor: "transparent",
  },
  searchContainer: {
    width: "100%",
    flexGrow: "2",
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  searchLabel: {
    display: "flex",
    flexFlow: "column nowrap",
    width: "100%",
  },
  searchField: {
    display: "flex",
    flexGrow: 2,
  },
  searchButton: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Home = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState("");
  // const theme = useTheme();
  // const { path, url } = useRouteMatch();
  // console.log(`path, ${path}`);

  // useEffect(() => {
  //  if (!userData.user) {
  //    history.push("/login");
  //  }
  // });

  const handleClick = () => {
    const searchElement = document.getElementById("search");
    setSearchInput(searchElement.value);
  };

  return (
    <>
      {userData.token === undefined && (
        <div className={classes.newUserInfo}>
          <h2>WEOLCOME TEXT</h2>
          <p>display this div to users that are not logged in</p>
        </div>
      )}
      <section className={classes.contentContainer}>
        <div className={classes.searchContainer}>
          <label htmlFor="search" className={classes.searchLabel}>
            Search for User or Recipe
            <input
              className={classes.searchField}
              id="search"
              type="text"
              placeholder="Search"
            />
          </label>
          <Link
            onClick={handleClick}
            to="/search"
            className={classes.searchButton}
          >
            Skicka
          </Link>
        </div>
        <Route exact path="/search">
          <SearchList searchInput={searchInput} />
        </Route>
        <Note />
      </section>
    </>
  );
};

export default Home;
