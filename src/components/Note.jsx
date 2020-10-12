/* eslint-disable no-unused-vars */
import React from "react";
// import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
// mport { makeStyles, useTheme } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  paper: {
    alignItems: "center",
    display: "flex",
    flexFlow: "column nowrap",
    width: "80%",
    margin: "0 auto",
    marginTop: "100px",
    minHeight: "500px",
    justifyContent: "center",
  },
  form: {
    width: "80%",
    height: "80%",
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textField: {
    width: "80%",
    marginBottom: "20px",
  },
  content: {
    height: "300px",
  },
}));

const Note = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h1">Create Note</Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <TextField
          className={classes.textField}
          name="title"
          inputRef={register}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />

        <TextField
          className={classes.textField}
          name="content"
          inputRef={register}
          inputProps={{ className: classes.content }}
          id="outlined-basic"
          label="Enter your text here.. ."
          variant="outlined"
        />

        <input type="submit" />
      </form>
    </Paper>
  );
};

export default Note;
