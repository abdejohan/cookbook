/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import PostButtons from "../components/PostButtons";

const useStyles = makeStyles(() => ({
  postContainer: {
    maxWidth: "800px",
    display: "flex",
    width: "100%",
    flexFlow: "column nowrap",
  },
}));

const Posts = () => {
  const [postData, setPostData] = useState({});
  const classes = useStyles();
  const router = useRouter();
  const { postId } = router.query;

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
        <h4 className="page-header">{postData.title}</h4>
        <h4>{postData.postOwner}</h4>
        <h4 className="page-sub-header">Description</h4>
        <p className="plain-text">{postData.description}</p>
        <h4 className="page-sub-header">Ingredients</h4>
        <h4 className="page-sub-header">Instructions</h4>
        <p className="plain-text">{postData.instructions}</p>
      </article>
      {Object.entries(postData).length > 0 && (
        <PostButtons postData={postData} />
      )}
    </section>
  );
};

export default Posts;
