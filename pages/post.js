/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import PostButtons from "../components/PostButtons";

const useStyles = makeStyles(() => ({
  postContainer: {
    padding: "10px",
    maxWidth: "650px",
    display: "flex",
    width: "100%",
    flexFlow: "column nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  article: {
    width: "100%",
    margin: "30px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexFlow: "column nowrap",
  },
  ul: {
    padding: "5px",
  },
  p: {
    width: "80%",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: "30px",
  },
  volume: {
    marginRight: "20px",
    fontWeight: "800",
  },
  headers: {
    marginTop: "20px",
    fontSize: "1.2rem",
    textDecoration: "underline",
    color: "orange",
  },
}));

const Posts = () => {
  const [postData, setPostData] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const classes = useStyles();
  const router = useRouter();
  const { postId } = router.query;

  useEffect(() => {
    console.log("gg");
    async function fetchPost() {
      try {
        const fetchedPost = await axios.get(
          `https://cookbook-db.herokuapp.com/posts/${postId}`
        );
        setPostData(fetchedPost.data);
        setIngredients(fetchedPost.data.ingredients);
      } catch (error) {
        console.log(`THIS MESSAGE:${error}`);
      }
    }
    fetchPost();
  }, [postId]);

  return (
    <section className={classes.postContainer}>
      <h4 className="page-header">{postData.title}</h4>
      <article className={classes.article}>
        <h4>{postData.postOwner}</h4>
        <p className={`plain-text ${classes.p}`}>{postData.description}</p>
        <h4 className={classes.headers}>Ingredients</h4>
        <ol className={classes.ul}>
          {ingredients.map((item) => {
            return (
              <li className="list-item" key={item.ingredient}>
                <span className={classes.volume}>{item.volume}</span>
                {item.ingredient}
              </li>
            );
          })}
        </ol>
        <h4 className={classes.headers}>Instructions</h4>
        <p className="plain-text">{postData.instructions}</p>
      </article>
      {Object.entries(postData).length > 0 && (
        <PostButtons postData={postData} />
      )}
    </section>
  );
};

export default Posts;
