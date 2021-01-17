import React, { useContext } from "react";
import { Typography, Paper } from "@material-ui/core";
import { useRouter } from "next/router";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../context/UserContext";

// import Note from "../Note";

const useStyles = makeStyles(() => ({
  paper: {
    padding: "20px",
  },
  deleteBttn: {
    padding: "10px",
  },
  listItem: {
    marginBottom: "20px",
  },
}));

const Settings = () => {
  const classes = useStyles();
  const router = useRouter();
  const { userData, setUserData } = useContext(UserContext);

  const DeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5000/user/delete`, {
        headers: {
          "x-auth-token": userData.token,
        },
      });
      router.push("/");
      setTimeout(() => {
        setUserData({
          token: undefined,
          user: undefined,
        });
        localStorage.setItem("auth-token", "");
      }, 1000);
    } catch (error) {
      console.log(`THIS MESSAGE:${error}`);
    }
  };

  return (
    <Paper elevation={0} className={classes.paper}>
      <Typography className="page-header">Account settings</Typography>
      <ul>
        <li className="sec-header">Delete Account</li>
        <li className={`list-item ${classes.listItem}`}>
          <p className="plain-text">
            Your account and all your saved recipes will disapear
          </p>
          <button
            type="button"
            className={classes.deleteBttn}
            onClick={() => {
              DeleteUser();
            }}
          >
            Delete
          </button>
        </li>
        <li className="sec-header">Change Username</li>
        <li className={`list-item ${classes.listItem}`}>
          <p className="plain-text">
            Your account and all your saved recipes will disapear
          </p>
          <button
            type="button"
            className={classes.deleteBttn}
            onClick={() => {
              console.log("gg");
            }}
          >
            Delete
          </button>
        </li>
        <li className="sec-header">Change Profession</li>
        <li className={`list-item ${classes.listItem}`}>
          <p className="plain-text">
            Your account and all your saved recipes will disapear
          </p>
          <button type="button" className={classes.deleteBttn}>
            Delete
          </button>
        </li>
        <li className="sec-header">Change Location</li>
        <li className={`list-item ${classes.listItem}`}>
          <p className="plain-text">
            Your account and all your saved recipes will disapear
          </p>
          <button type="button" className={classes.deleteBttn}>
            Delete
          </button>
        </li>
      </ul>
    </Paper>
  );
};

export default Settings;
