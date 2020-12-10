/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useState, Fragment } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import UserContext from "../context/UserContext";

// import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  empty: {},
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  ingredientContainer: {
    minWidth: "300px",
    width: "100%",
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "flex-start",
  },
  ingredientHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderBottom: "1px lightgrey solid",
    paddingBottom: "3px",
    marginBottom: "5px",
  },
  ingredientHeaderText: {
    fontWeight: "450",
  },
  ingredientGroup: {
    marginBottom: "5px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexFlow: "row nowrap",
  },
  plusMinusBttn: {
    height: "25px",
    width: "25px",
    border: "none",
  },
  amount: {
    maxWidth: "50px",
    border: "1px lightgrey solid",
  },
  ingredient: {
    border: "none",
    borderBottom: "1px lightgrey solid",
    width: "200px",
    flexGrow: 2,
  },
  paper: {
    backgroundColor: "#FDFFFC",
    padding: "10px",
    alignItems: "center",
    alignSelf: "flex-start",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
  },
  form: {
    padding: "10px",
    width: "100%",
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "flex-start",
  },
  textarea: {
    padding: "10px 0px",
    borderRadius: "10px 0px 10px 0px",
    border: "none",
    width: "100%",
    resize: "none",
    display: "flex",
  },
  textFieldHeader: {
    fontWeight: "700",
    color: "#525252",
    marginTop: "20px",
    marginBottom: "5px",
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
  const [inputFields, setInputFields] = useState([
    { volume: "", ingredient: "" },
  ]);
  // const [value, setValue] = React.useState("Controlled");

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "volume") {
      values[index].volume = event.target.value;
    } else {
      values[index].ingredient = event.target.value;
    }

    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ volume: "", ingredient: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const onSubmit = async (data) => {
    const dataSend = data;
    dataSend.ingredients = inputFields;
    console.log(dataSend);
    if (userData.token) {
      if (userData.user.userName) {
        dataSend.postOwner = userData.user.userName;
      }
    }
    try {
      const addedPost = await axios.post(
        "http://localhost:5000/posts",
        dataSend,
        {
          headers: {
            "x-auth-token": userData.token,
          },
        }
      );
      if (userData.token) {
        history.push(`/posts/${addedPost.data._id}`);
      } else {
        history.push("/home");
      }
    } catch (error) {
      console.log(`THIS MESSAGE:${error}`);
    }
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h4">Create Note</Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
          noValidate
          autoComplete="off"
        >
          <TextField
            className={`${classes.title} ${classes.textarea}`}
            name="title"
            id="title"
            inputRef={register}
            variant="filled"
            defaultValue="Title"
          />
          <TextField
            className={`${classes.description} ${classes.textarea}`}
            name="description"
            id="description"
            multiline
            rows={4}
            inputRef={register}
            variant="filled"
            defaultValue="Description (Optional)"
          />
          <h3>Ingredients</h3>
          <div className={classes.ingredientContainer}>
            <p className={classes.ingredientHeader}>
              <span className={classes.ingredientHeaderText}>
                Amount | Ingredient
              </span>
              <button
                className={classes.plusMinusBttn}
                type="button"
                onClick={() => handleAddFields()}
              >
                +
              </button>
            </p>
            {inputFields.map((inputField, index) => (
              <div className={classes.ingredientGroup}>
                <Fragment key={`${inputField}~${index}`}>
                  <div className={classes.empty}>
                    <label htmlFor="volume">
                      <input
                        type="text"
                        className={classes.amount}
                        id="volume"
                        name="volume"
                        value={inputField.volume}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </label>
                  </div>
                  <div className={classes.empty}>
                    <label htmlFor="ingredient">
                      <input
                        type="text"
                        className={classes.ingredient}
                        id="ingredient"
                        name="ingredient"
                        value={inputField.ingredient}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </label>
                  </div>
                  <div className={classes.empty}>
                    <button
                      className={classes.plusMinusBttn}
                      type="button"
                      onClick={() => handleRemoveFields(index)}
                    >
                      -
                    </button>
                  </div>
                </Fragment>
              </div>
            ))}
          </div>
          <TextField
            className={`${classes.instructions} ${classes.textarea}`}
            id="instructions"
            name="instructions"
            multiline
            rows={8}
            inputRef={register}
            variant="filled"
            defaultValue="Instructions"
          />
          <input
            type="submit"
            className={classes.submitBttn}
            value="Generate &#x21E8;"
          />
        </form>
      </Paper>
    </div>
  );
};

export default withRouter(Note);
