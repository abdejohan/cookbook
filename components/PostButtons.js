/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../context/UserContext";

const useStyles = makeStyles(() => ({
  contentContainer: {
    padding: "20px",
    display: "flex",
    width: "100%",
    flexFlow: "column nowrap",
  },
  submitBttn: {
    fontWeight: "900",
    fontSize: "2rem",
    color: "white",
    border: "none",
    padding: "20px",
    backgroundColor: "lightblue",
    borderRadius: "10px 10px 10px 10px",
    margin: "10px 0px",
  },
}));

const PostButtons = (props) => {
  const { postData } = props;
  const classes = useStyles();
  const history = useHistory();
  const { userData } = useContext(UserContext);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    if (!userData.user) {
      setUserId(0);
    } else {
      setUserId(userData.user.id);
    }
  }, [userData.user]);

  async function DeletePost() {
    try {
      const allUserPosts = await axios.delete(
        `http://localhost:5000/posts/${postData._id}`,
        {
          headers: {
            "x-auth-token": userData.token,
          },
        }
      );
      history.push("/profile/library");
      console.log("post deleted");
    } catch (error) {
      console.log(`THIS MESSAGE:${error}`);
    }
  }

  return (
    <div className={classes.contentContainer}>
      {userId === postData.userId && (
        <>
          <button
            className={`${classes.submitBttn} buttonEffect`}
            type="button"
          >
            Copy to ClipBoard
          </button>
          <button
            className={`${classes.submitBttn} buttonEffect`}
            type="submit"
          >
            Edit
          </button>
          <button
            className={`${classes.submitBttn} buttonEffect`}
            onClick={DeletePost}
            type="submit"
          >
            Delete
          </button>
        </>
      )}
      {userId !== postData.userId && userData.token && (
        <>
          <button
            className={`${classes.submitBttn} buttonEffect`}
            type="button"
          >
            Copy to ClipBoard
          </button>
          <button
            className={`${classes.submitBttn} buttonEffect`}
            type="submit"
          >
            Follow
          </button>
        </>
      )}
      {!userData.token && (
        <>
          <button
            className={`${classes.submitBttn} buttonEffect`}
            type="button"
          >
            Copy to ClipBoard
          </button>
          <button
            className={`${classes.submitBttn} buttonEffect`}
            type="submit"
          >
            Follow
          </button>
        </>
      )}
    </div>
  );
};

export default PostButtons;
