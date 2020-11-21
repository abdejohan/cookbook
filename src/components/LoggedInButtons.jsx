/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";

const LoggedInButtons = () => {
  const history = useHistory();
  const { id } = useParams();
  const { userData } = useContext(UserContext);

  async function DeletePost() {
    try {
      const allUserPosts = await axios.delete(
        `http://localhost:5000/posts/${id}`,
        {
          headers: {
            "x-auth-token": userData.token,
          },
        }
      );
      history.push("/posts");
      console.log("post deleted");
    } catch (error) {
      console.log(`THIS MESSAGE:${error}`);
    }
  }

  return (
    <>
      <button onClick={DeletePost} type="submit">
        Delete
      </button>
      <button onClick={null} type="submit">
        Edit
      </button>
    </>
  );
};

export default LoggedInButtons;
