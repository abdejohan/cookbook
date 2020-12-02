import React, { useContext, useEffect } from "react";
import { Link, useRouteMatch, Route, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";
// import Note from "./Note";
import UserContext from "../context/UserContext";
import Library from "./profilePages/Library";
import Settings from "./profilePages/Settings";
import UserProfileView from "./profilePages/UserProfileView";

const useStyles = makeStyles(() => ({
  navigationContainer: {
    width: "100%",
  },
  navigationList: {
    display: "flex",
    flexFlow: "row wrap",
    listStyleType: "none",
  },
  navigationButton: {
    marginRight: "20px",
  },
  navigationLink: {
    fontSize: "20px",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  const { url, path } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    if (userData.user) {
      if (userData.user.role === "admin") {
        history.push("/admin");
      }
    }
  }, [history, userData.user]);

  return (
    <>
      {userData.token ? (
        <section className={classes.navigationContainer}>
          <nav>
            <ul className={classes.navigationList}>
              <li className={classes.navigationButton}>
                <Link
                  className={`navigationLink ${classes.navigationLink}`}
                  to={`${url}/${userData.user.id}`}
                >
                  Overview
                </Link>
              </li>
              <li className={classes.navigationButton}>
                <Link
                  className={`navigationLink ${classes.navigationLink}`}
                  to={`${url}/library`}
                >
                  Library
                </Link>
              </li>
              <li className={classes.navigationButton}>
                <Link
                  className={`navigationLink ${classes.navigationLink}`}
                  to={`${url}/settings`}
                >
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
          <Route exact path={`${path}/${userData.user.id}`}>
            <UserProfileView />
          </Route>
          <Route path={`${path}/library`}>
            <Library />
          </Route>
          <Route path={`${path}/settings`}>
            <Settings />
          </Route>
        </section>
      ) : (
        <p>there is nothing here right now.. :disappointed: try logging in!</p>
      )}
    </>
  );
};

export default Profile;
