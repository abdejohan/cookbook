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
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    padding: "20px",
  },
  resultsContainer: {
    padding: "20px",
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
          `http://localhost:5000/search?term=${searchInput}`
        );
        const userSearchRequest = await axios.get(
          `http://localhost:5000/search/user?term=${searchInput}`
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
    </section>
  );
};

export default SearchList;
