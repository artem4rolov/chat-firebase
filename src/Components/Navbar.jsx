import React, { useContext } from "react";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">Лайв-чат</span>
      <div className="user">
        <div className="userInfoNavbar">
          <img src={currentUser.photoURL} alt="userPhoto" />
          <span>{currentUser.displayName}</span>
        </div>
        <button onClick={() => signOut(auth)}>Выйти</button>
      </div>
    </div>
  );
};
