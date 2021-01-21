/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import axios from "axios";
import YouTubeIcon from "@material-ui/icons/YouTube";
import profile from "../public/profile.jpg";
import UserContext from "../context/UserContext";

const useStyles = makeStyles(() => ({
  paper: {
    padding: "20px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexFlow: "column nowrap",
  },
  outerContainer: {
    padding: "20px",
    justifyContent: "space-between",
    alignItems: "flex-start",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row-reverse",
    maxWidth: "800px",
  },
  profileInfo: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    flexFlow: "row wrap",
    padding: "20px",
  },
  innerContainer: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    flexFlow: "column nowrap",
  },
  article: {
    padding: "20px",
    width: "100%",
    border: "1px solid lightgrey",
    borderRadius: "5px",
  },
  imageContainer: {
    display: "block",
    borderRadius: "50%",
    height: "300px",
    width: "300px",
    backgroundColor: "red",
  },
  userName: {
    fontSize: "3rem",
    letterSpacing: "-3px",
    width: "200px",
  },
  headerText: {
    color: "#e3d081",
    fontSize: "1.6rem",
    opacity: "0.7",
  },
  numberText: {
    color: "darkgrey",
    fontSize: "1.2rem",
    fontWeight: "900",
    alignSelf: "flex-end",
    marginLeft: "10px",
  },
  imgText: {
    fontWeight: "700",
    opacity: "0.8",
    fontSize: "1.4rem",
  },
  imgValue: {
    display: "flex",
    alignItems: "center",
    opacity: "0.7",
    fontWeight: "300",
    fontSize: "1rem",
    marginBottom: "10px",
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "row wrap",
  },
  chef: {
    marginBottom: "-20px",
    paddingLeft: "5px",
  },
  about: {
    width: "100%",
    lineHeight: "1em",
    marginBottom: "10px",
  },
}));

const User = (props) => {
  const [user, setUser] = useState({});
  const { userData } = useContext(UserContext);
  const classes = useStyles();
  // eslint-disable-next-line react/prop-types
  const { loggedInUserId } = props;
  const router = useRouter();
  const { searchedUserId } = router.query;

  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchedUser = await axios.get(
          `http://localhost:5000/user/${loggedInUserId || searchedUserId}`
        );
        setUser(fetchedUser.data);
      } catch (error) {
        console.log(`THIS MESSAGE:${error}`);
      }
    };
    getUser();
  }, [loggedInUserId, searchedUserId]);

  return (
    <section className={classes.paper}>
      <section className={classes.profileInfo}>
        <img
          className={classes.imageContainer}
          src={profile}
          alt="user profile"
        />
        <ul>
          <li className={`${classes.imgValue} ${classes.chef}`}>Chef</li>
          <li className={classes.userName}>{user.userName}</li>
          <li className={classes.imgText}>Profession</li>
          <li className={classes.imgValue}>{user.profession}</li>
          <li className={classes.imgText}>Member since</li>
          <li className={classes.imgValue}>
            {user.createdAt && user.createdAt.slice(0, 10)}
          </li>
          <li className={classes.imgText}>Platforms</li>
          <li className={classes.imgValue}>
            <YouTubeIcon fontSize="large" />
            <a href="https://www.youtube.com">youtube.com/</a>
          </li>
        </ul>
        {searchedUserId &&
          userData.token &&
          searchedUserId !== userData.user.id && (
            <div className={classes.buttonContainer}>
              <button
                className="alt-blue-button blue-button"
                name="follow"
                type="button"
                onClick={() => {
                  console.log("followed!");
                }}
              >
                Follow
              </button>
              <button
                className="alt-blue-button blue-button"
                name="library"
                type="button"
                onClick={() => {
                  console.log("recipes HERE!");
                }}
              >
                Recipes
              </button>
            </div>
          )}
      </section>
      <section className={classes.outerContainer}>
        <article className={classes.article}>
          <h4 className={`page-header ${classes.about}`}>About</h4>
          <p className="plain-text">{userData.user.about}</p>
        </article>
        <div className={classes.innerContainer}>
          <h2 className={classes.headerText}>Account</h2>
          <ul>
            <li className="list-item">
              Recipes <span className={classes.numberText}>0</span>
            </li>
            <li className="list-item">
              Followers <span className={classes.numberText}>0</span>
            </li>
          </ul>
        </div>
        <div className={classes.innerContainer}>
          <h2 className={classes.headerText}>Follows</h2>
          <ul>
            <li className="list-item">
              Recipes <span className={classes.numberText}>0</span>
            </li>
            <li className="list-item">
              Chefs <span className={classes.numberText}>0</span>
            </li>
          </ul>
        </div>
        <div className={classes.innerContainer}>
          <h2 className={classes.headerText}>Progress</h2>
          <ul>
            <li className="list-item">
              Weekly: <span className={classes.numberText}>N/A </span>
            </li>
            <li className="list-item">
              Monthly: <span className={classes.numberText}>N/A </span>
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
};

export default User;
