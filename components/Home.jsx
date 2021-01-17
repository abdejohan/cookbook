import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import UserContext from "../context/UserContext";
import Note from "./Note";
import Search from "./Search";
import youtube from "../public/youtube.svg";
import search from "../public/search.svg";
import responsive from "../public/responsive.svg";
// backgroundImage: `url(${mobileImage})`,

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
  components: {
    width: "100%",
    flexFlow: "column nowrap",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sideways: {
    backgroundColor: "white",
    paddingLeft: "0px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column nowrap",
  },
  textContainer: {
    marginBottom: "50px",
  },
  headText: {
    fontSize: "4rem",
    fontWeight: "900",
    fontFamily: "Yusei Magic, sans-serif !important",
  },
  subText: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#666666",
    lineHeight: "1.6",
    position: "relative",
    top: "-20px",
    left: "10px",
  },
  subText1: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#666666",
    lineHeight: "1.6",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexFlow: "column nowrap",
  },
  iconRows: {
    marginLeft: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "row nowrap",
  },
  icon: {
    margin: "20px",
    marginLeft: "10px",
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
        <div className={classes.components}>
          <div className={classes.sideways}>
            <article className={classes.textContainer}>
              <Typography className={classes.headText}>
                YOU <span className="gradient-text">CREATE</span>, WE STORE!
              </Typography>
              <div className={classes.iconContainer}>
                <Typography className={classes.subText}>
                  YOUR OWN VIRTUAL COOKBOOK
                </Typography>
                <div className={classes.iconRows}>
                  <img
                    className={classes.icon}
                    src={responsive}
                    alt="folder-icon"
                  />
                  <Typography className={classes.subText1} variant="body2">
                    LIFE LONG STORAGE FOR YOUR RECIPE COLLECTIONS
                  </Typography>
                </div>
                <div className={classes.iconRows}>
                  <img
                    className={classes.icon}
                    src={youtube}
                    alt="youtube-icon"
                  />
                  <Typography className={classes.subText1} variant="body2">
                    GET SHAREABLE LINK FOR YOUR PLATFORM
                  </Typography>
                </div>
                <div className={classes.iconRows}>
                  <img
                    className={classes.icon}
                    src={search}
                    alt="folder-icon"
                  />
                  <Typography className={classes.subText1} variant="body2">
                    KEEP TRACK OF YOUR FAVORITE CHEFS
                  </Typography>
                </div>
              </div>
            </article>
          </div>
          <Note />
        </div>
      </section>
    </>
  );
};

export default Home;
