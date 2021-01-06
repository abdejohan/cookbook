import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import UserContext from "../context/UserContext";
import "../App.css";
import frypan from "../media/frypan.svg";

const useStyles = makeStyles(() => ({
  AppBar: {
    color: "lightgrey",
    backgroundColor: "white",
    boxShadow: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  menuButton: {
    padding: "5px",
    marginLeft: "50px",
    boxShadow: "none",
    fontSize: "1rem",
    fontWeight: "500",
    color: "#696969",
    backgroundColor: "white",
    textTransform: "none",
  },
  black: {
    padding: "20px",
    backgroundColor: "black",
    width: "100%",
    height: "35px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: "50px",
    height: "50px",
  },
  loginBttn: {
    borderRadius: "10px",
    padding: "4px 10px",
    backgroundColor: "blue",
    color: "white",
  },
}));

const Header = (props) => {
  // eslint-disable-next-line react/prop-types
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userData, setUserData } = useContext(UserContext);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    // eslint-disable-next-line react/prop-types
    history.push(pageURL);
    setAnchorEl(null);
  };

  const logOut = () => {
    // eslint-disable-next-line react/prop-types
    history.push("/");
    setTimeout(() => {
      setUserData({
        token: undefined,
        user: undefined,
      });
      localStorage.setItem("auth-token", "");
    }, 1000);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.AppBar}>
        <div className={classes.black}>
          <Typography variant="body1">
            Focus on the create side of cooking!
          </Typography>
        </div>
        <Toolbar>
          <img src={frypan} className={classes.icon} alt="frypan" />
          <div>
            {isMobile ? (
              <div>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={() => handleMenuClick("/")}>Home</MenuItem>
                  {userData.user ? (
                    <div>
                      <MenuItem
                        onClick={() =>
                          handleMenuClick(`/profile/${userData.user.id}`)
                        }
                      >
                        loginBttn
                      </MenuItem>
                      <MenuItem onClick={() => logOut()}>Logout</MenuItem>
                    </div>
                  ) : (
                    <div>
                      <MenuItem onClick={() => handleMenuClick("/login")}>
                        Login
                      </MenuItem>

                      <MenuItem onClick={() => handleMenuClick("/register")}>
                        Register
                      </MenuItem>
                    </div>
                  )}
                </Menu>
              </div>
            ) : (
              <div className={classes.headerOptions}>
                {userData.user ? (
                  <div>
                    <Button
                      className={classes.menuButton}
                      onClick={() => handleMenuClick("/")}
                    >
                      Home
                    </Button>
                    <Button
                      className={classes.menuButton}
                      onClick={() =>
                        handleMenuClick(`/profile/${userData.user.id}`)
                      }
                    >
                      Profile
                    </Button>
                    <Button
                      className={classes.menuButton}
                      onClick={() => logOut()}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      className={classes.menuButton}
                      onClick={() => handleMenuClick("/")}
                    >
                      Home
                    </Button>
                    <Button
                      className={classes.menuButton}
                      onClick={() => handleMenuClick("/about")}
                    >
                      About Us
                    </Button>
                    <Button
                      className={classes.menuButton}
                      onClick={() => handleMenuClick("/register")}
                    >
                      Register
                    </Button>
                    <Button
                      className={`${classes.menuButton} + ${classes.loginBttn}`}
                      onClick={() => handleMenuClick("/login")}
                    >
                      Login
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Header);
