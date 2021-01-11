import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import Paper from "@material-ui/core/Paper";
import Header from "../components/Header";
import UserContext from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    padding: "20px",
    borderRadius: "0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column nowrap",
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    maxWidth: "500px",
  },
  inputContainer: {
    display: "flex",
    flexFlow: "row wrap",
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    width: "48%",
    minWidth: "150px",
    margin: "10px",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const router = useRouter();
  const { register, handleSubmit, control } = useForm();
  const { setUserData } = useContext(UserContext);

  const onSubmit = async (data) => {
    const { email, password } = data;
    const loginUser = { email, password };
    try {
      const loginRes = await axios.post(
        "http://localhost:5000/user/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      if (loginRes.data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push(`/profile/${loginRes.data.user.id}`);
      }
    } catch (error) {
      console.log(`THIS MESSAGE:${error}`);
      console.log(error);
  
    }
  };

  return (
    <Paper elevation={0} className={`alignHeader ${classes.paper}`}>
      <CssBaseline />
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form
        className={classes.form}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={classes.inputContainer}>
          <TextField
            className={classes.inputField}
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            className={classes.inputField}
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </div>

        <FormControlLabel
          control={
            <Controller
              as={Checkbox}
              control={control}
              name="remember"
              color="primary"
              defaultValue={false}
            />
          }
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Link href="/register" variant="body2">
          Forgot password?
          </Link>
        <Link href="/register" variant="body2">
          Dont have an account? Sign Up
        </Link>
      </form>
    </Paper>
  )
};
