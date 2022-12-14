import React from "react";

export const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Поиск..." />
      </div>
      <div className="userChat">
        <img
          src="https://get.pxhere.com/photo/man-person-girl-woman-camera-photography-portrait-spring-red-lens-color-autumn-canon-romance-season-taking-photo-photograph-beauty-emotion-photo-shoot-portrait-photography-1169775.jpg"
          alt=""
        />
        <div className="userChatInfo">
          <span>User</span>
        </div>
      </div>
    </div>
  );
};
