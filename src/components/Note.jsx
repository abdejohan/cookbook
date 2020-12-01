/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useContext } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import UserContext from "../context/UserContext";

// import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  paper: {
    width: "50%",
    backgroundColor: "#C9DBBA",
    borderRadius: "30px",
    padding: "20px",
    alignItems: "center",
    alignSelf: "flex-start",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
  },
  form: {
    width: "100%",
    padding: "20px",
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "flex-start",
  },
  textarea: {
    borderRadius: "10px 0px 10px 0px",
    border: "none",
    padding: "10px",
    width: "100%",
    resize: "none",
  },
  title: {
    padding: "10px",
    width: "80%",
  },
  textFieldHeader: {
    fontWeight: "700",
    color: "#525252",
    marginTop: "20px",
    marginBottom: "5px",
  },
  ingredients: {
    height: "200px",
  },
  instructions: {
    height: "200px",
  },
  description: {
    height: "100px",
    width: "90%",
  },
  submitBttn: {
    marginTop: "20px",
    padding: "10px 60px",
    alignSelf: "flex-end",
  },
}));

const Note = (props) => {
  const { history } = props;
  const { handleSubmit, register } = useForm();
  const classes = useStyles();
  const { userData } = useContext(UserContext);

  const onSubmit = async (data) => {
    try {
      const addedPost = await axios.post("http://localhost:5000/posts", data, {
        headers: {
          "x-auth-token": userData.token,
        },
      });
      if (userData.token) {
        history.push(`/profile/${addedPost.data.userId}`);
      } else {
        history.push("/home");
      }
    } catch (error) {
      console.log(`THIS MESSAGE:${error}`);
    }
  };

  return (
    <div className={classes.paper}>
      <Typography variant="h4">Create Note</Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Typography className={classes.textFieldHeader}>Title</Typography>
        <textarea
          className={`${classes.title} ${classes.textarea}`}
          ref={register}
          name="title"
          placeholder="Keep the title short and as descriptive as possible."
        />
        <Typography className={classes.textFieldHeader}>
          Description (Optional)
        </Typography>
        <textarea
          className={`${classes.description} ${classes.textarea}`}
          ref={register}
          name="description"
          placeholder="if description is needed; please keep it short."
        />
        <Typography className={classes.textFieldHeader}>Ingredients</Typography>
        <textarea
          className={`${classes.ingredients} ${classes.textarea}`}
          ref={register}
          name="ingredients"
          placeholder="Write your ingredients in a list format"
        />
        <Typography className={classes.textFieldHeader}>
          Instructions
        </Typography>
        <textarea
          className={`${classes.instructions} ${classes.textarea}`}
          ref={register}
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

export default withRouter(Note);
