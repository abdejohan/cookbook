import React from "react";
// import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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
    width: "50%",
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "flex-start",
  },
  textarea: {
    padding: "10px",
    width: "100%",
    resize: "none",
  },
  title: {
    padding: "10px",
    width: "100%",
  },
  textFieldHeader: {
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
  },
  submitBttn: {
    marginTop: "20px",
    padding: "10px 60px",
    alignSelf: "flex-end",
  },
}));

const Note = () => {
  const { handleSubmit, register } = useForm();
  const onSubmit = (data) => console.log(data);
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Typography variant="h4">Create Note</Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Typography className={classes.textFieldHeader}>Title</Typography>
        <textarea
          type="input"
          className={`${classes.title} ${classes.textarea}`}
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

export default Note;
