import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import UserContext from "../context/UserContext";

const useStyles = makeStyles(() => ({
  paper: {
    alignItems: "center",
    display: "flex",
    flexFlow: "column nowrap",
    margin: "0 auto",
    padding: "20px",
    marginTop: "20px",
    justifyContent: "flex-start",
  },
  form: {
    height: "80%",
    flexGrow: "2",
    maxWidth: "1000px",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textField: {
    width: "100%",
    marginBottom: "20px",
  },
  section: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "20px",
  },
  roleContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-bewteen",
  },
  selectContainer: {
    border: "0px solid transparent",
  },
  submitBtn: {
    border: "none",
    fontSize: "1.2rem",
    display: "flex",
    alignSelf: "flex-end",
    padding: "10px",
    backgroundColor: "#C9DBBA",
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
      history.push("/");
    } catch (error) {
      console.log(`THIS MESSAGE:${error}`);
    }
  };
  return (
    <Paper className={classes.paper}>
      <Typography variant="h2">Register Account</Typography>
      <Typography variant="subtitle1">
        Collect all your content in one place and keep track of your progress
      </Typography>

      <section className={classes.section}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className={classes.form}
        >
          <TextField
            className={classes.textField}
            name="email"
            inputRef={register({ required: true })}
            label="Email"
          />
          {errors.email && <span>This field is required</span>}
          <TextField
            className={classes.textField}
            name="userName"
            inputRef={register}
            label="Username"
          />
          {errors.userName && <span>This field is required</span>}
          <div className={classes.roleContainer}>
            <Typography variant="subtitle1">Role:</Typography>
            <select
              className={classes.selectContainer}
              name="role"
              ref={register}
            >
              <option value="Normal user">Normal user</option>
              <option value="Content Creator">Content Creator</option>
              <option value="Sponsor">Sponsor</option>
              <option value="Sponsor" disabled>
                Admin
              </option>
            </select>
            <br />
          </div>
          <TextField
            className={classes.textField}
            type="password"
            name="password"
            inputRef={register({ required: true })}
            label="Select password"
          />
          {errors.password && <span>This field is required</span>}

          <TextField
            className={classes.textField}
            type="password"
            name="passwordCheck"
            inputRef={register({ required: true })}
            label="Repeat password"
          />
          {errors.passwordCheck && <span>This field is required</span>}

          <input type="submit" className={classes.submitBtn} value="Register" />
        </form>
      </section>
    </Paper>
  );
};

export default Register;
