import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles, fade, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import UserContext from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  AppBar: {
    backgroundColor: "grey",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1,
    },
  },
  headerOptions: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Header = (props) => {
  // eslint-disable-next-line react/prop-types
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState("");
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
    setTimeout(() => {
      setUserData({
        token: undefined,
        user: undefined,
      });
      localStorage.setItem("auth-token", "");
    }, 1000);
  };

  const handleChange = (e) => {
    setFilter(e.target.value);
    console.log(filter);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Photos
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              id="searchField"
              onChange={handleChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div>
            {isMobile ? (
              <div>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
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
                      <MenuItem onClick={() => handleMenuClick("/profile")}>
                        My Profile
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
                    <Button onClick={() => handleMenuClick("/profile")}>
                      Profile
                    </Button>
                    <Button onClick={() => logOut()}>Logout</Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      variant="contained"
                      onClick={() => handleMenuClick("/")}
                    >
                      Home
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleMenuClick("/login")}
                    >
                      Login
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleMenuClick("/register")}
                    >
                      Register
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
