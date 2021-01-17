/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import YouTubeIcon from "@material-ui/icons/YouTube";
import UserContext from "../context/UserContext";
import profile from "../public/profile.jpg";

const useStyles = makeStyles(() => ({
  paper: {
    padding: "10px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexFlow: "row wrap",
  },
  outerContainer: {
    paddingTop: "30px",
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
    display: "flex",
    justifyContent: "center",
    flexFlow: "column nowrap",
    padding: "20px",
  },
  imageContainer: {
    display: "block",
    borderRadius: "50%",
    height: "300px",
    width: "300px",
    backgroundColor: "red",
  },
  userName: {
    fontFamily: "Poppins, sans-serif !important",
    fontSize: "3rem",
    letterSpacing: "-3px",
    width: "200px",
  },
  headerText: {
    fontFamily: "Poppins, sans-serif !important",
    alignSelf: "flex-end",
    color: "#e3d081",
    fontSize: "2rem",
    opacity: "0.7",
  },
  numberText: {
    fontFamily: "Poppins, sans-serif !important",
    color: "darkgrey",
    fontSize: "1.2rem",
    fontWeight: "900",
    alignSelf: "flex-end",
    marginLeft: "10px",
  },
  about: {
    alignSelf: "flex-end",
    marginBottom: "0px !important",
    fontSize: "2rem !important",
  },
  ul: {
    listStyleType: "none",
    padding: "0px 20px",
    fontSize: "1.5rem",
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
}));

const UserProfileView = (props) => {
  // eslint-disable-next-line react/prop-types
  const { userId } = props;
  const classes = useStyles();
  const [user, setUser] = useState({});
  const { userData } = useContext(UserContext);
  const { role } = userData.user;

  useEffect(() => {
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
      <div className={classes.profileInfo}>
        <img
          className={classes.imageContainer}
          src={profile}
          alt="user profile"
        />
        <ul className={classes.ul}>
          <li className={classes.userName}>{user.userName}</li>
          <li className={classes.imgText}>Profession</li>
          <li className={classes.imgValue}>Pastry Chef</li>
          <li className={classes.imgText}>Member since</li>
          <li className={classes.imgValue}>January 2018</li>
          <li className={classes.imgText}>Platforms</li>
          <li className={classes.imgValue}>
            <YouTubeIcon fontSize="large" />
            <a href="https://www.youtube.com">youtube.com/StaceyCooks</a>
          </li>
        </ul>
      </div>
      <div className={classes.outerContainer}>
        <article className={classes.innerContainer + classes.article}>
          <h4 className={`page-header ${classes.about}`}>About</h4>
          <p className="plain-text">
            I started From A Chef’s Kitchen in 2014 to share my passion for
            cooking and food. Here, I share easy, creative gourmet recipes from
            my kitchen. My recipes are inspired by ingredients I already have on
            hand or what’s in season at the market. I include plenty of tips and
            information to help you succeed in making each dish.
          </p>
        </article>
        <div className={classes.innerContainer}>
          <h2 className={classes.headerText}>Account</h2>
          <ul>
            <li className="list-item">
              Totalt Recipes: <span className={classes.numberText}>25</span>
            </li>
            <li className="list-item">
              Total Followers: <span className={classes.numberText}>1 436</span>
            </li>
          </ul>
        </div>
        <div className={classes.innerContainer}>
          <h2 className={classes.headerText}>Social</h2>
          <ul>
            <li className="list-item">
              Totalt Visits: <span className={classes.numberText}>18 439</span>
            </li>
            <li className="list-item">
              Total Followers: <span className={classes.numberText}>1784</span>
            </li>
            <li className="list-item">
              Recipes to clipboard:{" "}
              <span className={classes.numberText}>340</span>
            </li>
          </ul>
        </div>
        <div className={classes.innerContainer}>
          <h2 className={classes.headerText}>Progress</h2>
          <ul>
            <li className="list-item">
              Weekly: <span className={classes.numberText}>12 </span>
            </li>
            <li className="list-item">
              Monthly: <span className={classes.numberText}>93 </span>
            </li>
          </ul>
        </div>
      </div>
    </Paper>
  );
};

export default UserProfileView;
