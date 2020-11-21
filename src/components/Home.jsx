/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useHistory, Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import UserContext from "../context/UserContext";
import Note from "./Note";
import Posts from "./Posts";
import Login from "./Login";
import Profile from "./Profile";

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
  // const theme = useTheme();
  const [value, setValue] = useState(0);
  const [searchResponseList, setSearchResponseList] = useState([]);

  const handleSearchClick = async () => {
    const searchElement = document.getElementById("search");
    try {
      const searchRequest = await axios.get(
        `http://localhost:5000/search?term=${searchElement.value}`
      );
      setSearchResponseList(searchRequest.data);
    } catch (error) {
      console.log(`THIS MESSAGE:${error}`);
    }
  };

  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
    }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <section>
        <div className={classes.searchField}>
          <label htmlFor="search">
            Search for User or Recipe
            <input id="search" type="text" placeholder="Search" />
            <button type="submit" onClick={handleSearchClick}>
              Skicka
            </button>
          </label>
        </div>
        <div>
          <ul id="resultsContainer">
            {searchResponseList ? (
              searchResponseList.map((searchResult) => {
                return (
                  <li key={searchResult._id}>
                    <Link to={`/posts/${searchResult._id}`}>
                      {searchResult.title}
                    </Link>
                  </li>
                );
              })
            ) : (
              <Note />
            )}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
