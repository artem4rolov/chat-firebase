import React from "react";

import { Messages } from "../Components/Messages";
import { Input } from "../Components/Input";

import Camera from "../img/cam.png";
import AddPerson from "../img/add.png";
import MoreFunctions from "../img/more.png";

export const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>User</span>
        <div className="chatIcons">
          <img src={Camera} alt="" />
          <img src={AddPerson} alt="" />
          <img src={MoreFunctions} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};
