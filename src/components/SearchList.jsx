/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import SearchItem from "./SearchItem";

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
  const { userData } = useContext(UserContext);

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
        setSearchResponseList(0);
        setUserSearchResponseList(0);
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
              <ul>
                <h4>Recipes found..</h4>
                <SearchItem searchResponseList={searchResponseList} />
              </ul>
            </>
          )}
          {userSearchResponseList.length > 0 && (
            <>
              <ul>
                <h4>Users found..</h4>
                <SearchItem userSearchResponseList={userSearchResponseList} />
              </ul>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchList;
