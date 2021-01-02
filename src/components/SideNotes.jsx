/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";
import Eye from "../media/eye.png";

const useStyles = makeStyles(() => ({
  paper: {
    padding: "40px",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    minWidth: "350px",
    backgroundColor: "rgba(255,255,255, 1);",
  },
  ul: {
    marginTop: "10px",
    marginBottom: "50px",
    fontSize: "1.2rem",
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "flex-start",
    justifyContent: "center",
    listStyleType: "none",
  },
  li: {
    width: "100%",
    padding: "5px",
    borderBottom: "1px solid gray",
    display: "flex",
    justifyContent: "space-between",
  },
  article: {
    display: "flex",
    flexFlow: "column nowrap",
  },
  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#668586",
  },
  viewsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: "10px",
  },
  eyeIcon: {
    width: "1rem",
    height: "1rem",
  },
  viewsCount: {
    padding: "5px",
  },
}));

const SideNotes = () => {
  const classes = useStyles();

  return (
    <article className={classes.article}>
      <Paper elevation={0} className={classes.paper}>
        <Typography variant="h4">Most Popular Users:</Typography>
        <ul className={classes.ul}>
          <li className={classes.li}>
            <div className={classes.viewsContainer}>
              <img className={classes.eyeIcon} src={Eye} alt="eye" />
              <span className={classes.viewsCount}>25,345</span>
            </div>
            <a className={classes.link} href="">
              YTfoodie
            </a>
          </li>
          <li className={classes.li}>
            <div className={classes.viewsContainer}>
              <img className={classes.eyeIcon} src={Eye} alt="eye" />
              <span className={classes.viewsCount}>25,345</span>
            </div>
            <a className={classes.link} href="">
              Cookin with Fiona
            </a>
          </li>
          <li className={classes.li}>
            <div className={classes.viewsContainer}>
              <img className={classes.eyeIcon} src={Eye} alt="eye" />
              <span className={classes.viewsCount}>25,345</span>
            </div>
            <a className={classes.link} href="">
              veganjunkfood
            </a>
          </li>
          <li className={classes.li}>
            <div className={classes.viewsContainer}>
              <img className={classes.eyeIcon} src={Eye} alt="eye" />
              <span className={classes.viewsCount}>25,345</span>
            </div>
            <a className={classes.link} href="">
              Grandma´s Kitchen
            </a>
          </li>
          <li className={classes.li}>
            <div className={classes.viewsContainer}>
              <img className={classes.eyeIcon} src={Eye} alt="eye" />
              <span className={classes.viewsCount}>25,345</span>
            </div>
            <a className={classes.link} href="">
              LateNightSession@Twitch
            </a>
          </li>
        </ul>
        <Typography variant="h4">Recently Added:</Typography>
        <ul className={classes.ul}>
          <li className={classes.li}>
            <div className={classes.viewsContainer}>
              <img className={classes.eyeIcon} src={Eye} alt="eye" />
              <span className={classes.viewsCount}>25,345</span>
            </div>
            <a className={classes.link} href="">
              Green Morning Smoothie
            </a>
          </li>
          <li className={classes.li}>
            <div className={classes.viewsContainer}>
              <img className={classes.eyeIcon} src={Eye} alt="eye" />
              <span className={classes.viewsCount}>25,345</span>
            </div>
            <a className={classes.link} href="">
              Vegan Pad Thai
            </a>
          </li>
          <li className={classes.li}>
            <div className={classes.viewsContainer}>
              <img className={classes.eyeIcon} src={Eye} alt="eye" />
              <span className={classes.viewsCount}>25,345</span>
            </div>
            <a className={classes.link} href="">
              Asian Style Lasangea
            </a>
          </li>
          <li className={classes.li}>
            <div className={classes.viewsContainer}>
              <img className={classes.eyeIcon} src={Eye} alt="eye" />
              <span className={classes.viewsCount}>25,345</span>
            </div>
            <a className={classes.link} href="">
              Classic Italian Risotto
            </a>
          </li>
          <li className={classes.li}>
            <div className={classes.viewsContainer}>
              <img className={classes.eyeIcon} src={Eye} alt="eye" />
              <span className={classes.viewsCount}>25,345</span>
            </div>
            <a className={classes.link} href="">
              Lebanese Tabbouleh
            </a>
          </li>
        </ul>
      </Paper>
    </article>
  );
};

export default SideNotes;
