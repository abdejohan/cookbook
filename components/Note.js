import React, { useContext, useState, Fragment } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
import { Typography } from "@material-ui/core";
import UserContext from "../context/UserContext";
import AddedNote from "./AddedNote";

// import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  empty: {},
  paper: {
    width: "100%",
    maxWidth: "700px",
    flexGrow: "2",
    backgroundColor: "white",
    alignItems: "center",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
  },
  ingredientContainer: {
    minWidth: "250px",
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
    minHeight: "25px",
    border: "1px lightgrey solid",
  },
  ingredient: {
    border: "none",
    borderBottom: "1px lightgrey solid",
    flexGrow: 2,
  },
  form: {
    padding: "10px",
    width: "100%",
  },
  textarea: {
    margin: "10px 0px",
    borderRadius: "10px 0px 0px 0px",
    border: "none",
    width: "100%",
    resize: "none",
    display: "flex",
    backgroundColor: "#F1F7ED",
  },
  linkContainer: {
    marginTop: "10px",
    width: "100%",
    alignSelf: "flex-end",
    backgroundColor: "lightblue",
    borderRadius: "5px",
    display: "flex",
    flexFlow: "column nowrap",
  },
  growLine: {
    display: "flex",
    flexGrow: "2",
    paddingRight: "5px",
    paddingLeft: "5px",
  },
  labelGrow: {
    flexGrow: "2",
    display: "flex",
  },
  headText: {
    padding: "10px",
  },
  noteHeader: {
    display: "none",
    color: "#FF9B54",
    fontWeight: "800",
    fontSize: "2.8rem",
    padding: "20px",
  },
}));

const Note = () => {
  const { handleSubmit, register, errors, reset } = useForm();
  const classes = useStyles();
  // const router = useRouter();
  const { userData } = useContext(UserContext);
  const [checked, setChecked] = useState(false);
  const [noteLink, setNoteLink] = useState(false);
  const [inputFields, setInputFields] = useState([
    { volume: "", ingredient: "" },
  ]);

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
    if (!userData.token) {
      dataSend.author = "temp";
      try {
        const addedPost = await axios.post(
          "http://localhost:5000/posts/no-user",
          dataSend,
          {
            headers: {
              "x-auth-token": userData.token,
            },
          }
        );
        setChecked(!checked);
        // eslint-disable-next-line no-underscore-dangle
        setNoteLink(addedPost.data._id);
        reset();
      } catch (error) {
        console.log(`THIS MESSAGE:${error}`);
      }
    } else {
      console.log("USER REGISTERED! ! !");
      dataSend.author = userData.user.userName;
      dataSend.userId = userData.user.id;
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
        setChecked(!checked);
        // eslint-disable-next-line no-underscore-dangle
        setNoteLink(addedPost.data._id);
        if (userData.token) {
          // history.push(`/profile/library`);
        }
        reset();
      } catch (error) {
        console.log(`THIS MESSAGE:${error}`);
      }
    }
  };

  return (
    <>
      <Paper elevation={0} className={classes.paper}>
        <Typography className={classes.noteHeader} variant="subtitle2">
          FILL OUT THE RECIPE TEMPLETE AND WE WILL DO THE REST{" "}
          <span role="img" aria-label="chef-icon">
            {" "}
            👨‍🍳{" "}
          </span>
        </Typography>
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
            inputRef={register({ required: true })}
            variant="filled"
            placeholder="Title"
          />
          {errors.title && (
            <span className={classes.error}>
              {console.log(errors)}Oops! looks like your forgot a title
            </span>
          )}
          <TextField
            className={`${classes.description} ${classes.textarea}`}
            name="description"
            id="description"
            multiline
            rows={4}
            inputRef={register}
            variant="filled"
            placeholder="Description (Optional)"
          />
          <h3 style={{ textDecoration: "underline" }}>Ingredients</h3>
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
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className={classes.ingredientGroup}>
                <Fragment key={inputField}>
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
                  <div className={classes.growLine}>
                    <label className={classes.labelGrow} htmlFor="ingredient">
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
            inputRef={register({ required: true })}
            variant="filled"
            placeholder="Instructions"
          />
          {errors.instructions && (
            <span className={classes.error}>
              {console.log(errors)}Instructions are required
            </span>
          )}
          <div className={`shadow ${classes.linkContainer}`}>
            <input
              type="submit"
              className="blue-button"
              value="Generate &#x21E8;"
            />
            <Collapse in={checked} collapsedHeight={0}>
              <AddedNote noteLink={noteLink} />
            </Collapse>
          </div>
        </form>
      </Paper>
    </>
  );
};

export default Note;
