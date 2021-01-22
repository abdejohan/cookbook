/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import PostButtons from "../components/PostButtons";

const useStyles = makeStyles(() => ({
  postContainer: {
    maxWidth: "600px",
    display: "flex",
    width: "100%",
    flexFlow: "column nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  article: {
    width: "100%",
  },
  ul: {
    padding: "5px",
  },
}));

const Posts = () => {
  const [postData, setPostData] = useState({});
  const [ingredients, setIngredients] = useState([]);
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
          setIngredients(fetchedPost.data.ingredients);
        } catch (error) {
          console.log(`THIS MESSAGE:${error}`);
        }
      }
      fetchPost();
    }, 500);
  }, [postId]);

  return (
    <section className={classes.postContainer}>
      <h4 className="page-header">{postData.title}</h4>
      <article className={classes.article}>
        <h4>{postData.postOwner}</h4>
        <h4 className="sec-header">Description</h4>
        <p className="plain-text">{postData.description}</p>
        <h4 className="sec-header">Ingredients</h4>
        <ol className={classes.ul}>
          {ingredients.map((ingredient) => {
            return (
              <li className="list-item" key={ingredient}>
                {ingredient}
              </li>
            );
          })}
        </ol>
        <h4 className="sec-header">Instructions</h4>
        <p className="plain-text">{postData.instructions}</p>
      </article>
      {Object.entries(postData).length > 0 && (
        <PostButtons postData={postData} />
      )}
    </section>
  );
};

export default Posts;
