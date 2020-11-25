/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link, Route, useRouteMatch } from "react-router-dom";
import UserContext from "../context/UserContext";
import SearchList from "./SearchList";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  searchField: {
    marginBottom: "20px",
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

  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
    }
  });

  const handleClick = () => {
    const searchElement = document.getElementById("search");
    setSearchInput(searchElement.value);
  };

  return (
    <div>
      <section>
        <div className={classes.searchField}>
          <label htmlFor="search">
            Search for User or Recipe
            <input id="search" type="text" placeholder="Search" />
            <Link onClick={handleClick} to="/search">
              Skicka
            </Link>
          </label>
        </div>
        <Route exact path="/search">
          <SearchList searchInput={searchInput} />
        </Route>
      </section>
    </div>
  );
};

export default Home;
