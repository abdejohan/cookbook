/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../context/UserContext";

const useStyles = makeStyles(() => ({
  section: {
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
    fontSize: "2rem",
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
        const allUserPosts = await axios.get(
          `http://localhost:5000/posts/all`,
          {
            headers: {
              userId: userData.user.id,
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
      <section className={classes.section}>
        <h3 variant="h6" className="page-sub-header">
          Library
        </h3>
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
              <p className="plain-text">You dont have any posts yet :/</p>
            )}
          </ul>
        </div>
        <section className={classes.innerContainer}>
          <h3 className={classes.h3}>SAVED RECIPES</h3>
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
              <p className="plain-text">You dont follow any posts yet :/</p>
            )}
          </ul>
        </section>
      </section>
    </>
  );
};

export default Library;
