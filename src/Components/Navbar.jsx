import React from "react";

export const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Лайв-чат</span>
      <div className="user">
        <img src="" alt="userPhoto" />
        <span>User</span>
        <button>Выйти</button>
      </div>
    </div>
  );
};
