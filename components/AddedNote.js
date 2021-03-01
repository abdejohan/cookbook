/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import UserContext from "../context/UserContext";

const useStyles = makeStyles(() => ({
  collapseContainer: {
    backgroundColor: "lightblue",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column nowrap",
    borderRadius: "0px 0px 30px 30px",
  },
  fadedtext: {
    opacity: "0.8",
    fontSize: ".8rem",
  },
  plusMinusBttn: {
    padding: "10px",
    fontSize: "1rem",
    margin: "10px",
  },
}));

const AddedNote = (props) => {
  const { noteLink } = props;
  const classes = useStyles();
  const { userData } = useContext(UserContext);

  return (
    <section className={classes.collapseContainer}>
      <h4 style={{ paddingBottom: "10px" }}>
        Success!{" "}
        <span role="img" aria-label="star">
          ⭐
        </span>{" "}
        Here is your Link:
      </h4>
      <span className="noteLink">
        https://u11-fullstack-c0k39qdes.vercel.app/post?postId={noteLink}
      </span>
      <button className={`buttonEffect ${classes.plusMinusBttn}`} type="button">
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
    </section>
  );
};

export default AddedNote;
