import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  article: {
    maxWidth: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column nowrap",
  },
  header: {
    marginBottom: "50px",
  },
  orange: {
    color: "orange",
  },
  blue: {
    color: "blue",
  },
}));

const About = () => {
  const classes = useStyles();
  return (
    <article className={classes.article}>
      <h5 className={`page-header ${classes.header}`}>About Us</h5>
      <p className="plain-text">
        <span className={classes.orange}>Stop</span> storing recipes in brower
        tabs you know your not going to revisit.{" "}
        <span className={classes.orange}>Stop</span> taking screenshots of notes
        your grandmother gave you that you know at some point when your phone
        runs out of space{" "}
      </p>
      <br />
      <p className="plain-text">
        And if you are a content creator with a follower base, then{" "}
        <span className={classes.orange}>don´t</span> let your wonderful recipes
        disappear as a caption to your instagram posts.
      </p>
      <br />
      <p className="plain-text">
        Instead here you have the ability to store all of them at the same place
        while having it easily <span className={classes.blue}>accessible</span>.{" "}
        <br /> <span className={classes.blue}>Create</span> your own Virtual
        cookbook and store your recipes so both you and others can find them!
      </p>
    </article>
  );
};

export default About;
