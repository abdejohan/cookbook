/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React from "react";
import { Link } from "react-router-dom";

const ListItem = ({ searchResponseList, userSearchResponseList }) => {
  return (
    <div>
      {searchResponseList &&
        searchResponseList.map((searchResult) => {
          return (
            <li key={searchResult._id}>
              <Link to={`/posts/${searchResult._id}`}>
                {searchResult.title}
              </Link>
            </li>
          );
        })}
      {userSearchResponseList &&
        userSearchResponseList.map((searchResult) => {
          return (
            <li key={searchResult._id}>
              <Link to={`/user/${searchResult._id}`}>
                {searchResult.userName}
              </Link>
            </li>
          );
        })}
    </div>
  );
};

export default ListItem;
