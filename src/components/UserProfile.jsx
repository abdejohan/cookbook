import React, { useContext, useState } from "react";
// import { Switch, Route, Link } from "react-router-dom";
// import Note from "./Note";
import UserContext from "../context/UserContext";
import Library from "./ProfileOptions/Library";
import AddPost from "./ProfileOptions/AddPost";
import DeletePost from "./ProfileOptions/DeletePost";
import UserSettings from "./ProfileOptions/UserSettings";

const UserProfile = () => {
  const [profileOption, setProfileOption] = useState("");
  const { userData } = useContext(UserContext);

  return (
    <>
      {userData ? (
        <section>
          <nav>
            <ul>
              <li>
                <button
                  type="submit"
                  onClick={() => setProfileOption("library")}
                >
                  Library
                </button>
              </li>
              <li>
                <button
                  type="submit"
                  onClick={() => setProfileOption("addPost")}
                >
                  Add Post
                </button>
              </li>
              <li>
                <button
                  type="submit"
                  onClick={() => setProfileOption("deletePost")}
                >
                  Delete Post
                </button>
              </li>
              <li>
                <button
                  type="submit"
                  onClick={() => setProfileOption("userSettings")}
                >
                  Settings
                </button>
              </li>
            </ul>
          </nav>
          {profileOption === "library" && <Library />}
          {profileOption === "addPost" && <AddPost />}
          {profileOption === "deletePost" && <DeletePost />}
          {profileOption === "userSettings" && <UserSettings />}
        </section>
      ) : (
        <h1>DONT</h1>
      )}
    </>
  );
};

export default UserProfile;
