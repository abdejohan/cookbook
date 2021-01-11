/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "90%",
    padding: "20px",
  },
  contentContainer: {
    width: "100%",
  },
  title: {
    fontSize: "1.3rem",
  },
  listContainer: {
    width: "100%",
    paddingLeft: "0px",
    listStyleType: "none",
  },
  listItem: {
    color: "#525252",
    border: "1px solid lightgrey",
    borderRadius: "30px",
    marginBottom: "5px",
    padding: "10px 15px",
    display: "flex",
    justifyContent: "center",
    flexFlow: "column nowrap",
    width: "100%",
    fontSize: "1.1rem",
    textDecoration: "none",
  },
}));

const SearchList = (props) => {
  const { searchInput } = props;
  const [searchResponseList, setSearchResponseList] = useState([]);
  const [userSearchResponseList, setUserSearchResponseList] = useState([]);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const searchRequest = await axios.get(
          `http://localhost:5000/search?term=${searchInput}`
        );
        console.log(searchRequest);
        const userSearchRequest = await axios.get(
          `http://localhost:5000/search/user?term=${searchInput}`
        );

        setSearchResponseList(searchRequest.data);
        setUserSearchResponseList(userSearchRequest.data);
      } catch (error) {
        console.log(`THIS MESSAGE:${error}`);
      }
    };
    getSearchResults();
  }, [searchInput]);

  return (
    <section className={classes.mainContainer}>
      {searchResponseList.length > 0 && (
        <div className={classes.contentContainer}>
          <h4 className={classes.title}>Recipes found..</h4>
          <ul className={classes.listContainer}>
            {searchResponseList.map((searchResult) => {
              return (
                <li key={searchResult._id}>
                  <Link
                    className={classes.listItem}
                    to={`/posts/${searchResult._id}`}
                  >
                    {searchResult.title}
                    {searchResult.postOwner}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {userSearchResponseList.length > 0 && (
        <div className={classes.contentContainer}>
          <h4 className={classes.title}>Users found..</h4>
          <ul className={classes.listContainer}>
            {userSearchResponseList.map((searchResult) => {
              return (
                <li key={searchResult._id}>
                  <Link
                    className={classes.listItem}
                    to={`/user/${searchResult._id}`}
                  >
                    {searchResult.userName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
};

export default SearchList;
