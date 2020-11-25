/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import axios from "axios";
import profile from "../../media/profile.jpg";

// import Note from "../Note";

const useStyles = makeStyles(() => ({
  section: {
    display: "flex",
    justifyContent: "center",
    flexFlow: "column wrap",
    alignItems: "center",
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
    flexFlow: "column wrap",
    alignItems: "center",
    width: "70%",
  },
  imageContainer: {
    display: "block",
    borderRadius: "100px",
    height: "200px",
    width: "200px",
    backgroundColor: "red",
  },
}));

const UserProfileView = () => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const { id } = useParams();

  // const { path, url } = useRouteMatch();
  // console.log(`url, ${url}`);
  // console.log(`path, ${path}`);

  useEffect(() => {
    const try1 = async () => {
      try {
        const fetchedUser = await axios.get(`http://localhost:5000/user/${id}`);
        setUser({
          userName: fetchedUser.data.userName,
          email: fetchedUser.data.email,
        });
      } catch (error) {
        console.log(`THIS MESSAGE:${error}`);
      }
    };
    try1();
  }, [id]);

  return (
    <section className={classes.section}>
      <h4>{user.userName}</h4>
      <div className={classes.contentContainer}>
        <img
          className={classes.imageContainer}
          src={profile}
          alt="user profile"
        />
        <h2>Social</h2>
        <ul>
          <li>Totalt Visits:</li>
          <li>Total users:</li>
        </ul>
      </div>
    </section>
  );
};

export default UserProfileView;
