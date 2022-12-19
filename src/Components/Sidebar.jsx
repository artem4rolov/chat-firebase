import React, { useState } from "react";

import { Navbar } from "../Components/Navbar";
import { Search } from "../Components/Search";
import { Chats } from "../Components/Chats";

export const Sidebar = ({ activeChat }) => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};
