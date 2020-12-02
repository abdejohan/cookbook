import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Paper from "@material-ui/core/Paper";
// import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import UserContext from "../context/UserContext";

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
    maxWidth: "1000px",
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textField: {
    width: "100%",
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "20px",
  },
  inputFieldTitles: {
    display: "flex",
    alignSelf: "flex-start",
  },
}));

const Register = () => {
  const { register, handleSubmit, errors } = useForm();
  const { setUserData } = useContext(UserContext);
  const { userData } = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (userData.user) {
      history.push("/");
    }
  }, [history, userData.user]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    console.log(data);
    try {
      await axios.post("http://localhost:5000/user/register", data);
      const loginRes = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/profile");
    } catch (error) {
      console.log(`THIS MESSAGE:${error}`);
    }
  };
  return (
    <Paper className={classes.paper}>
      <Typography variant="h1">Register</Typography>
      <section className={classes.section}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className={classes.form}
        >
          <Typography variant="subtitle1" className={classes.inputFieldTitles}>
            Enter Email
          </Typography>
          <TextField
            className={classes.textField}
            name="email"
            inputRef={register({ required: true })}
            id="outlined-basic"
            label="Ex. steve@gmail.com"
            variant="outlined"
          />
          {errors.email && <span>This field is required</span>}

          <Typography variant="subtitle1" className={classes.inputFieldTitles}>
            Select Username
          </Typography>
          <TextField
            className={classes.textField}
            name="userName"
            inputRef={register}
            id="outlined-basic"
            label="Ex. StevesGems"
            variant="outlined"
          />
          {errors.userName && <span>This field is required</span>}

          <select name="role" ref={register}>
            <option value="Normal user">Normal user</option>
            <option value="Content Creator">Content Creator</option>
            <option value="Sponsor">Sponsor</option>
          </select>

          <Typography variant="subtitle1" className={classes.inputFieldTitles}>
            Select Password (must be more than 6 caracters)
          </Typography>
          <TextField
            className={classes.textField}
            name="password"
            inputRef={register({ required: true })}
            id="outlined-basic"
            label="**********"
            variant="outlined"
          />
          {errors.password && <span>This field is required</span>}

          <Typography variant="subtitle1" className={classes.inputFieldTitles}>
            Enter password again
          </Typography>
          <TextField
            className={classes.textField}
            name="passwordCheck"
            inputRef={register({ required: true })}
            id="outlined-basic"
            label="**********"
            variant="outlined"
          />
          {errors.passwordCheck && <span>This field is required</span>}

          <input type="submit" />
        </form>
      </section>
    </Paper>
  );
};

export default Register;
