/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Library = () => {
  const [userId, setUserId] = useState();
  const { userData } = useContext(UserContext);
  console.log(userData);

  useEffect(() => {
    console.log("här");
    const { history } = useHistory;

    console.log();

    async function userPosts() {
      try {
        const allUserPosts = await axios.get(`http://localhost:5000/posts/all`);
        console.log(allUserPosts);
        // history.push("/all");
        // setPost({});
      } catch (error) {
        console.log(`THIS MESSAGE:${error}`);
      }
    }
    userPosts();
  }, []);

  return <div />;
};

export default Library;
