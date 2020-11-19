import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// title: fetchedPost.data.title,
// description: fetchedPost.data.description,
// ingredients: fetchedPost.data.ingredients,
// instructions: fetchedPost.data.instructions,

const Posts = () => {
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [post, setPost] = useState({});

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
      <button type="button">Add to List</button>
    </div>
  );
};

export default Posts;
