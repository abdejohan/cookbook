/* eslint-disable no-unused-vars */
import React from "react";
// import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
// mport { makeStyles, useTheme } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
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
    width: "95%",
    margin: "0 auto",
    padding: "20px",
    marginTop: "20px",
    minHeight: "1000px",
    justifyContent: "flex-start",
  },
  form: {
    height: "80%",
    flexGrow: "2",
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textField: {
    minWidth: "400px",
    marginBottom: "20px",
  },
  card: {
    flexGrow: "1",
    display: "flex",
    flexFlow: "column nowrap",
  },
  section: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "20px",
  },
}));

const Register = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h1">Register</Typography>
      <section className={classes.section}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className={classes.form}
        >
          <Typography variant="subtitle1" display="block" aling="left">
            Select Username
          </Typography>
          <TextField
            className={classes.textField}
            name="username"
            inputRef={register}
            id="outlined-basic"
            label="Ex. StevesGems"
            variant="outlined"
          />

          <Typography variant="subtitle1" display="block" aling="left">
            Select Password (must be more than 6 caracters)
          </Typography>
          <TextField
            className={classes.textField}
            name="password"
            inputRef={register}
            id="outlined-basic"
            label="**********"
            variant="outlined"
          />
          <Typography variant="subtitle1" display="block" aling="left">
            Enter your emailadress (optional)
          </Typography>
          <TextField
            className={classes.textField}
            name="email"
            inputRef={register}
            id="outlined-basic"
            label="Ex. steve@gmail.com"
            variant="outlined"
          />

          <input type="submit" />
        </form>
        <Card className={classes.card}>
          <Typography>As a registerd user:</Typography>
          <p>
            You will have your own outlet for your culinary work You will have
            your own outlet for your culinary work You will have your own outlet
            for your culinary work You will have your own outlet for your
            culinary work
          </p>
        </Card>
      </section>
    </Paper>
  );
};

export default Register;
