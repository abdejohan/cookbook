/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../context/UserContext";

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: "20px",
    padding: "10px",
    alignItems: "flex-start",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-around",
    maxWidth: "1200px",
    width: "100%",
  },
  innerContainer: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "flex-start",
    width: "50%",
  },
  ul: {
    listStyleType: "none",
    padding: "10px",
  },
  li: {
    textDecoration: "none",
    color: "darkgrey",
  },
  h3: {
    color: "#e3d081",
    fontSize: "3rem",
  },
}));

const Library = () => {
  const [posts, setPosts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [followPosts, setFollowPosts] = useState([]);
  const { userData } = useContext(UserContext);
  const classes = useStyles();

  useEffect(() => {
    async function userPosts() {
      try {
        const userId = userData.user.id;
        const allUserPosts = await axios.get(
          `http://localhost:5000/posts/all`,
          userId
        );
        setPosts(allUserPosts.data);
        console.log(allUserPosts);
      } catch (error) {
        console.log(`THIS MESSAGE:${error}`);
      }
    }
    userPosts();
  }, [userData]);

  return (
    <>
      <Paper elevation={0} className={classes.paper}>
        <Typography variant="h6" className="page-sub-header">
          Library
        </Typography>
        <div className={classes.innerContainer}>
          <h3 className={classes.h3}>MY RECIPES</h3>
          <ul className={classes.ul}>
            {posts.length > 0 ? (
              posts.map((post) => {
                return (
                  <li className={classes.li} key={post._id}>
                    <Link
                      href={{ pathname: "/post", query: { postId: post._id } }}
                    >
                      {post.title}
                    </Link>
                  </li>
                );
              })
            ) : (
              <p className="plain-text">
                seems like you dont have any posts yet :/
              </p>
            )}
          </ul>
        </div>
        <div className={classes.innerContainer}>
          <h3 className={classes.h3}>FOLLOWED RECIPES</h3>
          <ul className={classes.ul}>
            {followPosts.length > 0 ? (
              followPosts.map((followPost) => {
                return (
                  <li className={classes.li} key={followPost._id}>
                    <Link
                      href={{
                        pathname: "/post",
                        query: { postId: followPost._id },
                      }}
                    >
                      {followPost.title}
                    </Link>
                  </li>
                );
              })
            ) : (
              <p className="plain-text">
                seems like you dont follow any posts yet :/
              </p>
            )}
          </ul>
        </div>
      </Paper>
    </>
  );
};

export default Library;
