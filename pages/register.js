import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
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
    justifyContent: "flex-start",
  },
  form: {
    maxWidth: "650px",
    width: "100%",
    flexGrow: "2",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    marginBottom: "20px",
    width: "100%",
  },
  roleContainer: {
    marginBottom: "20px",
    color: "#0000008a",
    borderBottom: "1px solid darkgrey",
    padding: "10px 0px",
    width: "100%",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectContainer: {
    fontSize: "1rem",
    borderLeft: "2px solid lightgrey",
    backgroundColor: "white",
    border: "0px solid transparent",
  },
  error: {
    color: "red",
  },
}));

const Register = () => {
  const { register, handleSubmit, errors } = useForm();
  const { setUserData } = useContext(UserContext);
  const { userData } = useContext(UserContext);
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (userData.user) {
      router.push("/");
    }
  }, [router, userData.user]);

  const onSubmit = async (data) => {
    const { email, password } = data;
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
      router.push("/");
    } catch (error) {
      console.log(`THIS MESSAGE:${error}`);
    }
  };
  return (
    <Paper elevation={0} className={classes.paper}>
      <Typography className="page-header">Register Account</Typography>
      <p className="plain-text">
        Register an account to keep your favorite recipes in one place forever
        and ever..{" "}
        <span role="img" aria-label="pinapple">
          {" "}
          🍍{" "}
        </span>
      </p>

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
        {errors.email && (
          <span className={classes.error}>Email address is required</span>
        )}
        <TextField
          className={classes.textField}
          name="userName"
          inputRef={register({ required: true })}
          label="Username"
        />
        {errors.userName && (
          <span className={classes.error}>Username is required</span>
        )}
        <div className={classes.roleContainer}>
          <Typography
            style={{ paddingLeft: "0px", opacity: "0.7" }}
            className="plain-text"
          >
            Select a role (optional)
          </Typography>
          <select
            className={classes.selectContainer}
            name="role"
            ref={register}
          >
            <option value="none">-</option>
            <option value="Normal user">Normal user</option>
            <option value="Content Creator">Content Creator</option>
            <option value="Sponsor">Sponsor</option>
            <option value="Admin" disabled>
              Admin
            </option>
          </select>
        </div>
        <TextField
          className={classes.textField}
          type="password"
          name="password"
          inputRef={register({ required: true })}
          label="Select password"
        />
        {errors.password && (
          <span className={classes.error}>Password is required</span>
        )}

        <TextField
          className={classes.textField}
          type="password"
          name="passwordCheck"
          inputRef={register({ required: true })}
          label="Repeat password"
        />
        {errors.passwordCheck && (
          <span className={classes.error}>
            {console.log(errors)}Passwords must match
          </span>
        )}

        <input
          type="submit"
          className="blue-button alt-blue-button"
          value="Register"
        />
      </form>
    </Paper>
  );
};

export default Register;
