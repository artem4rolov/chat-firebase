import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={
        // если если id отправителя совпадает с id текущего пользователя - даем класс сообщению (они будут справа в окне сообщений)
        // если нет - сообщения будут слева в окне сообщений (сообщения от пользователя, с которым мы общаемся)
        `message ${message.senderId === currentUser.uid && "owner"}`
      }
    >
      <div className="messageInfo">
        <img
          src={
            // если id отправителя совпадает с id текущего пользователя - показываем наше отрпавленное фото, если нет - наоборот
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>Только что</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {
          // если есть картинка - показываем ее в чате
          message.img && <img src={message.img} alt="картинка в чате" />
        }
      </div>
    </div>
  );
};
