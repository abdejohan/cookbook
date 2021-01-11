/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../../context/UserContext";
import Note from "../Note";

const useStyles = makeStyles(() => ({
  paper: {
    flexGrow: 2,
    backgroundColor: "#FDFFFC",
    padding: "10px",
    alignItems: "center",
    alignSelf: "flex-start",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    maxWidth: "1200px",
    margin: "10px",
  },
}));

const Library = () => {
  const [posts, setPosts] = useState([]);
  const [followPosts, setFollowPosts] = useState([]);
  const { userData } = useContext(UserContext);
  const classes = useStyles();

  useEffect(() => {
    async function userPosts() {
      try {
        const allUserPosts = await axios.get(
          `http://localhost:5000/posts/all`,
          {
            headers: {
              "x-auth-token": userData.token,
            },
          }
        );
        setPosts(allUserPosts.data);
      } catch (error) {
        console.log(`THIS MESSAGE:${error}`);
      }
    }
    userPosts();
  }, [userData]);

  return (
    <>
      <Paper elevation={3} className={classes.paper}>
        <h3>Your posts:</h3>
        <ul>
          {posts.length > 0 ? (
            posts.map((post) => {
              return (
                <li key={post._id}>
                  <Link to={`/posts/${post._id}`}>{post.title}</Link>
                </li>
              );
            })
          ) : (
            <p>seems like you dont have any posts yet :/</p>
          )}
        </ul>
        <h3>Added posts:</h3>
        <ul>
          {followPosts.length > 0 ? (
            followPosts.map((followPost) => {
              return (
                <li key={followPost._id}>
                  <Link to={`/posts/${followPost._id}`}>
                    {followPost.title}
                  </Link>
                </li>
              );
            })
          ) : (
            <p>seems like you dont follow any posts yet :/</p>
          )}
        </ul>
      </Paper>
      <Note />
    </>
  );
};

export default Library;
