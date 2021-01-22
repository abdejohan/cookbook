import React, { useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import UserContext from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  section: {
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
  inputContainer: {
    display: "flex",
    flexFlow: "row wrap",
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    minWidth: "260px",
    margin: "10px",
    width: "100%",
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
    }
  };

  return (
    <section className={`alignHeader ${classes.section}`}>
      <CssBaseline />
      <h2 className="page-header">Sign in</h2>
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
        <button
          type="submit"
          variant="contained"
          color="primary"
          className="blue-button alt-blue-button"
        >
          Sign In
        </button>
        <Link href="/register">Forgot password?</Link>
        <Link href="/register">Dont have an account? Sign Up</Link>
      </form>
    </section>
  );
}
