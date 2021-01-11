/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";

const PostButtons = (props) => {
  const { postData } = props;
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
    <>
      {userId === postData.userId && (
        <>
          <button type="button">Copy to ClipBoard</button>
          <button type="submit">Edit</button>
          <button onClick={DeletePost} type="submit">
            Delete
          </button>
        </>
      )}
      {userId !== postData.userId && userData.token && (
        <>
          <button type="button">Copy to ClipBoard</button>
          <button type="submit">Follow</button>
        </>
      )}
      {!userData.token && (
        <>
          <button type="button">Copy to ClipBoard</button>
          <button type="submit">Follow</button>
        </>
      )}
    </>
  );
};

export default PostButtons;
