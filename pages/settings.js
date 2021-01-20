import React, { useContext } from "react";
import { Typography, Paper } from "@material-ui/core";
import { useRouter } from "next/router";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import UserContext from "../context/UserContext";

// import Note from "../Note";

const useStyles = makeStyles(() => ({
  paper: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    flexFlow: "column nowrap",
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
  const { handleSubmit, register } = useForm();
  const { userData, setUserData } = useContext(UserContext);

  const onSubmit = async (data) => {
    const dataSend = data;
    Object.keys(dataSend).forEach(
      (k) => !dataSend[k] && dataSend[k] !== undefined && delete dataSend[k]
    );
    try {
      await axios.patch("http://localhost:5000/user/update", dataSend, {
        headers: {
          "x-auth-token": userData.token,
        },
      });
      // router.push(`/profile/${userData.user.id}`);
    } catch (error) {
      console.log(`THIS MESSAGE:${error}`);
    }
  };

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
      <h6 className="sec-header">Delete Account</h6>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          <li className="sec-header">Change Username</li>
          <li className={`list-item ${classes.listItem}`}>
            <TextField
              name="userName"
              id="userName"
              inputRef={register}
              variant="filled"
              value={userData.user.userName}
            />
          </li>
          <li className="sec-header">Change Profession</li>
          <li className={`list-item ${classes.listItem}`}>
            <TextField
              name="Profession"
              id="Profession"
              inputRef={register}
              variant="filled"
              value={userData.user.profession}
              rows={1}
            />
          </li>
          <li className="sec-header">Change About</li>
          <li className={`list-item ${classes.listItem}`}>
            <TextField
              name="about"
              id="about"
              inputRef={register}
              variant="filled"
              multiline
              rows={4}
              value={userData.user.about}
            />
          </li>
        </ul>

        <input type="submit" />
      </form>
    </Paper>
  );
};

export default Settings;
