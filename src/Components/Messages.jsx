import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

import { Message } from "./Message";

export const Messages = () => {
  // создаем массив сообщений юзера, который сейчас в системе
  const [messages, setMessages] = useState([]);

  // получаем юзера, затем все данные (чаты и тд)
  const { data } = useContext(ChatContext);

  useEffect(() => {
    // если выбран чат с другим пользователем, то получаем все сообщения из диалога
    if (data.chatId) {
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unSub();
      };
    }
    // обновляем всегда при нажатии на разные диалоги с пользователями
  }, [data.chatId]);

  console.log(messages);

  return (
    <div className="messages">
      {messages?.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
};
