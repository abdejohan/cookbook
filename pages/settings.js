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
    alignItems: "center",
    flexFlow: "column nowrap",
  },
  form: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column nowrap",
    marginTop: "50px",
    marginBottom: "100px",
  },
  ul: {
    width: "80%",
  },
  deleteBttn: {
    padding: "10px",
  },
  listItem: {
    marginBottom: "30px",
    marginTop: "10px",
    opacity: "0.7",
  },
}));

const Settings = () => {
  const classes = useStyles();
  const router = useRouter();
  const { handleSubmit, register } = useForm();
  const { userData, setUserData } = useContext(UserContext);
  console.log(userData);

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
      router.push(`/profile/${userData.user.id}`);
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
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <ul className={classes.ul}>
          <li className="sec-header">Change Username</li>
          <li className={`list-item ${classes.listItem}`}>
            <TextField
              name="userName"
              id="userName"
              inputRef={register}
              variant="outlined"
              defaultValue={userData.user.userName}
            />
          </li>
          <li className="sec-header">Change Profession</li>
          <li className={`list-item ${classes.listItem}`}>
            <TextField
              name="Profession"
              id="Profession"
              inputRef={register}
              variant="outlined"
              defaultValue={userData.user.profession}
              rows={1}
            />
          </li>
          <li className="sec-header">Change About</li>
          <li className={`list-item ${classes.listItem}`}>
            <TextField
              name="about"
              id="about"
              inputRef={register}
              variant="outlined"
              multiline
              rows={4}
              defaultValue={userData.user.about}
            />
          </li>
        </ul>

        <input type="submit" className="blue-button alt-blue-button" />
      </form>
      <h6 className="sec-header">Delete Account</h6>
      <p className="plain-text">
        Your account and all your saved recipes will disappear
      </p>
      <button
        type="button"
        className="blue-button alt-blue-button"
        onClick={() => {
          DeleteUser();
        }}
      >
        Delete
      </button>
    </Paper>
  );
};

export default Settings;
