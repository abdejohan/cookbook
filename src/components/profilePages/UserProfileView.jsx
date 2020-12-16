/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import axios from "axios";
import UserContext from "../../context/UserContext";
import profile from "../../media/profile.jpg";

const useStyles = makeStyles(() => ({
  paper: {
    flexGrow: 2,
    margin: "10px",
    backgroundColor: "#FDFFFC",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    flexFlow: "column wrap",
    alignItems: "center",
  },
  contentContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexFlow: "column wrap",
  },
  imageContainer: {
    display: "block",
    borderRadius: "100px",
    height: "200px",
    width: "200px",
    backgroundColor: "red",
  },
  mainText: {
    fontSize: "1.4rem",
  },
  subText: {
    color: "darkgrey",
    fontSize: "1.2rem",
  },
}));

const UserProfileView = () => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchedUser = await axios.get(`http://localhost:5000/user/${id}`);
        setUser(fetchedUser.data);
      } catch (error) {
        console.log(`THIS MESSAGE:${error}`);
      }
    };
    getUser();
  }, [id]);

  return (
    <Paper elevation={3} className={classes.paper}>
      <h4>{user.userName}</h4>
      <div className={classes.contentContainer}>
        <img
          className={classes.imageContainer}
          src={profile}
          alt="user profile"
        />
        <h2>Social</h2>
        <article>
          <p className={classes.mainText}>
            Totalt Visits: <span className={classes.subText}>250 000</span>
          </p>
          <p className={classes.mainText}>
            Total Followers: <span className={classes.subText}>3 000</span>
          </p>
        </article>
      </div>
    </Paper>
  );
};

export default UserProfileView;
