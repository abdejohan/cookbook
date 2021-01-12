/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import UserContext from "../context/UserContext";

const useStyles = makeStyles(() => ({
  collapseContainer: {
    marginTop: "20px",
    backgroundColor: "#F3DFA2",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column nowrap",
  },
  fadedtext: {
    display: "contents",
    opacity: "0.5",
  },
}));

const AddedNote = (props) => {
  const { noteLink } = props;
  const classes = useStyles();
  const { userData } = useContext(UserContext);

  return (
    <div className={classes.collapseContainer}>
      <h3>Success! share this link:</h3>
      <span className={`noteLink ${classes.noteLink}`}>
        http://localhost:3000/posts/{noteLink}
      </span>
      <button className={classes.plusMinusBttn} type="button">
        Copy to clipboard
      </button>
      {!userData.token && (
        <p className={classes.fadedtext}>
          This link will be available for 48h. Remember to{" "}
          <Link href="/register">Register</Link> and{" "}
          <Link href="/login">Login</Link> to keep your content available for as
          long as you like :)
        </p>
      )}
    </div>
  );
};

export default AddedNote;
