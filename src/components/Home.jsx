import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import UserContext from "../context/UserContext";
import Note from "./Note";
import Login from "./Login";
import Search from "./Search";
// import SideNotes from "./SideNotes";
import UserProfileView from "./profilePages/UserProfileView";
import "../App.css";

import youtube from "../media/youtube.svg";
import folder from "../media/folder.svg";
// backgroundImage: `url(${mobileImage})`,

const useStyles = makeStyles(() => ({
  contentContainer: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: "30px",
    position: "relative",
  },
  components: {
    width: "100%",
    flexFlow: "column nowrap",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sideways: {
    padding: "20px",
    backgroundColor: "white",
    paddingLeft: "0px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column nowrap",
    marginBottom: "50px",
  },
  textContainer: {
    marginBottom: "100px",
  },
  headText: {
    fontSize: "4rem",
    fontWeight: "900",
  },
  subText: {
    fontSize: "2rem",
    fontWeight: "600",
    color: "#666666",
    lineHeight: "1.6",
  },
  subText1: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#666666",
    lineHeight: "1.6",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexFlow: "column nowrap",
  },
  iconRows: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "row nowrap",
  },
  icon: {
    margin: "20px",
    width: "50px",
    height: "50px",
  },
}));

const Home = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (userData.user) {
      if (userData.user.role === "admin") {
        history.push("/admin");
      }
    }
  }, [history, userData.token, userData.user]);

  return (
    <>
      <Search />
      <section className={classes.contentContainer}>
        <div className={classes.components}>
          {userData.token && <UserProfileView />}
          <div className={classes.sideways}>
            <p className={classes.textContainer}>
              <Typography className={classes.headText} variant="h4">
                YOU CREATE, WE STORE!
              </Typography>
              <Typography className={classes.subText}>
                FORT NOX FOR RECIPES ONLINE.
              </Typography>
              <div className={classes.iconContainer}>
                <div className={classes.iconRows}>
                  <img
                    className={classes.icon}
                    src={youtube}
                    alt="youtube-icon"
                  />
                  <Typography className={classes.subText1} variant="body2">
                    LET&apos;S YOU FOCUS ON CREATING CONTENT
                  </Typography>
                </div>
                <div className={classes.iconRows}>
                  <img
                    className={classes.icon}
                    src={folder}
                    alt="folder-icon"
                  />
                  <Typography className={classes.subText1} variant="body2">
                    LIFE LONG STORAGE OF RECIPE COLLECTIONS
                  </Typography>
                </div>
              </div>
            </p>
            <Note />
          </div>
          {!userData.token && <Login />}
        </div>
      </section>
    </>
  );
};

export default Home;
