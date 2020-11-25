import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import ListItem from "./ListItem";

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
  const [searchResponseList, setSearchResponseList] = useState([]);
  const [userSearchResponseList, setUserSearchResponseList] = useState([]);

  const handleSearchClick = async () => {
    console.log(searchResponseList);
    console.log(userSearchResponseList);

    const searchElement = document.getElementById("search");
    console.log(searchElement.value);
    try {
      const searchRequest = await axios.get(
        `http://localhost:5000/search?term=${searchElement.value}`
      );

      const userSearchRequest = await axios.get(
        `http://localhost:5000/search/user?term=${searchElement.value}`
      );

      setSearchResponseList(searchRequest.data);
      setUserSearchResponseList(userSearchRequest.data);
    } catch (error) {
      setSearchResponseList(0);
      setUserSearchResponseList(0);
      console.log(`THIS MESSAGE:${error}`);
    }
  };

  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
    }
  });

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
          {searchResponseList.length > 0 && (
            <>
              <ul>
                <h4>Recipes found..</h4>
                <ListItem searchResponseList={searchResponseList} />
              </ul>
            </>
          )}
          {userSearchResponseList.length > 0 && (
            <>
              <ul>
                <h4>Users found..</h4>
                <ListItem userSearchResponseList={userSearchResponseList} />
              </ul>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
