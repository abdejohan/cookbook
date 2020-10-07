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

const useStyles = makeStyles((theme) => ({
  paper: {
    alignItems: "center",
    display: "flex",
  },
}));

const Note = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="restrun"
          inputRef={register}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />

        <input name="example" defaultValue="test" ref={register} />

        <input name="exampleRequired" ref={register({ required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </Paper>
  );
};

export default Note;
