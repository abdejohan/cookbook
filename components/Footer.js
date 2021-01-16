import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EmailIcon from "@material-ui/icons/Email";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";

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
    fontSize: "1.3rem",
    fontWeight: "700",
    paddingBottom: "20px",
  },
  listItem: {
    color: "#DADFF7",
    alignItems: "center",
    justifyContent: "flex-end",
    fontSize: "0.9rem",
    fontFamily: `"Poppins", sans-serif !important`,
    display: "flex",
  },
  link: {
    listStyleType: "none",
    fontFamily: `"Poppins", sans-serif !important`,
    fontSize: "1.1rem",
    color: "#5A7D7C",
  },
  alignLeft: {
    justifyContent: "flex-start !important",
    listStyleType: "none",
    alignItems: "center",
    display: "flex",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <ul>
          <li className={classes.listHeader}>this site was made by</li>
          <li className={classes.listItem}>Johan Abdé</li>
          <li className={classes.listItem}>
            Student @&nbsp;
            <a className={classes.link} href="www.chasacademy.se">
              Chas Academy
            </a>
          </li>
        </ul>
      </div>
      <div className={classes.container}>
        <ul>
          <li className={classes.listHeader}>contact</li>
          <li className={(classes.listItem, classes.alignLeft)}>
            <GitHubIcon fontSize="small" />
            <a className={classes.link} href="https://github.com/abdejohan/">
              github.com/abdejohan/
            </a>
          </li>
          <li className={(classes.listItem, classes.alignLeft)}>
            <EmailIcon fontSize="small" />
            <a
              className={classes.link}
              href="mailto: johan.abde@chasacademy.se"
            >
              johan.abde@chasacademy.se
            </a>
          </li>
          <li className={(classes.listItem, classes.alignLeft)}>
            <LinkedInIcon fontSize="small" />
            <a
              className={classes.link}
              href="https://www.linkedin.com/in/johan-abd%C3%A9-85394382/"
            >
              linkedin.com/in/johan-abdé-85394382/
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
              href="https://www.flaticon.com/authors/freepik"
              title="Freepik"
            >
              Freepik
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
              href="https://www.flaticon.com/authors/mangsaabguru"
              title="mangsaabguru"
            >
              mangsaabguru
            </a>
          </li>
          <li className={classes.listItem}>
            From&nbsp;
            <a
              className={classes.link}
              href="https://www.flaticon.com/"
              title="flaticon"
            >
              flaticon.com
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
