import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    padding: "20px",
  },
  listHeader: {
    fontFamily: `"Poppins", sans-serif !important`,
    color: "#DADFF7",
    listStyleType: "none",
    fontSize: "1.7rem",
    fontWeight: "700",
    paddingBottom: "20px",
  },
  listItem: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    display: "flex",
  },
  link: {
    fontFamily: `"Poppins", sans-serif !important`,
    fontSize: "1.4rem",
    color: "#5A7D7C",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <ul>
          <li className={classes.listHeader}>contact</li>
          <li className={classes.listItem}>
            <a className={classes.link} href="/">
              Email
            </a>
          </li>
          <li className={classes.listItem}>
            <a className={classes.link} href="/">
              aedIn
            </a>
          </li>
          <li className={classes.listItem}>
            <a className={classes.link} href="/">
              GitHub
            </a>
          </li>
        </ul>
      </div>
      <div className={classes.container}>
        <ul>
          <li className={classes.listHeader}>Contact</li>
          <li className={classes.listItem}>
            <a className={classes.link} href="/">
              Email
            </a>
          </li>
          <li className={classes.listItem}>
            <a className={classes.link} href="/">
              aedIn
            </a>
          </li>
          <li className={classes.listItem}>
            <a className={classes.link} href="/">
              GitHub
            </a>
          </li>
        </ul>
      </div>
      <div className={classes.container}>
        <ul>
          <li className={classes.listHeader}>Icons made by</li>
          <li className={classes.listItem}>
            <a
              className={classes.link}
              href="https://www.flaticon.com/authors/mangsaabguru"
              title="mangsaabguru"
            >
              mangsaabguru
            </a>
          </li>
          <li className={classes.listItem}>
            <a
              className={classes.link}
              href="https://www.flaticon.com/authors/ultimatearm"
              title="ultimatearm"
            >
              ultimatearm
            </a>
          </li>
          <li className={classes.listItem}>
            <a
              className={classes.link}
              href="https://www.flaticon.com/authors/freepik"
              title="Freepik"
            >
              Freepik
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
