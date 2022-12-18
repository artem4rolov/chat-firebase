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
        <img src={currentUser.photoURL} alt="userPhoto" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Выйти</button>
      </div>
    </div>
  );
};
