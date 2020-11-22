/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoggedInButtons from "./LoggedInButtons";
import UserContext from "../context/UserContext";

// title: fetchedPost.data.title,
// description: fetchedPost.data.description,
// ingredients: fetchedPost.data.ingredients,
// instructions: fetchedPost.data.instructions,

const Posts = () => {
  const { id } = useParams();
  const { userData } = useContext(UserContext);

  const [post, setPost] = useState({});
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const fetchedPost = await axios.get(
          `http://localhost:5000/posts/${id}`
        );
        setPost({
          title: fetchedPost.data.title,
          description: fetchedPost.data.description,
          ingredients: fetchedPost.data.ingredients,
          instructions: fetchedPost.data.instructions,
        });
        setPostId(fetchedPost.data.userId);
      } catch (error) {
        console.log(`THIS MESSAGE:${error}`);
      }
    }
    fetchPost();
  }, [id]);

  return (
    <div>
      <article>
        <h4>Title</h4>
        <p>{post.title}</p>
        <h4>Description</h4>
        <p>{post.description}</p>
        <h4>Ingredients</h4>
        <p>{post.ingredients}</p>
        <h4>Instructions</h4>
        <p>{post.instructions}</p>
      </article>
      <div className="LoggedInButtons">
        <button type="button">Add to List</button>
        {userData.token ? <LoggedInButtons id={postId} /> : "HEJEHEJE"}
      </div>
    </div>
  );
};

export default Posts;
