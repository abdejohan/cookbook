import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  article: {
    maxWidth: "600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column nowrap",
  },
}));

const About = () => {
  const classes = useStyles();
  return (
    <article className={classes.article}>
      <h5 className="page-header">About Us</h5>
      <p className="plain-text">
        Stop saving recipes in brower tabs, stop with screenshots of old notes
        your grandmother gave you.{" "}
      </p>
      <br />
      <p className="plain-text">
        And if you are a content creator with a follower base, then dont let
        your wonderful recipes disappear as a caption to your posts.
      </p>
      <br />
      <p className="plain-text">
        Create your own Virtual cookbook here and store them where other people
        will be able to find them.
      </p>
    </article>
  );
};

export default About;
