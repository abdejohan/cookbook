import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import UserContext from "../context/UserContext";

// import { withRouter } from "react-router-dom";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";

const Home = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
    }
  });

  return (
    <div>
      <Typography variant="h1" color="textPrimary">
        THIS IS THE HOME PAGE
      </Typography>
    </div>
  );
};

export default Home;
