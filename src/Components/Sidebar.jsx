import React, { useState } from "react";

import { Navbar } from "../Components/Navbar";
import { Search } from "../Components/Search";
import { Chats } from "../Components/Chats";

import ArrowSvg from "../img/arrow.svg";

export const Sidebar = () => {
  const [showSidebar, setShowSideBar] = useState(true);

  const hideSidebar = () => {
    setShowSideBar(false);
  };

  return (
    <>
      <img
        src={ArrowSvg}
        alt="стрелочка"
        className={`goToSidebar ${showSidebar ? "" : "left"}`}
        onClick={() => setShowSideBar(!showSidebar)}
      />
      <div className={`sidebar ${showSidebar ? "" : "hidden"}`}>
        <Navbar />
        <Search />
        <Chats hideSidebar={hideSidebar} />
      </div>
    </>
  );
};
