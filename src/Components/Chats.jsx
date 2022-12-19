import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export const Chats = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  // получаем юзера, который вошел в приложение
  const { currentUser } = useContext(AuthContext);
  // получаем чаты юзера
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      // получаем чаты юзера (метод onSnaphot позволяет отслеживать изменения в чатах в реальном времени)
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      //
      return () => {
        unsub();
      };
    };

    // получаем список чатов только при условии, что в данный момент юзер вошел в приложение
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user, chat) => {
    dispatch({ type: "CHANGE_USER", payload: user });
    setSelectedChat(chat[0]);
    // console.log(chat[0]);
  };

  return (
    <div className="chats">
      {/* перебираем все чаты пользователя, даем чатам картинки, никнеймы и последние сообщения */}
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className={`userChat ${chat[0] === selectedChat ? "active" : null}`}
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo, chat)}
          >
            {/* выводим аватар пользователя в списке чатов */}
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              {/* выводим никнейм пользователя в списке чатов */}
              <span>{chat[1].userInfo.displayName}</span>
              {/* выводим последнее сообщение рядом с фото пользователя в списке чатов */}
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};
