/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link, Route, useRouteMatch } from "react-router-dom";
import UserContext from "../context/UserContext";
import SearchList from "./SearchList";
import Note from "./Note";
import frontpageBackground from "../media/frontpageBackground.jpg";
import record from "../media/record.svg";
import notes from "../media/notes.svg";
import pot from "../media/pot.svg";
import file from "../media/file.svg";
import baking from "../media/baking.svg";
// <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
// <div>Icons made by <a href="https://www.flaticon.com/authors/surang" title="surang">surang</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
// <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    padding: "20px",
  },
  newUserInfo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    backgroundImage: `url(${frontpageBackground})`,
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "500px",
    backgroundColor: "transparent",
  },
  article: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "20px",
    borderRadius: "3px",
  },
  iconContainer: {
    padding: "20px 0px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "space-between",
    width: "100%",
  },
  icons: {
    width: "50px",
    height: "50px",
  },
  icon2text: {
    display: "flex",
    alignItems: "center",
    flexFlow: "column nowrap",
  },
  searchContainer: {
    backgroundColor: "#C9DBBA",
    width: "76%",
    flexGrow: "2",
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    padding: "10px",
    borderRadius: "50px",
  },
  searchLabel: {
    display: "flex",
    justifyContent: "center",
    flexFlow: "column nowrap",
    width: "100%",
  },
  searchField: {
    backgroundColor: "#C9DBBA",
    display: "flex",
    border: "none",
    color: "#525252",
    minHeight: "35px",
    fontSize: "1.3rem",
    borderRadius: "30px",
  },
  searchButton: {
    backgroundColor: "grey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "50px",
    color: "white",
    minHeight: "50px",
    borderRadius: "30px",
  },
}));

const Home = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState("");
  const imageArray = [baking, notes, pot, file];
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
      <div className={classes.newUserInfo}>
        <article className={classes.article}>
          <h2>WEOLCOME TEXT</h2>
          <p>display this div to users that are not logged in</p>
          <div className={classes.iconContainer}>
            {imageArray.map((image) => {
              return (
                <div className={classes.icon2text}>
                  <img className={classes.icons} src={image} alt={image.key} />
                  <h1>gg</h1>
                </div>
              );
            })}
          </div>
        </article>
      </div>
      <section className={classes.contentContainer}>
        <div className={classes.searchContainer}>
          <label htmlFor="search" className={classes.searchLabel}>
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
            &rarr;
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
