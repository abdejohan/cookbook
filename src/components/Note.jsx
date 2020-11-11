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
    width: "100%",
    justifyContent: "center",
  },
  form: {
    width: "100%",
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "flex-start",
  },
  textarea: {
    padding: "10px",
    width: "100%",
    height: "300px",
  },
  textFieldHeader: {
    marginTop: "20px",
    marginBottom: "5px",
  },
  ingredients: {
    height: "300px",
  },
  instructions: {
    height: "300px",
  },
  submitBttn: {
    marginTop: "20px",
    padding: "10px 60px",
    alignSelf: "flex-end",
  },
}));

const Note = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Typography variant="h4">Create Note</Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Typography className={classes.textFieldHeader}>Ingredients</Typography>
        <textarea
          className={(classes.ingredients, classes.textarea)}
          name="ingredients"
          placeholder="Write ingredients in a list format"
        />
        <Typography className={classes.textFieldHeader}>
          Instructions
        </Typography>
        <textarea
          className={(classes.instructions, classes.textarea)}
          name="instructions"
          placeholder="Try and give as clear and direct instructions"
        />
        <input
          type="submit"
          className={classes.submitBttn}
          value="Generate &#x21E8;"
        />
      </form>
    </div>
  );
};

export default Note;
