import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Library = () => {
  const { history } = useHistory;
  try {
    const userPosts = axios.get("http://localhost:5000/posts/all");
    history.push("/all");
    console.log(userPosts);
  } catch (error) {
    console.log(`THIS MESSAGE:${error}`);
  }

  return (
    <div>
      <div>DISPLAY THE USERS LIBERARY HERE</div>
      <div>DISPLAY THE USERS LIBERARY HERE</div>
    </div>
  );
};

export default Library;
