import React, { useContext, useState } from "react";

import { Messages } from "../Components/Messages";
import { Input } from "../Components/Input";
import { ChatContext } from "../context/ChatContext";

import MoreFunctions from "../img/more.png";
import ArrowSvg from "../img/arrow.svg";

export const Chat = () => {
  // получаем юзера, затем все данные (чаты и тд)
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <img src={ArrowSvg} alt="стрелочка" className="goToSidebar" />
        <span>
          {data.user.displayName && "Диалог с " + data.user.displayName}
        </span>
        <div className="chatIcons">
          <img src={MoreFunctions} alt="" />
        </div>
      </div>
      {data.user.displayName ? (
        <>
          <Messages />
          <Input />
        </>
      ) : (
        <div className="info">
          <span>Найдите собеседника и начните общение!</span>
        </div>
      )}
    </div>
  );
};
