/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link, Route, useRouteMatch } from "react-router-dom";
import UserContext from "../context/UserContext";
import SearchList from "./SearchList";
import Note from "./Note";
import frontpageBackground from "../media/frontpageBackground.jpg";

// color: #f00;
// -webkit-filter: invert(100%);
// filter: invert(100%);//

// Images
import record from "../media/record.svg";
import notes from "../media/notes.svg";
import merge from "../media/merge.svg";
import share from "../media/share.svg";
import baking from "../media/baking.svg";

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    padding: "20px",
    borderRadius: "30px",
    top: "-50px",
    position: "relative",
  },
  newUserInfo: {
    zIndex: "-2",
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
    visibility: "hidden",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    flexFlow: "column nowrap",
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    marginBottom: "50px",
    borderRadius: "3px",
    color: "#25252",
    fontSize: "1rem",
    fontStyle: "italic",
  },
  articleSubText: {
    padding: "0px",
    margin: "0px",
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
  ulList: {
    listStyleType: "none",
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  listImg: {
    width: "20px",
    height: "20px",
    marginRight: "20px",
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
    marginLeft: "20px",
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
  hr: {
    marginTop: "100px",
    width: "100%",
    height: "30px",
    borderStyle: "solid",
    borderColor: "#095484",
    borderWidth: "1px 0 0 0",
    borderRadius: "20px",
  },
  hr2: {
    display: "block",
    content: "",
    height: "30px",
    width: "100%",
    marginTop: "20px",
    borderStyle: "solid",
    borderColor: "#095484",
    borderWidth: "0 0 1px 0",
    borderRadius: "20px",
  },
}));

const Home = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState("");
  const imageArray = [
    {
      id: 0,
      title: "Create",
      img: record,
    },
    {
      id: 1,
      title: "Document",
      img: notes,
    },
    {
      id: 2,
      title: "merge",
      img: merge,
    },
    {
      id: 3,
      title: "Share!",
      img: share,
    },
  ];

  const handleClick = () => {
    const searchElement = document.getElementById("search");
    setSearchInput(searchElement.value);
  };

  return (
    <>
      <div className={classes.newUserInfo}>
        <article className={classes.article}>
          <ul className={classes.ulList}>
            <li>
              <img className={classes.listImg} src={baking} alt="cooking hat" />
              Help structuring content
            </li>
            <li>
              <img className={classes.listImg} src={baking} alt="cooking hat" />
              Lifelong virtual storage of your favorite recipes
            </li>
            <li>
              <img className={classes.listImg} src={baking} alt="cooking hat" />
              Find inspriation
            </li>
          </ul>
          <p className={classes.articleSubText}>
            Either if you are someone thats looking to present your content
            nicely to your followers. Or looking for way to store your recipes
            Or simply just a foodie at heart{" "}
            <span role="img" aria-label="emoji heart">
              ❤️
            </span>
            , we think you will find bakeNOTES useful! Enjoy
          </p>
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
        <hr className={classes.hr} />
        <Route exact path="/search">
          <SearchList searchInput={searchInput} />
        </Route>
        <div className={classes.iconContainer}>
          {imageArray.map((image) => {
            return (
              <div key={image.id} className={classes.icon2text}>
                <img
                  className={classes.icons}
                  src={image.img}
                  alt={image.key}
                />
                <h2>{image.title}</h2>
              </div>
            );
          })}
        </div>
        <Note />
        <hr className={classes.hr2} />
      </section>
    </>
  );
};

export default Home;
