import React, { useContext, useState } from "react";
import Note from "./Note";
import UserContext from "../context/UserContext";
import Library from "./profilePages/Library";
import Settings from "./profilePages/Settings";

const Profile = () => {
  const [profilePage, setProfilePage] = useState("");
  const { userData } = useContext(UserContext);

  return (
    <>
      {userData ? (
        <section>
          <nav>
            <ul>
              <li>
                <button type="submit" onClick={() => setProfilePage("library")}>
                  Library
                </button>
              </li>
              <li>
                <button
                  type="submit"
                  onClick={() => setProfilePage("Settings")}
                >
                  Settings
                </button>
              </li>
            </ul>
          </nav>
          {profilePage === "library" && <Library />}
          {profilePage === "Settings" && <Settings />}
          {profilePage === "" && <Note />}
        </section>
      ) : (
        <p>there is nothing here right now.. :disappointed: try logging in!</p>
      )}
    </>
  );
};

export default Profile;
