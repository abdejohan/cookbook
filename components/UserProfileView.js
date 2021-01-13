/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import UserContext from "../context/UserContext";
import profile from "../public/profile.jpg";

const useStyles = makeStyles(() => ({
  paper: {
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  outerContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    display: "flex",
    flexFlow: "row wrap",
    maxWidth: "800px",
  },
  innerContainer: {
    display: "flex",
    justifyContent: "center",
    flexFlow: "column nowrap",
    padding: "20px",
  },
  imageContainer: {
    display: "block",
    borderRadius: "100px",
    height: "200px",
    width: "200px",
    backgroundColor: "red",
  },
  userName: {
    padding: "10px 0px",
    fontSize: "2rem",
    alignSelf: "center",
    width: "200px",
  },
  headerText: {
    alignSelf: "flex-end",
  },
  mainText: {
    fontSize: "1.2rem",
    fontFamily: "inherit",
    display: "flex",
    justifyContent: "space-between",
  },
  subText: {
    color: "darkgrey",
    fontSize: "1rem",
    alignSelf: "flex-end",
  },
}));

const UserProfileView = (props) => {
  // eslint-disable-next-line react/prop-types
  const { userId } = props;
  console.log(userId);
  const classes = useStyles();
  const [user, setUser] = useState({});
  const { userData } = useContext(UserContext);
  const { role } = userData.user;

  useEffect(() => {
    console.log("hej");
    const getUser = async () => {
      try {
        const fetchedUser = await axios.get(
          `http://localhost:5000/user/${userId}`
        );
        setUser(fetchedUser.data);
      } catch (error) {
        console.log(`THIS MESSAGE:${error}`);
      }
    };
    getUser();
  }, [userId]);

  return (
    <Paper elevation={1} className={classes.paper}>
      <div className={classes.innerContainer}>
        <img
          className={classes.imageContainer}
          src={profile}
          alt="user profile"
        />
        <ul style={{ listStyleType: "none" }}>
          <li className={classes.userName}>{user.userName}</li>
          <li className={classes.mainText}>
            Member since:<span className={classes.subText}>246</span>
          </li>
          <li className={classes.mainText}>
            Role: <span className={classes.subText}>{role}</span>
          </li>
        </ul>
      </div>
      <div className={classes.outerContainer}>
        <div className={classes.innerContainer}>
          <h2 className={classes.headerText}>Account</h2>
          <p className={classes.mainText}>
            Totalt Recipes: <span className={classes.subText}>25</span>
          </p>
          <p className={classes.mainText}>
            Total Followers: <span className={classes.subText}>1 436</span>
          </p>
        </div>
        <div className={classes.innerContainer}>
          <h2 className={classes.headerText}>Social</h2>
          <p className={classes.mainText}>
            Totalt Visits: <span className={classes.subText}>18 439</span>
          </p>
          <p className={classes.mainText}>
            Total Followers: <span className={classes.subText}>1784</span>
          </p>
          <p className={classes.mainText}>
            Recipes to clipboard: <span className={classes.subText}>340</span>
          </p>
        </div>
        <div className={classes.innerContainer}>
          <h2 className={classes.headerText}>Progress</h2>
          <p className={classes.mainText}>
            Weekly: <span className={classes.subText}>12 Followers</span>
          </p>
          <p className={classes.mainText}>
            Monthly: <span className={classes.subText}>93 Followers</span>
          </p>
        </div>
      </div>
    </Paper>
  );
};

export default UserProfileView;
