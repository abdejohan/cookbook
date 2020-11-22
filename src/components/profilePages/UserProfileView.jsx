import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
  const userName = "username";

  return (
    <section className={classes.section}>
      <h2>{userName}</h2>
      <div className={classes.contentContainer}>
        <img
          className={classes.imageContainer}
          src={profile}
          alt="user profile"
        />
        <h2>Social</h2>
        <ul>
          <li>Totalt Visits:</li>
          <li>Total Posts:</li>
        </ul>
      </div>
    </section>
  );
};

export default UserProfileView;
