/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";

const Library = () => {
  const [posts, setPosts] = useState([]);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const { history } = useHistory;

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
    <div>
      <h3>Your posts</h3>
      <ul>
        {posts.length > 0 &&
          posts.map((post) => {
            return (
              <li key={post._id}>
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
              </li>
            );
          })}
        {posts.length === 0 && <p>seems like you dont have any posts yet :/</p>}
      </ul>
    </div>
  );
};

export default Library;