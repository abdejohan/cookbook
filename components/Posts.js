/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import PostButtons from "./PostButtons";

const useStyles = makeStyles(() => ({
  postContainer: {
    backgroundColor: "green",
    display: "flex",
    width: "100%",
    flexFlow: "column nowrap",
  },
}));

const Posts = () => {
  const [postData, setPostData] = useState({});
  const classes = useStyles();
  const { postId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      async function fetchPost() {
        try {
          const fetchedPost = await axios.get(
            `http://localhost:5000/posts/${postId}`
          );
          setPostData(fetchedPost.data);
        } catch (error) {
          console.log(`THIS MESSAGE:${error}`);
        }
      }
      fetchPost();
    }, 500);
  }, [postId]);

  return (
    <section className={classes.postContainer}>
      <article>
        <h4>Title</h4>
        <p>{postData.title}</p>
        <h4>Description</h4>
        <p>{postData.description}</p>
        <h4>Ingredients</h4>
        <h4>Instructions</h4>
        <p>{postData.instructions}</p>
      </article>
      {Object.entries(postData).length > 0 && (
        <PostButtons postData={postData} />
      )}
    </section>
  );
};

export default Posts;
