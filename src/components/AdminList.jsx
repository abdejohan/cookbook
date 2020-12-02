/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

const AdminList = (props) => {
  const [admin, setAdmin] = useState(null);
  const { userData } = useContext(UserContext);
  const { searchInput } = props;
  const [searchResponseList, setSearchResponseList] = useState([]);
  const [userSearchResponseList, setUserSearchResponseList] = useState([]);

  useEffect(() => {
    if (!userData.user) {
      setAdmin(0);
    } else {
      setAdmin(userData.user.role);
    }

    const getSearchResults = async () => {
      try {
        const searchRequest = await axios.get(
          `http://localhost:5000/search?term=${searchInput}`
        );

        const userSearchRequest = await axios.get(
          `http://localhost:5000/search/user?term=${searchInput}`
        );

        setSearchResponseList(searchRequest.data);
        setUserSearchResponseList(userSearchRequest.data);
      } catch (error) {
        console.log(`THIS MESSAGE:${error}`);
      }
    };
    getSearchResults();
  }, [admin, searchInput, userData.user]);

  const DeletePost = async (postId) => {
    console.log(postId);
    console.log(userData.token);
    try {
      const deletedPost = await axios.delete(
        `http://localhost:5000/admin/${postId}`,
        {
          headers: {
            "x-auth-token": userData.token,
          },
        }
      );
      console.log(deletedPost);
      console.log("post deleted");
    } catch (error) {
      console.log(`THIS MESSAGE:${error}`);
    }
  };

  const DeleteUser = async (userId) => {
    console.log(userId);
    try {
      const deletedPost = await axios.delete(
        `http://localhost:5000/admin/user/${userId}`,
        {
          headers: {
            "x-auth-token": userData.token,
          },
        }
      );
      console.log(deletedPost);
      console.log("user deleted");
    } catch (error) {
      console.log(`THIS MESSAGE:${error}`);
    }
  };

  return (
    <section>
      {searchResponseList.length > 0 && (
        <>
          <h4>Recipes found..</h4>
          <ul>
            {searchResponseList.map((searchResult) => {
              return (
                <li key={searchResult._id}>
                  {searchResult.title}
                  <button
                    type="submit"
                    onClick={() => {
                      DeletePost(searchResult._id);
                    }}
                  >
                    Delete post
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {userSearchResponseList.length > 0 && (
        <>
          <ul>
            <h4>Users found..</h4>
            {userSearchResponseList.map((searchResult) => {
              return (
                <li key={searchResult._id}>
                  {searchResult.userName}
                  <button
                    type="submit"
                    onClick={() => {
                      DeleteUser(searchResult._id);
                    }}
                  >
                    Delete user
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
};

export default AdminList;
