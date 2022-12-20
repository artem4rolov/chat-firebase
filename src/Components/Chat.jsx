import React, { useContext, useState } from "react";

import { Messages } from "../Components/Messages";
import { Input } from "../Components/Input";
import { ChatContext } from "../context/ChatContext";

import MoreFunctions from "../img/more.svg";
import CloseModal from "../img/close.svg";

export const Chat = () => {
  const [showModal, setShowModal] = useState(false);

  // получаем юзера, затем все данные (чаты и тд)
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className={`modal ${showModal ? "active" : ""}`}>
        <div className="modalWrapper">
          <div className="modalWrapperHeader">
            <span>Информация о пользователе</span>
            <img src={CloseModal} alt="" onClick={() => setShowModal(false)} />
          </div>
          <div className="modalWrapperUserInfo">
            <div className="userName">
              <label>Имя:</label>
              <span>{data.user.displayName}</span>
            </div>
            <div className="userAvatar">
              <label>Аватар:</label>
              <img
                src={data.user.photoURL}
                alt=""
                onClick={() => setShowModal(false)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="chatInfo">
        <span>
          {data.user.displayName && "Диалог с " + data.user.displayName}
        </span>
        <div className="chatIcons">
          <img src={MoreFunctions} alt="" onClick={() => setShowModal(true)} />
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
