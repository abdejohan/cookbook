import React, { useContext } from "react";
import { Link, useRouteMatch, Route } from "react-router-dom";
// import Note from "./Note";
import UserContext from "../context/UserContext";
import Library from "./profilePages/Library";
import Settings from "./profilePages/Settings";
import UserProfileView from "./profilePages/UserProfileView";

const Profile = () => {
  const { userData } = useContext(UserContext);
  const { url, path } = useRouteMatch();
  console.log(`path, ${path}`);
  console.log(`url, ${url}`);

  return (
    <>
      {userData ? (
        <section>
          <nav>
            <ul>
              <li>
                <Link to={`${url}`}>My Profile</Link>
              </li>
              <li>
                <Link to={`${url}/library`}>Library</Link>
              </li>
              <li>
                <Link to={`${url}/settings`}>Settings</Link>
              </li>
            </ul>
          </nav>
          <Route exact path={path}>
            <UserProfileView />
          </Route>
          <Route path={`${path}/library`}>
            <Library />
          </Route>
          <Route path={`${path}/settings`}>
            <Settings />
          </Route>
        </section>
      ) : (
        <p>there is nothing here right now.. :disappointed: try logging in!</p>
      )}
    </>
  );
};

export default Profile;
