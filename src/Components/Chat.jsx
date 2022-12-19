import React, { useContext } from "react";

import { Messages } from "../Components/Messages";
import { Input } from "../Components/Input";
import { ChatContext } from "../context/ChatContext";

import Camera from "../img/cam.png";
import AddPerson from "../img/add.png";
import MoreFunctions from "../img/more.png";

export const Chat = () => {
  // получаем юзера, затем все данные (чаты и тд)
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
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
