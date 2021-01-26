import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import UserContext from "../context/UserContext";
import Note from "./Note";
import Search from "./Search";
import youtube from "../public/youtube.svg";
import search from "../public/search.svg";
import responsive from "../public/responsive.svg";

const useStyles = makeStyles(() => ({
  contentContainer: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: "30px",
    position: "relative",
  },
  textContainer: {
    marginBottom: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexFlow: "column nowrap",
  },
  subText: {
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#666666",
    lineHeight: "1.6",
  },
  subText1: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#666666",
    lineHeight: "1.6",
  },
  iconContainer: {
    width: "100%",
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column nowrap",
  },
  iconRows: {
    paddingBottom: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "row nowrap",
  },
  icon: {
    marginRight: "10px",
    width: "50px",
    height: "50px",
  },
}));

const Home = () => {
  const { userData } = useContext(UserContext);
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (userData.user) {
      if (userData.user.role === "admin") {
        router.push("/admin");
      }
    }
  }, [router, userData.user]);

  return (
    <>
      <Search />
      <section className={classes.contentContainer}>
        <article className={classes.textContainer}>
          <h1 style={{ lineHeight: "43px" }} className="page-header">
            YOU <span className="gradient-text">CREATE</span>, WE STORE!
          </h1>
          <h4 className={classes.subText}>YOUR OWN VIRTUAL COOKBOOK</h4>
          <section className={classes.iconContainer}>
            <div className={classes.iconRows}>
              <img
                className={classes.icon}
                src={responsive}
                alt="folder-icon"
              />
              <h3 className={classes.subText1}>
                LIFE LONG STORAGE FOR YOUR RECIPE COLLECTIONS
              </h3>
            </div>
            <div className={classes.iconRows}>
              <img className={classes.icon} src={youtube} alt="youtube-icon" />
              <h3 className={classes.subText1}>
                GET SHAREABLE LINK FOR YOUR PLATFORM
              </h3>
            </div>
            <div className={classes.iconRows}>
              <img className={classes.icon} src={search} alt="folder-icon" />
              <h3 className={classes.subText1}>
                KEEP TRACK OF YOUR FAVORITE CHEFS
              </h3>
            </div>
          </section>
        </article>
        <Note />
      </section>
    </>
  );
};

export default Home;
