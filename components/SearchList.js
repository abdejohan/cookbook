/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "flex-start",
  },
  resultsContainer: {
    paddingTop: "0px",
    margin: "20px",
    marginTop: "0px",
  },
  text: {
    opacity: "0.4",
    position: "relative",
    top: "-10px",
    left: "-20px",
    fontSize: "1rem !important",
  },
  flexContainer: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
  },
}));

const SearchList = (props) => {
  const { searchInput } = props;
  const [searchResponseList, setSearchResponseList] = useState([]);
  const [userSearchResponseList, setUserSearchResponseList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const searchRequest = await axios.get(
          `https://cookbook-db.herokuapp.com/search?term=${searchInput}`
        );
        const userSearchRequest = await axios.get(
          `https://cookbook-db.herokuapp.com/search/user?term=${searchInput}`
        );
        console.log(userSearchRequest);
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
      <h5 className={`plain-text ${classes.text}`}>search results..</h5>
      <div className={classes.flexContainer}>
        {searchResponseList.length > 0 ? (
          <div className={classes.resultsContainer}>
            <h4 className="sec-header">recipes</h4>
            <ul>
              {searchResponseList.map((searchResult) => {
                return (
                  <li className="list-item" key={searchResult._id}>
                    <Link
                      href={{
                        pathname: "/post",
                        query: { postId: searchResult._id },
                      }}
                    >
                      {searchResult.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div>
            <p className="plain-text">
              No recipes found...{" "}
              <span role="img" aria-label="sad smilie">
                😞
              </span>{" "}
            </p>
          </div>
        )}
        {userSearchResponseList.length > 0 ? (
          <div className={classes.resultsContainer}>
            <h4 className="sec-header">chefs</h4>
            <ul>
              {userSearchResponseList.map((searchResult) => {
                return (
                  <li className="list-item" key={searchResult._id}>
                    <Link
                      href={{
                        pathname: "/user",
                        query: { searchedUserId: searchResult._id },
                      }}
                    >
                      {searchResult.userName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div>
            <p className="plain-text">
              No users found...{" "}
              <span role="img" aria-label="sad smilie">
                😞
              </span>{" "}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchList;
