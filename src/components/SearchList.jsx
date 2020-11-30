/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  searchField: {
    marginBottom: "20px",
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
    <div>
      <section>
        <div>
          {searchResponseList.length > 0 && (
            <>
              <h4>Recipes found..</h4>
              <ul>
                {searchResponseList.map((searchResult) => {
                  return (
                    <li key={searchResult._id}>
                      <Link to={`/posts/${searchResult._id}`}>
                        {searchResult.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          {userSearchResponseList.length > 0 && (
            <>
              <ul>
                <h4>Users found..</h4>
                {userSearchResponseList.map((searchResult) => {
                  return (
                    <li key={searchResult._id}>
                      <Link to={`/user/${searchResult._id}`}>
                        {searchResult.userName}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchList;
