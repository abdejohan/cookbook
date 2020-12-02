import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Note from "./Note";
import Search from "./Search";

// Images
import frontpageBackground from "../media/frontpageBackground.jpg";
import record from "../media/record.svg";
import notes from "../media/notes.svg";
import merge from "../media/merge.svg";
import share from "../media/share.svg";
import baking from "../media/baking.svg";

const useStyles = makeStyles(() => ({
  contentContainer: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    padding: "20px",
    borderRadius: "30px",
    top: "-50px",
    position: "relative",
  },
  newUserInfo: {
    zIndex: "-2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundImage: `url(${frontpageBackground})`,
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "500px",
    backgroundColor: "transparent",
  },
  article: {
    visibility: "hidden",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    flexFlow: "column nowrap",
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    marginBottom: "50px",
    borderRadius: "3px",
    color: "#25252",
    fontSize: "1rem",
    fontStyle: "italic",
  },
  articleSubText: {
    padding: "0px",
    margin: "0px",
  },
  iconContainer: {
    padding: "20px 0px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "space-between",
    width: "100%",
  },
  icons: {
    width: "50px",
    height: "50px",
  },
  icon2text: {
    display: "flex",
    alignItems: "center",
    flexFlow: "column nowrap",
  },
  ulList: {
    listStyleType: "none",
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  listImg: {
    width: "20px",
    height: "20px",
    marginRight: "20px",
  },
  hr: {
    marginTop: "100px",
    width: "100%",
    height: "30px",
    borderStyle: "solid",
    borderColor: "#095484",
    borderWidth: "1px 0 0 0",
    borderRadius: "20px",
  },
  hr2: {
    display: "block",
    content: "",
    height: "30px",
    width: "100%",
    marginTop: "20px",
    borderStyle: "solid",
    borderColor: "#095484",
    borderWidth: "0 0 1px 0",
    borderRadius: "20px",
  },
}));

const Home = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();
  const imageArray = [
    {
      id: 0,
      title: "Create",
      img: record,
    },
    {
      id: 1,
      title: "Document",
      img: notes,
    },
    {
      id: 2,
      title: "merge",
      img: merge,
    },
    {
      id: 3,
      title: "Share!",
      img: share,
    },
  ];

  useEffect(() => {
    if (userData.user) {
      if (userData.user.role === "admin") {
        history.push("/admin");
      }
    }
  }, [history, userData.token, userData.user]);

  return (
    <>
      <div className={classes.newUserInfo}>
        <article className={classes.article}>
          <ul className={classes.ulList}>
            <li>
              <img className={classes.listImg} src={baking} alt="cooking hat" />
              Help structuring content
            </li>
            <li>
              <img className={classes.listImg} src={baking} alt="cooking hat" />
              Lifelong virtual storage of your favorite recipes
            </li>
            <li>
              <img className={classes.listImg} src={baking} alt="cooking hat" />
              Find inspriation
            </li>
          </ul>
          <p className={classes.articleSubText}>
            Either if you are someone thats looking to present your content
            nicely to your followers. Or looking for way to store your recipes
            Or simply just a foodie at heart{" "}
            <span role="img" aria-label="emoji heart">
              ❤️
            </span>
            , we think you will find bakeNOTES useful! Enjoy
          </p>
        </article>
      </div>
      <section className={classes.contentContainer}>
        <Search />
        <hr className={classes.hr} />
        <div className={classes.iconContainer}>
          {imageArray.map((image) => {
            return (
              <div key={image.id} className={classes.icon2text}>
                <img
                  className={classes.icons}
                  src={image.img}
                  alt={image.key}
                />
                <h2>{image.title}</h2>
              </div>
            );
          })}
        </div>
        <Note />
        <hr className={classes.hr2} />
      </section>
    </>
  );
};

export default Home;
